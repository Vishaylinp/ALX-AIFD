"use client";

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeDisplayProps {
  value: string;
  size?: number;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ value, size = 128 }) => {
  return (
    <div className="flex justify-center my-4">
      <QRCodeSVG value={value} size={size} level="H" />
    </div>
  );
};

export default QRCodeDisplay;
