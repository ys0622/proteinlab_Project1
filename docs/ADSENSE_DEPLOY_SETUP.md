# AdSense Deploy Setup

ProteinLab AdSense 테스트는 일부 정보형 페이지에서만 동작한다. 값이 비어 있으면 광고 스크립트와 광고 블록은 렌더링되지 않는다.

## Environment Variables

```env
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_ADSENSE_GUIDE_TOP_SLOT=0000000000
NEXT_PUBLIC_ADSENSE_GUIDE_BOTTOM_SLOT=0000000000
NEXT_PUBLIC_ADSENSE_INSIGHT_MID_SLOT=0000000000
```

- `NEXT_PUBLIC_ADSENSE_CLIENT_ID`: AdSense publisher client id
- `NEXT_PUBLIC_ADSENSE_GUIDE_TOP_SLOT`: guide 본문 상단 테스트 슬롯
- `NEXT_PUBLIC_ADSENSE_GUIDE_BOTTOM_SLOT`: guide 본문 하단 테스트 슬롯
- `NEXT_PUBLIC_ADSENSE_INSIGHT_MID_SLOT`: insight 본문 중간 테스트 슬롯

## Local Development

1. `.env.example`을 참고해 `.env.local`에 실제 값을 입력한다.
2. `.env.local`은 `.gitignore` 대상이므로 커밋하지 않는다.
3. Next.js dev server가 이미 실행 중이면 재시작한다.

## Cloudflare Workers

현재 배포는 Cloudflare Pages가 아니라 `wrangler.jsonc`와 `deploy.cjs`를 사용하는 Cloudflare Workers 구조다.

- Worker name: `proteinlab-v2`
- Worker entry: `.open-next/worker.js`
- Deploy command: `npm run deploy`
- Production route: `proteinlab.kr/*`

Cloudflare Dashboard에서 설정할 경우:

1. `Workers & Pages`로 이동한다.
2. `proteinlab-v2` Worker를 선택한다.
3. `Settings` > `Variables and Secrets`에서 위 환경변수를 추가한다.
4. Production과 Preview 환경을 분리해서 운영하는 경우 동일한 변수명을 각각 등록한다.
5. 변수 변경 후 재배포한다.

주의: `NEXT_PUBLIC_` 변수는 클라이언트 번들에 반영되는 public build-time 값이다. `npm run deploy`로 로컬 빌드 후 배포하는 현재 구조에서는 배포 빌드 시점에도 값이 존재해야 한다. 실제 운영 값은 Cloudflare 변수 또는 배포 머신의 환경변수로 주입하고, `wrangler.jsonc`에는 빈 기본값만 둔다.

## Verification Checklist

- AdSense script URL에 `client=ca-pub-...`가 반영되는지 확인한다.
- `https://proteinlab.kr/ads.txt`가 `google.com, pub-..., DIRECT, f08c47fec0942fa0` 형식으로 응답하는지 확인한다.
- `/guides/intake-strategy-health/lean-massup-protein-intake`에 guide top/bottom slot이 반영되는지 확인한다.
- `/guides/market-insights/protein-drink-trend-2026`에 insight mid slot이 반영되는지 확인한다.
- 광고 값이 비어 있을 때 페이지가 정상 렌더링되는지 확인한다.
- 브라우저 콘솔에 hydration error 또는 AdSense push error가 없는지 확인한다.
- GA4 DebugView에서 `ad_impression`, `ad_click` 이벤트와 `page_type`, `page_path`, `ad_slot`, `device_type` 파라미터를 확인한다.

## ads.txt

`/ads.txt`는 `NEXT_PUBLIC_ADSENSE_CLIENT_ID`를 기준으로 자동 생성된다.

- 입력 env: `NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX`
- 출력 ads.txt: `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`

값이 비어 있으면 `/ads.txt`는 404로 응답한다. AdSense의 ads.txt 경고를 해소하려면 운영 배포 환경에 실제 client id를 넣고 재배포해야 한다.
