# GitHub Actions 워크플로우

## 자동 배포 설정

이 워크플로우는 `main` 브랜치에 푸시할 때마다 자동으로 GitHub Pages에 사이트를 배포합니다.

### 설정 방법

1. **GitHub 저장소 설정**
   - Repository → Settings → Pages
   - Source: "GitHub Actions" 선택

2. **푸시하기**
   ```bash
   git add .
   git commit -m "Setup Hugo with GitHub Actions"
   git push origin main
   ```

3. **배포 확인**
   - Repository → Actions 탭에서 워크플로우 실행 확인
   - 완료 후 https://apptestai.github.io/docs-new/ 접속

### 로컬 빌드 (테스트용)

```bash
# 개발 서버 (localhost 사용)
hugo server

# 프로덕션 빌드 (GitHub Pages URL 사용)
hugo --environment production --minify
```

### 중요 사항

- ⚠️ 반드시 `--environment production` 옵션을 사용해야 올바른 baseURL이 적용됩니다
- 로컬에서 `hugo` 명령만 실행하면 localhost URL로 빌드됩니다

