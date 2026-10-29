// 이름 끝에 따라 주제 조사 은/는을 붙인다.
// 숫자+g로 끝나면 "그램"으로 읽혀 받침이 있고, 숫자+mL이면 "리터"로 읽혀 받침이 없다.
// 그 외에는 괄호 등을 건너뛰고 마지막 한글 글자의 받침으로 정한다.
function hasBatchim(trimmed: string): boolean {
  if (/\d\s*(g|kg)$/i.test(trimmed)) return true;
  if (/\d\s*(ml|l)$/i.test(trimmed)) return false;
  // 숫자로 끝나면 마지막 숫자를 읽은 소리로 정한다(99.9 → "구" → 받침 없음).
  const digit = trimmed.match(/(\d)$/);
  if (digit) return "013678".includes(digit[1]);
  const syllables = trimmed.match(/[가-힣]/g);
  return syllables ? (syllables[syllables.length - 1].charCodeAt(0) - 0xac00) % 28 !== 0 : false;
}

export function withTopic(text: string): string {
  return `${text}${hasBatchim(text.trim()) ? "은" : "는"}`;
}

export function withAnd(text: string): string {
  return `${text}${hasBatchim(text.trim()) ? "과" : "와"}`;
}

export function withSubject(text: string): string {
  return `${text}${hasBatchim(text.trim()) ? "이" : "가"}`;
}

export function withObject(text: string): string {
  return `${text}${hasBatchim(text.trim()) ? "을" : "를"}`;
}
