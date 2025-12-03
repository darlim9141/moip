# backend/routers/analyze.py
from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session
from database import get_db, AnalysisResult
from services.ml_service import predict_image
from services.recommendation_service import get_ai_recommendations 
import base64

router = APIRouter()

@router.post("/analyze")
async def analyze_fashion(file: UploadFile = File(...), db: Session = Depends(get_db)):
    contents = await file.read()
    
    # 1. 기존 AI 분석 (빠름)
    ai_result = predict_image(contents)
    
    # 2. Gemini AI 추천
    # 이미지 원본과 분석된 스타일 이름을 넘겨줍니다.
    recommendations = get_ai_recommendations(contents, ai_result["dominant_style"])
    
    # 3. DB 저장 (추천 결과는 DB에 안 넣어도 됨, 필요하면 추가)
    img_base64 = base64.b64encode(contents).decode('utf-8')
    image_data_url = f"data:image/jpeg;base64,{img_base64}"

    db_record = AnalysisResult(
        image_url=image_data_url,
        style_scores=ai_result["style_scores"],
        dominant_style=ai_result["dominant_style"],
        coord_x=ai_result["coordinates"]["x"],
        coord_y=ai_result["coordinates"]["y"],
        coord_z=ai_result["coordinates"]["z"]
    )
    db.add(db_record)
    db.commit()
    db.refresh(db_record)

    # 4. 응답
    return {
        "style_breakdown": ai_result["style_scores"],
        "coordinates": ai_result["coordinates"],
        "recommendations": recommendations 
    }