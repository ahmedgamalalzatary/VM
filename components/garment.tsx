import type { Product } from "@/lib/products";

/**
 * The taper diagram: one leg in profile, thigh to hem, drawn to scale.
 * It answers the question a photograph can't — how narrow does this actually
 * get at the ankle?
 */
export function TaperDiagram({ product }: { product: Product }) {
  const { thigh, hem, inseam } = product.measurements;
  const scale = 3.1;
  const top = thigh * scale;
  const bottom = hem * scale;
  const height = 300;
  const cx = 110;

  return (
    <svg viewBox="0 0 220 360" className="w-full" role="img"
      aria-label={`Leg taper: ${thigh} cm at the thigh narrowing to ${hem} cm at the hem over a ${inseam} cm inseam`}>
      <path
        d={`M ${cx - top / 2} 20 L ${cx + top / 2} 20 L ${cx + bottom / 2} ${20 + height} L ${cx - bottom / 2} ${20 + height} Z`}
        fill="var(--color-mist)"
        stroke="var(--color-azure-deep)"
        strokeWidth={1.5}
      />
      {/* Thigh measure */}
      <g stroke="var(--color-ink)" strokeWidth={1}>
        <path d={`M ${cx - top / 2} 12 L ${cx + top / 2} 12`} />
        <path d={`M ${cx - top / 2} 8 L ${cx - top / 2} 16`} />
        <path d={`M ${cx + top / 2} 8 L ${cx + top / 2} 16`} />
      </g>
      <text
        x={cx}
        y={6}
        textAnchor="middle"
        className="t-num"
        fontSize={11}
        fill="var(--color-ink)"
      >
        {thigh} cm
      </text>
      {/* Hem measure */}
      <g stroke="var(--color-ink)" strokeWidth={1}>
        <path d={`M ${cx - bottom / 2} ${28 + height} L ${cx + bottom / 2} ${28 + height}`} />
        <path d={`M ${cx - bottom / 2} ${24 + height} L ${cx - bottom / 2} ${32 + height}`} />
        <path d={`M ${cx + bottom / 2} ${24 + height} L ${cx + bottom / 2} ${32 + height}`} />
      </g>
      <text
        x={cx}
        y={48 + height}
        textAnchor="middle"
        className="t-num"
        fontSize={11}
        fill="var(--color-ink)"
      >
        {hem} cm
      </text>
      {/* Inseam, running down the inner edge */}
      <g stroke="var(--color-ink-soft)" strokeWidth={1} strokeDasharray="3 3">
        <path d={`M ${cx + top / 2 + 22} 20 L ${cx + bottom / 2 + 22} ${20 + height}`} />
      </g>
      <text
        x={cx + top / 2 + 28}
        y={20 + height / 2}
        className="t-num"
        fontSize={11}
        fill="var(--color-ink-soft)"
      >
        {inseam} cm
      </text>
    </svg>
  );
}
