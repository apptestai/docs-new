# Netlify OAuth 설정 가이드

> **목표:** GitHub Pages 호스팅 + Decap CMS OAuth만 Netlify 서비스 이용

## 🚀 설정 단계

### 1️⃣ Netlify 사이트 생성

1. https://app.netlify.com 접속
2. **Add new site** → **Import an existing project**
3. GitHub 저장소 `apptestai/docs-new` 선택
4. 빌드 설정 (자동 감지됨):
   ```
   Build command: hugo --environment production --minify
   Publish directory: public
   ```
5. **Deploy site** 클릭

✅ 배포 완료 후 URL 확인 (예: `https://apptestai-docs.netlify.app`)

### 2️⃣ GitHub OAuth App 생성

**GitHub → Settings → Developer settings → OAuth Apps → New OAuth App**

| 항목 | 값 |
|------|------|
| Application name | `Apptest.ai Docs CMS` |
| Homepage URL | `https://apptestai.github.io/docs-new/` |
| Authorization callback URL | `https://api.netlify.com/auth/done` |

✅ **Client ID**와 **Client Secret** 복사

### 3️⃣ Netlify OAuth 연결

**Netlify → Site settings → Access control → OAuth**

1. **Install provider** → **GitHub** 선택
2. Client ID와 Client Secret 붙여넣기
3. **Install** 클릭

### 4️⃣ config.yml 업데이트

`static/admin/config.yml` 파일에서 `site_domain` 수정:

```yaml
backend:
  name: github
  repo: apptestai/docs-new
  branch: main
  site_domain: apptestai-docs.netlify.app  # ← 실제 Netlify 도메인
  base_url: https://api.netlify.com
  auth_endpoint: auth
```

⚠️ **중요:** `site_domain`을 3단계에서 확인한 실제 도메인으로 변경!

### 5️⃣ 테스트

1. https://apptestai.github.io/docs-new/admin/ 접속
2. **Login with GitHub** 클릭
3. GitHub 인증 화면에서 승인
4. ✅ Admin 대시보드 접속 성공!

---

## 📊 아키텍처

```
사용자
  ↓
GitHub Pages (정적 호스팅)
https://apptestai.github.io/docs-new/
  ↓ /admin 페이지 접속
Netlify OAuth (인증만)
https://api.netlify.com/auth
  ↓
✅ Decap CMS 사용 가능
```

## 💰 비용

| 서비스 | 용도 | 비용 |
|--------|------|------|
| GitHub Pages | 정적 호스팅 | ✅ 무료 |
| Netlify OAuth | CMS 인증만 | ✅ 무료 |
| Netlify Functions | ❌ 미사용 | ✅ 0원 |

**총 비용: 완전 무료** 🎉

---

## 🔍 문제 해결

| 에러 | 원인 | 해결 방법 |
|------|------|-----------|
| "Failed to load settings" | `site_domain` 불일치 | `static/admin/config.yml` 수정 |
| "OAuth error" | Callback URL 오류 | GitHub OAuth App 설정 확인<br>`https://api.netlify.com/auth/done` |
| "Not Found" | GitHub Pages 미배포 | `git push origin main` 후 대기 |
| "Config Error" | YAML 문법 오류 | `config.yml` 들여쓰기 확인 |

