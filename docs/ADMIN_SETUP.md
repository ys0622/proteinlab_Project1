# ProteinLab 관리자 설정 가이드

## 1. 관리자 비밀번호 설정 방법

### 1단계: 환경 변수 파일 생성

프로젝트 루트 폴더(`d:\proteinlab`)에 `.env.local` 파일을 만듭니다.

**파일 위치**
```
d:\proteinlab\.env.local
```

**생성 방법 (Windows)**
- **방법 A**: `env.example` 파일을 복사하여 `.env.local`로 저장 후 비밀번호 수정
- **방법 B**: Cursor/VSCode에서 `proteinlab` 폴더 우클릭 → 새 파일 → `.env.local` 입력
- **방법 C**: 터미널에서 `cd d:\proteinlab` 후 `Copy-Item env.example .env.local` 실행

---

### 2단계: 환경 변수 입력

`.env.local` 파일을 열고 아래 내용을 **복사한 뒤**, `ADMIN_PASSWORD` 값을 **원하는 비밀번호로 변경**합니다.

```env
# ===========================================
# ProteinLab 관리자 설정
# ===========================================
# 이 파일은 Git에 올라가지 않습니다. (.gitignore)

# [필수] 관리자 로그인 비밀번호
# /admin/login 에서 사용하는 비밀번호입니다.
ADMIN_PASSWORD=여기에_원하는_비밀번호_입력

# [선택] 세션 서명 키
# 설정하지 않으면 기본값이 사용됩니다. 프로덕션에서는 랜덤 문자열 권장.
# SESSION_SECRET=랜덤한-64자-이상-문자열

# [선택] remove.bg API 키
# 이미지 배경 제거 기능 사용 시 필요 (관리자 > 이미지 작업)
# REMOVE_BG_API_KEY=your-remove-bg-api-key
```

**예시 (비밀번호를 `proteinlab2025`로 설정하는 경우)**
```env
ADMIN_PASSWORD=proteinlab2025
```

---

### 3단계: 개발 서버 재시작

환경 변수는 서버 시작 시 로드됩니다. **반드시 개발 서버를 재시작**해야 합니다.

1. 터미널에서 실행 중인 `npm run dev` **중지** (Ctrl+C)
2. 다시 실행: `npm run dev`

---

### 4단계: 로그인 확인

1. 브라우저에서 `http://localhost:3000/admin/login` 접속
2. 설정한 비밀번호 입력
3. 로그인 버튼 클릭

---

## 2. 비밀번호를 잊어버렸을 때

`.env.local` 파일의 `ADMIN_PASSWORD` 값을 새 비밀번호로 **수정**한 뒤, 개발 서버를 재시작하면 됩니다.

```env
# 기존
ADMIN_PASSWORD=잊어버린비밀번호

# 변경
ADMIN_PASSWORD=새비밀번호123
```

---

## 3. 환경 변수 요약

| 변수명 | 필수 | 설명 | 기본값 |
|--------|------|------|--------|
| `ADMIN_PASSWORD` | ✅ | 관리자 로그인 비밀번호 | 없음 (설정 필수) |
| `SESSION_SECRET` | ❌ | 세션 토큰 서명 키 | proteinlab-session-secret-change-me |
| `REMOVE_BG_API_KEY` | ❌ | remove.bg API 키 (배경 제거) | 없음 |

---

## 4. 주의사항

- `.env.local`은 **Git에 올라가지 않습니다.** (보안)
- 비밀번호는 **8자 이상**, 영문·숫자 조합 권장
- 프로덕션(실서버) 배포 시 Vercel/호스팅 대시보드에서 환경 변수 설정 필요
