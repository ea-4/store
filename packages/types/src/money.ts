/**
 * Converts integer pesewas to a formatted GHS currency string:
 * 2450 -> "GH₵ 24.50"
 */
export function toCedis(pesewas: number): string {
    return new Intl.NumberFormat("en-GH", {
        style: "currency",
        currency: "GHS",
        minimumFractionDigits: 2,
    }).format(pesewas/100)
}


/**
 * Converts user input (cedis) into integer pesewas for storage/APIs:
 * "24.50" -> 2450
 * 24.5 -> 2450
 */
export function toPesewas(cedis: number | string): number {
  const parsed = typeof cedis === "string" ? parseFloat(cedis) : cedis;
  return Math.round(parsed * 100);
}