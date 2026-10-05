// Refresh boundary is 07:35 KST. It is not an asserted deal expiry time.
export function goldboxRefreshBoundary(now = Date.now()): number {
  const kst = new Date(now + 9 * 60 * 60 * 1000);
  let boundary = Date.UTC(kst.getUTCFullYear(), kst.getUTCMonth(), kst.getUTCDate(), 7, 35) - 9 * 60 * 60 * 1000;
  if (now < boundary) boundary -= 24 * 60 * 60 * 1000;
  return boundary;
}
