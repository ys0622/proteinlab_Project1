"""운영실 페이지 만들기: 템플릿에 사이트 이름을 넣고 Pretendard 가변 폰트를 base64로 넣는다.

claude.ai 아티팩트는 외부 폰트를 Google Fonts에서만 불러올 수 있어서 Pretendard는 페이지 안에 넣어야 한다.
폰트: npm pretendard@1.3.9 dist/web/variable/woff2/PretendardVariable.woff2 (OFL, 약 2MB → 페이지 약 2.8MB)

사용: python -X utf8 build_ops_page.py <템플릿> <폰트.woff2> <출력.html> "<사이트 이름>" "<요청 칸 예시 문구>"
"""
import base64, sys

tpl, font, out, site, example = sys.argv[1:6]
html = open(tpl, encoding="utf-8").read()
b64 = base64.b64encode(open(font, "rb").read()).decode()
face = ('@font-face{font-family:"Pretendard Variable";font-weight:45 920;font-style:normal;'
        'font-display:swap;src:url(data:font/woff2;base64,' + b64 + ') format("woff2")}')
html = html.replace("/*PRETENDARD_FONT_FACE*/", face).replace("{{SITE}}", site).replace("{{REQUEST_EXAMPLE}}", example)
assert "{{" not in html, "치환 안 된 자리표시가 남았다"
open(out, "w", encoding="utf-8").write(html)
print(out, len(html) // 1024, "KB")
