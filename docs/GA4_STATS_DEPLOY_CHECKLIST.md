# GA4 관리자 통계 배포 체크리스트

ProteinLab 관리자 페이지의 `통계` 메뉴를 운영 환경에서 바로 연결하기 위한 체크리스트입니다.

## 1. Google Cloud에서 서비스 계정 만들기

1. Google Cloud Console에 접속합니다.
2. GA4 조회에 사용할 프로젝트를 선택하거나 새로 만듭니다.
3. `IAM 및 관리자` → `서비스 계정`으로 이동합니다.
4. `서비스 계정 만들기`를 누릅니다.
5. 이름 예시:
   - `proteinlab-ga4-reader`
6. 생성 후 해당 서비스 계정 상세 페이지로 들어갑니다.
7. `키` 탭 → `키 추가` → `새 키 만들기`를 선택합니다.
8. `JSON` 형식으로 키를 발급받아 다운로드합니다.
9. 다운로드한 JSON에서 아래 값을 확인합니다.
   - `client_email`
   - `private_key`

## 2. Google Analytics Property에 읽기 권한 부여

1. Google Analytics에 접속합니다.
2. 대상 GA4 Property를 선택합니다.
3. `관리`로 이동합니다.
4. `속성 액세스 관리`로 들어갑니다.
5. `+` → 사용자 추가를 클릭합니다.
6. 서비스 계정 이메일을 입력합니다.
   - 예: `proteinlab-ga4-reader@your-project.iam.gserviceaccount.com`
7. 권한은 최소 `뷰어(Viewer)` 이상으로 부여합니다.
8. 저장합니다.
9. 저장 후 권한 반영까지 몇 분 걸릴 수 있으니 잠시 기다린 뒤 테스트합니다.

## 3. Cloudflare에 값 넣기

필요한 값:

- `GA4_PROPERTY_ID`
- `GA4_CLIENT_EMAIL`
- `GA4_PRIVATE_KEY`

권장 방식:

- `GA4_CLIENT_EMAIL`: secret
- `GA4_PRIVATE_KEY`: secret
- `GA4_PROPERTY_ID`: env 또는 secret

### Cloudflare Dashboard에서 설정

1. Cloudflare Dashboard에 접속합니다.
2. `proteinlab-v2` 프로젝트 또는 Worker를 선택합니다.
3. `Settings` → `Variables and Secrets`로 이동합니다.
4. 아래 값을 추가합니다.
   - `GA4_PROPERTY_ID`
   - `GA4_CLIENT_EMAIL`
   - `GA4_PRIVATE_KEY`
5. 저장 후 다시 배포합니다.

### 값 입력 시 주의사항

- `GA4_PROPERTY_ID`:
  - GA Measurement ID(`G-XXXX`)가 아니라 숫자 Property ID여야 합니다.
- `GA4_CLIENT_EMAIL`:
  - JSON의 `client_email` 값을 그대로 사용합니다.
- `GA4_PRIVATE_KEY`:
  - JSON의 `private_key` 전체를 그대로 사용합니다.
  - `-----BEGIN PRIVATE KEY-----`부터 `-----END PRIVATE KEY-----`까지 포함해야 합니다.
  - 줄바꿈이 `\n`으로 들어가도 서버에서 실제 줄바꿈으로 변환하도록 구현돼 있어야 합니다.

### CLI 예시

```bash
wrangler secret put GA4_CLIENT_EMAIL
wrangler secret put GA4_PRIVATE_KEY
```

`GA4_PROPERTY_ID`는 대시보드 env 또는 `wrangler.jsonc`/설정 파일의 일반 변수로 관리할 수 있습니다.

## 4. 개발 / 운영 환경별 주의사항

- 개발용과 운영용 GA4 Property를 가능하면 분리합니다.
- 로컬 개발 시 `.dev.vars` 또는 별도 로컬 secret을 사용합니다.
- 운영용 서비스 계정 키 JSON 파일은 저장소에 커밋하지 않습니다.
- `NEXT_PUBLIC_GA_ID`는 프론트 추적용이며, 관리자 통계 조회용과는 별개입니다.
- Preview 환경과 Production 환경에 값이 각각 들어갔는지 확인합니다.

## 5. 정상 동작 확인 방법

1. 관리자 계정으로 로그인합니다.
2. `/admin/stats`에 접속합니다.
3. 미설정 안내 박스가 사라졌는지 확인합니다.
4. KPI 카드 4개가 숫자로 표시되는지 확인합니다.
   - 오늘 방문자 수
   - 오늘 페이지뷰
   - 최근 7일 방문자 수
   - 최근 30일 페이지뷰
5. 최근 14일 일자별 방문 추이 표가 보이는지 확인합니다.
6. 상위 페이지 Top 10 표가 보이는지 확인합니다.
7. 트래픽 소스 Top 10 표가 보이는지 확인합니다.
8. 숫자에 천 단위 콤마가 적용되는지 확인합니다.
9. `마지막 동기화 시각`이 표시되는지 확인합니다.
10. `새로고침` 버튼이 정상 동작하는지 확인합니다.
11. 모바일에서 KPI 카드와 표 레이아웃이 깨지지 않는지 확인합니다.

## 6. 자주 발생하는 오류와 해결법

### `permission denied` 또는 권한 없음

- 서비스 계정 이메일이 GA4 `속성 액세스 관리`에 추가됐는지 확인합니다.
- 권한이 `뷰어(Viewer)` 이상인지 확인합니다.

### `property not found`

- `GA4_PROPERTY_ID`에 Measurement ID가 아닌 Property ID 숫자를 넣었는지 확인합니다.

### `invalid_grant` 또는 인증 실패

- `GA4_PRIVATE_KEY`가 잘리지 않았는지 확인합니다.
- private key 줄바꿈이 깨졌는지 확인합니다.
- 다른 프로젝트의 서비스 계정 키를 넣은 것은 아닌지 확인합니다.

### 응답은 오지만 데이터가 0으로 보임

- 잘못된 Property를 연결했는지 확인합니다.
- 권한 반영 직후라면 몇 분 뒤 다시 확인합니다.
- 실제 해당 기간에 트래픽이 있었는지 GA4 원본 화면에서 비교 확인합니다.

### 로컬에서는 되는데 운영에서 실패

- Cloudflare Production 환경에 secret이 실제로 저장됐는지 확인합니다.
- Preview에만 넣고 Production에는 빠뜨리지 않았는지 확인합니다.

### quota 또는 일시 오류

- 잠시 후 다시 시도합니다.
- 캐시 TTL이 적용돼 있다면 이전 성공 데이터가 fallback으로 보이는지 확인합니다.

## 빠른 최종 확인

- [ ] 서비스 계정 생성 완료
- [ ] GA4 Property에 서비스 계정 뷰어 권한 부여 완료
- [ ] `GA4_PROPERTY_ID` 설정 완료
- [ ] `GA4_CLIENT_EMAIL` 설정 완료
- [ ] `GA4_PRIVATE_KEY` 설정 완료
- [ ] 운영 환경 재배포 완료
- [ ] `/admin/stats` KPI 카드 노출 확인
- [ ] Top Pages / Source-Medium 표 노출 확인
- [ ] 모바일 레이아웃 확인
