import google.generativeai as genai

GOOGLE_API_KEY = "AIzaSyBTKIz6s_gDgOxpGzWye6HLtjTrrO2wWPg"
genai.configure(api_key=GOOGLE_API_KEY)

print("사용 가능한 모델 목록:")
for m in genai.list_models():
    if 'generateContent' in m.supported_generation_methods:
        print(f"- {m.name}")