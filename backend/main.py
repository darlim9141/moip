# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from services.ml_service import load_all_models
from routers import analyze, stats, archive # archive는 나중에 추가

# Lifespan: 서버 켜질 때 모델 로드
@asynccontextmanager
async def lifespan(app: FastAPI):
    load_all_models()
    yield
    # 끌 때 정리할 게 있다면 여기에

app = FastAPI(lifespan=lifespan)

origins = [
    "http://localhost:5173",
    "https://moip-frontend.vercel.app", # (나중에 이런 식으로 Vercel 주소 추가)
    "*" # 배포 테스트를 위해 모든 접속 허용
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # 배포 초기에는 * 로 모든 접속 허용하는 것이 정신건강에 좋습니다.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 등록
app.include_router(analyze.router, prefix="/api")
app.include_router(stats.router, prefix="/api")
# app.include_router(archive.router, prefix="/api") 

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)