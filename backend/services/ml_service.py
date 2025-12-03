# backend/services/ml_service.py
import os
import json
import pickle
import io
import numpy as np
from PIL import Image
from rembg import remove
from tensorflow.keras.models import load_model, Model # type: ignore
from tensorflow.keras.preprocessing.image import img_to_array # type: ignore
from tensorflow.keras.applications.resnet50 import preprocess_input # type: ignore
from pillow_heif import register_heif_opener

register_heif_opener()

# 경로 설정
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_DIR = os.path.join(BASE_DIR, 'models', 'resnet50')

ai_models = {}

def load_all_models():
    print("Loading AI models...")
    
    # 1. Keras Model & Feature Extractor
    full_model = load_model(os.path.join(MODEL_DIR, 'model.keras'))
    try:
        feature_layer = full_model.get_layer('avg_pool')
    except ValueError:
        feature_layer = full_model.layers[-3]
    
    ai_models['classifier'] = full_model
    ai_models['feature_extractor'] = Model(inputs=full_model.input, outputs=feature_layer.output)
    
    # 2. Scikit-learn Models
    with open(os.path.join(MODEL_DIR, 'pca_model.pkl'), 'rb') as f:
        ai_models['pca'] = pickle.load(f)
    with open(os.path.join(MODEL_DIR, 'kmeans_model.pkl'), 'rb') as f:
        ai_models['kmeans'] = pickle.load(f)
        
    # 3. Data Files
    with open(os.path.join(MODEL_DIR, 'class_names.json'), 'r') as f:
        ai_models['class_names'] = json.load(f)
        
    # 시각화용 배경 데이터 로드 (StatisticsPage용)
    web_graph_path = os.path.join(MODEL_DIR, 'web_graph_data.json')
    if os.path.exists(web_graph_path):
        with open(web_graph_path, 'r') as f:
            ai_models['web_graph_data'] = json.load(f)
    else:
        ai_models['web_graph_data'] = []
        
    print("AI Models Loaded Successfully!")

def predict_image(image_bytes):
    # 1. 전처리 (배경 제거 + 리사이즈)
    image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    image_no_bg = remove(image).convert('RGB')
    image_resized = image_no_bg.resize((224, 224))
    
    img_array = img_to_array(image_resized)
    img_array = np.expand_dims(img_array, axis=0)
    img_processed = preprocess_input(img_array)
    
    # 2. 분류 (Classification)
    probs = ai_models['classifier'].predict(img_processed, verbose=0)[0]
    
    # [중요!] 프론트엔드가 원하는 키 이름(소문자)으로 강제 변환
    # 만약 모델 클래스가 ['Minimal', 'Casual'...] 이라면 .lower()로 소문자로 변환됨
    style_scores = {}
    
    # 안전장치: 프론트엔드에 정의된 스타일 키들
    valid_keys = ["minimal", "casual", "classic", "street"]
    
    for i, prob in enumerate(probs):
        raw_name = ai_models['class_names'][i] # 예: "Minimal"
        key_name = raw_name.lower() # "minimal"
        
        # 혹시 모델에 "Amekaji" 같은 다른 이름이 있다면 무시하거나 매핑해야 에러가 안 남
        if key_name in valid_keys:
            style_scores[key_name] = round(float(prob) * 100, 1)
        else:
            # 예외 처리: 만약 "amekaji" 같은게 있다면 일단 "street" 같은 곳에 더하거나 무시
            pass

    dominant_style = ai_models['class_names'][np.argmax(probs)]

    # 3. 3D 좌표 추출 (Feature -> PCA)
    features = ai_models['feature_extractor'].predict(img_processed, verbose=0)
    features = np.ascontiguousarray(features, dtype=np.float64)
    pca_result = ai_models['pca'].transform(features)[0]
    
    return {
        "style_scores": style_scores,
        "dominant_style": dominant_style,
        "coordinates": {
            "x": float(pca_result[0]),
            "y": float(pca_result[1]),
            "z": float(pca_result[2])
        }
    }