"use client";

interface CardProps {
  coupon: string;
  x: number;      // 0-100 %
  y: number;      // 0-100 %
  fontSize: number;
}

export default function Card({ coupon, x, y, fontSize }: CardProps) {
  return (
    <div className="coupon-card">
      {/* Card image — visible on screen, hidden on print */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/coupon-card.jpeg" alt="" className="card-bg-img" />

      {/* Coupon code overlay */}
      <div
        className="coupon-overlay"
        style={{ left: `${x}%`, top: `${y}%` }}
      >
        <span
          className="coupon-code-text"
          style={{ fontSize: `${fontSize}px` }}
        >
          {coupon}
        </span>
      </div>
    </div>
  );
}
