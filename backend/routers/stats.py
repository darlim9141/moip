# backend/routers/stats.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from database import get_db, AnalysisResult
from services.ml_service import ai_models

router = APIRouter()

STYLE_COLORS = {
    "minimal": "#06b6d4",
    "casual": "#8b5cf6",
    "classic": "#f59e0b",
    "street": "#10b981",
    "unknown": "#94a3b8"
}

@router.get("/stats")
def get_statistics(db: Session = Depends(get_db)):
    """
    대시보드용 통계 데이터를 반환합니다.
    1. 전체 업로드 수
    2. 스타일별 분포 (Pie Chart용)
    """
    
    # 1. 전체 데이터 개수 (Total Images)
    total_count = db.query(AnalysisResult).count()
    
    # 2. 스타일별 개수 집계 (Group By)
    # 결과 예시: [('Minimal', 10), ('Casual', 5), ...]
    style_counts = db.query(
        AnalysisResult.dominant_style, 
        func.count(AnalysisResult.id)
    ).group_by(AnalysisResult.dominant_style).all()
    
    # 3. Pie Chart용 데이터 포맷팅
    pie_data = []
    for style, count in style_counts:
        # DB에 저장된 스타일 이름(예: Minimal)을 소문자로 바꿔서 색상 찾기
        style_lower = style.lower() if style else "unknown"
        
        # 비율 계산 (퍼센트)
        percentage = round((count / total_count * 100), 1) if total_count > 0 else 0
        
        pie_data.append({
            "name": style,
            "value": percentage, # 차트에서는 퍼센트를 보여줌
            "count": count,      # 실제 개수
            "color": STYLE_COLORS.get(style_lower, "#94a3b8")
        })

    # 4. 응답 데이터 구성
    return {
        "global_stats": {
            "total_images": total_count,
            "unique_users": "892",       # (로그인이 없으므로 하드코딩 혹은 세션기반 추후 구현)
            "model_accuracy": "94.2%",   # 모델 고정 성능
            "dataset_size": "500K"       # 학습 데이터셋 크기 (고정)
        },
        "category_distribution": pie_data
    }

@router.get("/graph-data")
def get_graph_data():
    # ml_service에서 로드한 web_graph_data.json 반환
    data = ai_models.get('web_graph_data', [])
    print(f"Graph data requested. Sending {len(data)} points.") # 로그 확인용
    return data