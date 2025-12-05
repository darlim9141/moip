# 1. 파이썬 3.9 이미지 사용
FROM python:3.10

# 2. 작업 디렉토리 설정
WORKDIR /code

# 3. 필수 패키지 설치
# (libGL은 opencv나 tensorflow 영상 처리 시 필요할 수 있음)
RUN apt-get update && apt-get install -y libgl1 libglib2.0-0

# 4. requirements.txt 복사 및 설치
COPY requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# 5. 소스 코드 복사
COPY . /code

# 6. 사용자 권한 설정 (Hugging Face 필수 요구사항)
# 사용자 ID 1000번을 만들고 권한을 줌
RUN useradd -m -u 1000 user
USER user
ENV HOME=/home/user \
    PATH=/home/user/.local/bin:$PATH

# 7. 작업 폴더 권한 부여
WORKDIR $HOME/app
COPY --chown=user . $HOME/app

# 8. 실행 명령어 (Hugging Face는 7860 포트를 사용해야 함!)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]