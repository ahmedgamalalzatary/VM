const EGP = new Intl.NumberFormat("en-EG", {
  maximumFractionDigits: 0,
});

/** Prices are whole pounds throughout the catalogue. */
export function price(value: number) {
  return `EGP ${EGP.format(value)}`;
}

export function orderNumber(seed: number) {
  return `VM-${String(seed).padStart(6, "0")}`;
}
