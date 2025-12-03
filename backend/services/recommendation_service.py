# backend/services/recommendation_service.py

import os
import json
import re
import urllib.parse
import google.generativeai as genai
from PIL import Image
import io

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

try:
    genai.configure(api_key=GOOGLE_API_KEY)
    model = genai.GenerativeModel('gemini-2.0-flash')
    IS_AI_READY = True
except Exception as e:
    print(f"Gemini Setup Error: {e}")
    IS_AI_READY = False

def get_ai_recommendations(image_bytes: bytes, dominant_style: str):
    if not IS_AI_READY:
        print("AI is not ready, returning fallback.")
        return get_fallback_recommendations(dominant_style)

    try:
        image = Image.open(io.BytesIO(image_bytes))

        # 프롬프트: JSON 구조를 더 명확하게 지시
        prompt = f"""
        You are a professional fashion stylist.
        Analyze the outfit in the image. The user's dominant style is diagnosed as '{dominant_style}'.
        
        Recommend 3 specific items that would perfectly match this outfit.
        
        [IMPORTANT]
        1. Return ONLY a raw JSON array. Do not use Markdown code blocks (```json).
        2. Do not write any introduction or conclusion.
        3. Use English for JSON keys and values.
        
        Required JSON Structure:
        [
            {{
                "id": "item_1",
                "title": "Short Item Name (e.g. Silver Chunky Necklace)",
                "description": "One sentence explaining why it matches the uploaded photo.",
                "brands": ["Brand A", "Brand B"],
                "image_keyword": "silver necklace" 
            }}
        ]
        
        * For 'image_keyword', put a simple English search term for the item.
        """

        print("Asking Gemini...")
        response = model.generate_content([prompt, image])
        
        # JSON 파싱 (기존 로직 유지)
        clean_text = response.text.replace("```json", "").replace("```", "").strip()
        match = re.search(r'\[.*\]', clean_text, re.DOTALL)
        
        if match:
            recommendations = json.loads(match.group(0))
            
            # [핵심 변경] URL 생성 로직 강화
            for item in recommendations:
                # 1. 키워드 가져오기 (없으면 title 사용)
                raw_keyword = item.get("image_keyword", item.get("title", "fashion item"))
                
                # 2. URL 안전하게 인코딩 (공백 -> %20, 특수문자 처리)
                encoded_keyword = urllib.parse.quote(raw_keyword)
                
                # 3. 고화질 + 시드 추가 (캐싱 방지 및 퀄리티 향상)
                # nologo=true: 로고 제거, width/height: 사이즈 지정
                item["image"] = f"https://image.pollinations.ai/prompt/fashion%20{encoded_keyword}?nologo=true&width=512&height=512&model=flux"
                
                print(f"Generated Image URL: {item['image']}") # [디버깅] 로그 확인용

            return recommendations
        else:
            raise ValueError("No JSON found")

    except Exception as e:
        print(f"AI Recommendation Failed: {e}")
        print("Falling back to hardcoded data.")
        return get_fallback_recommendations(dominant_style)

# --- Fallback Data (AI 실패 시 사용) ---
def get_fallback_recommendations(style_name: str):
    print(f"Using Fallback data for {style_name}")
    
    # 스타일별 기본 데이터
    fallback_db = {
        "Minimal": [
            {
                "id": "m1",
                "title": "Minimalist Watch",
                "description": "Clean lines for a simple look",
                "brands": ["Daniel Wellington", "Nordgreen"],
                "image": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=500&q=60"
            },
            {
                "id": "m2",
                "title": "Leather Tote",
                "description": "Essential leather bag",
                "brands": ["Cuyana", "Everlane"],
                "image": "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=500&q=60"
            },
            {
                "id": "m3",
                "title": "White Sneakers",
                "description": "Versatile everyday sneakers",
                "brands": ["Common Projects", "Veja"],
                "image": "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=500&q=60"
            }
        ],
        "Casual": [
            {
                "id": "c1",
                "title": "Denim Jacket",
                "description": "Classic layer for any season",
                "brands": ["Levi's", "Gap"],
                "image": "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=500&q=60"
            },
            {
                "id": "c2",
                "title": "Canvas Backpack",
                "description": "Durable and stylish",
                "brands": ["Herschel", "Fjallraven"],
                "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=60"
            },
            {
                "id": "c3",
                "title": "Comfort Hoodie",
                "description": "Soft cotton blend hoodie",
                "brands": ["Champion", "Nike"],
                "image": "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=500&q=60"
            }
        ],
        "Street": [
            {
                "id": "s1",
                "title": "Oversized Tee",
                "description": "Graphic print statement piece",
                "brands": ["Supreme", "Stussy"],
                "image": "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=500&q=60"
            },
            {
                "id": "s2",
                "title": "High-Top Sneakers",
                "description": "Iconic street style footwear",
                "brands": ["Jordan", "Vans"],
                "image": "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=500&q=60"
            },
            {
                "id": "s3",
                "title": "Bucket Hat",
                "description": "Trendy accessory",
                "brands": ["Kangol", "Adidas"],
                "image": "https://images.unsplash.com/photo-1575424909138-46b05e5919ec?auto=format&fit=crop&w=500&q=60"
            }
        ],
        "Classic": [
            {
                "id": "cl1",
                "title": "Trench Coat",
                "description": "Timeless outerwear",
                "brands": ["Burberry", "London Fog"],
                "image": "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=500&q=60"
            },
            {
                "id": "cl2",
                "title": "Leather Loafers",
                "description": "Elegant footwear choice",
                "brands": ["Gucci", "Cole Haan"],
                "image": "https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=500&q=60"
            },
            {
                "id": "cl3",
                "title": "Silk Scarf",
                "description": "Sophisticated accent",
                "brands": ["Hermes", "Toteme"],
                "image": "https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?auto=format&fit=crop&w=500&q=60"
            }
        ]
    }
    
    key = style_name.lower()
    return fallback_db.get(key, fallback_db["minimal"])
