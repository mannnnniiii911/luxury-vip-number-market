export function formatINR(amount: number | string): string {
  return '₹' + Number(amount || 0).toLocaleString('en-IN');
}

export function maxRepeatCount(raw: string): number {
  if (!raw) return 0;
  const freq: Record<string, number> = {};
  for (const ch of raw) {
    if (ch >= '0' && ch <= '9') freq[ch] = (freq[ch] || 0) + 1;
  }
  const vals = Object.values(freq);
  return vals.length > 0 ? Math.max(...vals) : 0;
}
