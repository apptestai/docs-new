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

