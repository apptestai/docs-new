# Apptest.ai Documentation

AI 기반 모바일 앱 자동 테스트 플랫폼의 공식 문서 사이트입니다.

## 빠른 시작

### 1. 저장소 클론 및 submodule 초기화

```bash
git clone https://github.com/apptestai/docs-new.git
cd docs-new
git submodule update --init --recursive
```

⚠️ **중요**: `git submodule update --init --recursive` 명령을 반드시 실행해야 Hugo Book 테마가 설치됩니다.

### 2. 로컬 서버 실행

```bash
hugo server
```

`http://localhost:1313` 접속

## Decap CMS 사용

### 로컬 테스트

```bash
# 터미널 1
npx decap-server

# 터미널 2
hugo server
```

`http://localhost:1313/admin/` 접속 (로그인 불필요)

### 프로덕션

`https://apptestai.github.io/docs-new/admin/` 접속 후 GitHub 로그인

## 배포

`main` 브랜치에 푸시하면 GitHub Actions가 자동 배포합니다.

```bash
git push origin main
```

## Netlify Functions

서버리스 함수를 사용하여 OAuth 콜백 등의 백엔드 로직을 구현할 수 있습니다.

### 함수 엔드포인트

- `/api/health-check` - Functions 동작 확인
- `/api/oauth-callback` - OAuth 인증 콜백 처리

### 환경변수 설정

Netlify 대시보드에서 다음 환경변수를 설정해야 합니다:

**Site settings → Build & deploy → Environment variables**

```
TOKEN_URL=https://oauth-provider.com/token
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
REDIRECT_URI=https://your-site.netlify.app/api/oauth-callback
```

### 로컬 테스트

```bash
# 의존성 설치 (처음 한 번만)
npm install

# Functions 로컬 실행
npm run dev
# 또는
netlify dev
```

로컬 환경변수는 `.env` 파일에 저장 (`.gitignore`에 포함됨)

```bash
# .env 파일 예시
TOKEN_URL=https://oauth-provider.com/token
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
REDIRECT_URI=http://localhost:8888/api/auth-callback
```

### GH Pages + Netlify Functions 조합

1. **GitHub Pages**: 정적 사이트 호스팅 (무료)
2. **Netlify Functions**: 서버리스 API만 사용 (무료 티어 내)

프론트엔드에서 Netlify Functions 호출:

```javascript
// GH Pages 사이트에서 Netlify 함수 호출
fetch('https://your-app.netlify.app/api/oauth-callback?code=AUTH_CODE')
  .then(res => res.json())
  .then(data => console.log(data));
```

## 문서 작성

자세한 문서 작성 규칙은 `.cursorrules` 파일을 참고하세요.

## 문제 해결

### 테마를 찾을 수 없는 경우

```bash
git submodule update --init --recursive
```

### Shortcode 에러

```bash
cd themes/hugo-book/layouts
ln -s _shortcodes shortcodes
```

