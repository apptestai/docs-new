# Apptest.ai Documentation

AI 기반 모바일 앱 자동 테스트 플랫폼의 공식 문서 사이트입니다.

## 🚀 빠른 시작

```bash
# 저장소 클론
git clone https://github.com/apptestai/docs-new.git
cd docs-new
git submodule update --init --recursive

# 로컬 서버 실행
hugo server
```

**접속:** http://localhost:1313

## 📝 문서 편집

### 방법 1: Decap CMS 사용 (권장)

**로컬:**
```bash
npx decap-server  # 터미널 1
hugo server       # 터미널 2
```
→ http://localhost:1313/admin/

**프로덕션:**  
→ https://apptestai.github.io/docs-new/admin/  
→ 처음 사용 시: [OAuth 설정 가이드](docs/netlify-oauth.md)

### 방법 2: 마크다운 직접 편집

`content/` 폴더의 `.md` 파일을 직접 수정

## 🌐 배포

```bash
git push origin main  # GitHub Actions 자동 배포
```

**사이트:** https://apptestai.github.io/docs-new/

## 📚 더 알아보기

- [배포 가이드](docs/deployment.md) - 수동 배포, 문제 해결
- [OAuth 설정](docs/netlify-oauth.md) - Decap CMS 인증 설정
- [문서 작성 규칙](.cursorrules) - Hugo Book 테마 shortcodes

## 🔧 빠른 문제 해결

**테마 없음:**
```bash
git submodule update --init --recursive
```

**Shortcode 에러:**
```bash
cd themes/hugo-book/layouts && ln -s _shortcodes shortcodes
```

## 📂 프로젝트 구조

```
docs-new/
├── content/          # 📄 문서 콘텐츠 (en/ko)
├── static/           # 🖼️  이미지, 정적 파일
├── config/           # ⚙️  Hugo 설정
├── docs/             # 📖 개발자 가이드
└── themes/hugo-book/ # 🎨 Hugo Book 테마
```

