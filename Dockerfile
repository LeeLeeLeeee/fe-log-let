# 베이스 이미지
FROM node:22-alpine

# 앱 디렉토리
WORKDIR /app

# 의존성만 먼저 복사·설치 (빌드 캐시 활용)
COPY package-lock.json ./
RUN npm ci

# 소스 복사 및 빌드
COPY . .
RUN npm run build

# 런타임 포트
EXPOSE 3002

# 프로덕션 서버 실행
CMD ["npm", "start"]