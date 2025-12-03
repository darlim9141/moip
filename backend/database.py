# backend/database.py
from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

# SQLite DB 파일 생성
SQLALCHEMY_DATABASE_URL = "sqlite:///./fashion_app.db"

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# 분석 결과 저장 테이블 (ArchivePage용)
class AnalysisResult(Base):
    __tablename__ = "analysis_results"

    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, default=datetime.now) # 날짜
    image_url = Column(String) # (실제 서비스에선 S3 URL, 여기선 로컬 경로나 base64)
    
    # 분석 결과 (JSON 형태로 저장하는 게 관리하기 편함)
    # 예: {"minimal": 80, "casual": 30 ...}
    style_scores = Column(JSON) 
    
    # 대표 스타일
    dominant_style = Column(String)
    
    # 3D 좌표 (StatisticsPage용)
    coord_x = Column(Float)
    coord_y = Column(Float)
    coord_z = Column(Float)

# 테이블 생성
Base.metadata.create_all(bind=engine)

# DB 세션 가져오기 유틸리티
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()