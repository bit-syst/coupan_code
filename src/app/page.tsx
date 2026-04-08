"use client";

import { useState } from "react";
import UploadSection from "@/components/UploadSection";
import Card from "@/components/Card";
import PrintButton from "@/components/PrintButton";
import PositionControls from "@/components/PositionControls";

export default function Home() {
  const [coupons, setCoupons] = useState<string[]>([]);
  // Default position targets the pill box on the left panel
  const [x, setX] = useState(25);
  const [y, setY] = useState(69.5);
  const [fontSize, setFontSize] = useState(15);

  const handlePos = (nx: number, ny: number, nf: number) => {
    setX(nx); setY(ny); setFontSize(nf);
  };

  return (
    <main>
      {/* Header */}
      <header className="app-header no-print">
        <h1 className="app-title">Coupon Card Printer</h1>
        <p className="app-subtitle">Upload your Excel → position the code → print</p>
      </header>

      {/* Upload */}
      <UploadSection onCoupons={setCoupons} />

      {coupons.length > 0 && (
        <>
          {/* Position controls */}
          <PositionControls x={x} y={y} fontSize={fontSize} onChange={handlePos} />

          {/* Print button */}
          <div className="controls no-print">
            <span className="count-badge">{coupons.length} card{coupons.length !== 1 ? "s" : ""}</span>
            <PrintButton />
          </div>
        </>
      )}

      {/* Preview */}
      {coupons.length > 0 ? (
        <section className="preview-section">
          {coupons.map((code, i) => (
            <Card key={i} coupon={code} x={x} y={y} fontSize={fontSize} />
          ))}
        </section>
      ) : (
        <div className="empty-state no-print">
          <p>No cards yet — upload an Excel file to get started.</p>
        </div>
      )}
    </main>
  );
}
