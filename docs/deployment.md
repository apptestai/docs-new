# 배포 가이드

## 🚀 자동 배포 (GitHub Actions) - 권장

### 기본 배포

```bash
git push origin main
```

배포 상태: https://github.com/apptestai/docs-new/actions

### 설정 (처음 한 번만)

**Repository → Settings → Pages**
- Source: `GitHub Actions` 선택

**워크플로우 (`.github/workflows/deploy.yml`):**
- ✅ 테마 서브모듈 자동 체크아웃
- ✅ Hugo 빌드 (production 환경)
- ✅ GitHub Pages 자동 배포

---

## 🔧 수동 배포 (선택사항)

```bash
# 빌드
hugo --environment production --minify

# gh-pages 브랜치로 배포
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

```bash
hugo server              # localhost:1313
hugo server -p 8080      # 다른 포트
```

**차이점:**
- 개발: `hugo server` (localhost URL)
- 배포: `hugo --environment production` (GitHub Pages URL)

---

## 🔍 문제 해결

### "404 Not Found" 에러

1. `.nojekyll` 파일 확인
   ```bash
   ls static/.nojekyll
   ```

2. Production URL 확인
   ```bash
   hugo --environment production --minify
   grep "apptestai.github.io" public/en/index.html
   ```

3. GitHub Pages 설정 확인
   - Repository → Settings → Pages
   - Source: `GitHub Actions`

### "테마를 찾을 수 없습니다"

```bash
git submodule update --init --recursive
```

### CSS/JS 파일 404

```bash
rm -rf public resources
hugo --environment production --minify
```

---

## 📋 배포 체크리스트

- [ ] 모든 문서에 `draft: false` 설정
- [ ] 이미지 경로 확인 (`/images/...`)
- [ ] 로컬 빌드 테스트: `hugo --environment production --minify`
- [ ] GitHub Actions 워크플로우 성공 확인

---

## 🔗 링크

- **사이트:** https://apptestai.github.io/docs-new/
- **저장소:** https://github.com/apptestai/docs-new
- **Actions:** https://github.com/apptestai/docs-new/actions

