"use client";

interface Props {
  x: number;
  y: number;
  fontSize: number;
  onChange: (x: number, y: number, fontSize: number) => void;
}

export default function PositionControls({ x, y, fontSize, onChange }: Props) {
  return (
    <div className="pos-wrap no-print">
      <div className="pos-panel">
        <div className="pos-panel__title">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>
          </svg>
          Coupon Code Position
        </div>

        <div className="pos-row">
          <label className="pos-label">
            <span>← X (horizontal) →</span>
            <span className="pos-val">{x}%</span>
          </label>
          <input
            type="range" min={0} max={100} step={0.5}
            value={x}
            onChange={e => onChange(Number(e.target.value), y, fontSize)}
            className="pos-slider"
          />
        </div>

        <div className="pos-row">
          <label className="pos-label">
            <span>↑ Y (vertical) ↓</span>
            <span className="pos-val">{y}%</span>
          </label>
          <input
            type="range" min={0} max={100} step={0.5}
            value={y}
            onChange={e => onChange(x, Number(e.target.value), fontSize)}
            className="pos-slider"
          />
        </div>

        <div className="pos-row">
          <label className="pos-label">
            <span>Aa Font size</span>
            <span className="pos-val">{fontSize}px</span>
          </label>
          <input
            type="range" min={6} max={40} step={0.5}
            value={fontSize}
            onChange={e => onChange(x, y, Number(e.target.value))}
            className="pos-slider"
          />
        </div>

        <p className="pos-hint">
          Drag sliders to position the code on the card. When you <strong>Print</strong>, only the text is printed — load your physical cards into the printer tray first.
        </p>
      </div>
    </div>
  );
}
