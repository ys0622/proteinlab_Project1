// 이름 끝에 따라 주제 조사 은/는을 붙인다.
// 숫자+g로 끝나면 "그램"으로 읽혀 받침이 있고, 숫자+mL이면 "리터"로 읽혀 받침이 없다.
// 그 외에는 괄호 등을 건너뛰고 마지막 한글 글자의 받침으로 정한다.
export function withTopic(text: string): string {
  const trimmed = text.trim();
  let batchim: boolean;
  if (/\d\s*(g|kg)$/i.test(trimmed)) batchim = true;
  else if (/\d\s*(ml|l)$/i.test(trimmed)) batchim = false;
  else {
    const syllables = trimmed.match(/[가-힣]/g);
    batchim = syllables ? (syllables[syllables.length - 1].charCodeAt(0) - 0xac00) % 28 !== 0 : false;
  }
  return `${text}${batchim ? "은" : "는"}`;
}
