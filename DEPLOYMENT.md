# 배포 가이드

## 🚀 자동 배포 (GitHub Actions) - 권장

### 설정 방법

1. **GitHub Pages 설정**
   ```
   Repository → Settings → Pages
   Source: GitHub Actions 선택
   ```

2. **푸시하면 자동 배포**
   ```bash
   git add .
   git commit -m "Update docs"
   git push origin main
   ```

3. **배포 확인**
   - Repository → Actions 탭에서 워크플로우 확인
   - 완료 후 https://apptestai.github.io/docs-new/ 접속

### 워크플로우 파일
`.github/workflows/deploy.yml`이 자동으로:
- ✅ 테마 서브모듈 체크아웃
- ✅ Hugo 최신 버전 설치
- ✅ Production 환경으로 빌드
- ✅ GitHub Pages에 자동 배포

---

## 🔧 수동 배포 (로컬)

### 방법 1: 배포 스크립트 사용
```bash
./deploy.sh
```

### 방법 2: 수동 명령
```bash
# 1. 빌드
hugo --environment production --minify

# 2. gh-pages 브랜치로 배포
cd public
git init
git add -A
git commit -m "Deploy"
git branch -M gh-pages
git remote add origin https://github.com/apptestai/docs-new.git
git push -f origin gh-pages
cd ..
```

---

## 💻 로컬 개발

### 개발 서버 실행
```bash
hugo server

# 또는 다른 포트로
hugo server -p 8080
```

접속: http://localhost:1313/

### 주요 차이점
- **개발**: `hugo server` → localhost URL 사용
- **배포**: `hugo --environment production` → GitHub Pages URL 사용

---

## 🔍 문제 해결

### 404 에러 발생 시
1. `.nojekyll` 파일 확인
   ```bash
   ls static/.nojekyll
   ```

2. Production 빌드 확인
   ```bash
   hugo --environment production --minify
   grep "apptestai.github.io" public/en/index.html
   ```

3. GitHub Pages 설정 확인
   - Source: GitHub Actions (또는 gh-pages branch)
   - Branch: gh-pages / (root)

### 테마가 없다는 에러
```bash
# 서브모듈 업데이트
git submodule update --init --recursive
```

### CSS/JS 파일 404
```bash
# 캐시 삭제 후 재빌드
rm -rf public resources
hugo --environment production --minify
```

---

## 📋 체크리스트

배포 전 확인사항:
- [ ] `draft: false` 또는 draft 필드 제거
- [ ] `hugo --environment production` 사용
- [ ] `.nojekyll` 파일 존재
- [ ] `config/production/config.toml`의 baseURL 확인
- [ ] GitHub Pages 설정 확인

---

## 🔗 유용한 링크

- 사이트: https://apptestai.github.io/docs-new/
- 저장소: https://github.com/apptestai/docs-new
- Actions: https://github.com/apptestai/docs-new/actions

