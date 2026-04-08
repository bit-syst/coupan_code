"use client";

import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";

interface UploadSectionProps {
  onCoupons: (codes: string[]) => void;
}

export default function UploadSection({ onCoupons }: UploadSectionProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setError(null);

    if (!file.name.endsWith(".xlsx")) {
      setError("Only .xlsx files are accepted.");
      return;
    }

    setLoading(true);
    setFileName(file.name);

    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows: Record<string, unknown>[] = XLSX.utils.sheet_to_json(sheet);

      const codes: string[] = rows
        .map((row) => {
          // Accept "coupon_code" key (case-insensitive)
          const key = Object.keys(row).find(
            (k) => k.toLowerCase().replace(/\s/g, "_") === "coupon_code"
          );
          return key ? String(row[key]).trim() : "";
        })
        .filter(Boolean);

      if (codes.length === 0) {
        setError(
          'No coupon codes found. Make sure the column header is "coupon_code".'
        );
      } else {
        onCoupons(codes);
      }
    } catch {
      setError("Failed to read the file. Please check it is a valid .xlsx.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    // reset so same file can be re-uploaded
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="upload-wrapper no-print">
      <div
        className="upload-zone"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".xlsx"
          onChange={handleChange}
          style={{ display: "none" }}
        />
        <svg
          className="upload-icon"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
          />
        </svg>

        {loading ? (
          <p className="upload-hint">Parsing file…</p>
        ) : fileName ? (
          <p className="upload-hint">
            <strong>{fileName}</strong> loaded. Drop another to replace.
          </p>
        ) : (
          <>
            <p className="upload-main">Click or drag &amp; drop your Excel file here</p>
            <p className="upload-hint">Accepts .xlsx only · Column header: coupon_code</p>
          </>
        )}
      </div>

      {error && <p className="upload-error">{error}</p>}
    </div>
  );
}
