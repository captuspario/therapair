import React from 'react';

interface DirectionBProps {
  size?: number;
  color?: string;
}

export function DirectionB({ size = 48, color = '#3B82F6' }: DirectionBProps) {
  return (
    <div className="flex items-center">
      <svg width={size * 6} height={size * 1.5} viewBox="0 0 360 72" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: color, stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: color, stopOpacity: 0.8 }} />
          </linearGradient>
        </defs>
        
        {/* Custom wordmark with special attention to "pair" ligature */}
        <text
          x="0"
          y="50"
          fontFamily="system-ui, -apple-system, 'Segoe UI', sans-serif"
          fontSize="56"
          fontWeight="500"
          fill="#1e293b"
          letterSpacing="-1"
        >
          Thera
        </text>
        
        {/* "pair" with custom styling and connection */}
        <text
          x="155"
          y="50"
          fontFamily="system-ui, -apple-system, 'Segoe UI', sans-serif"
          fontSize="56"
          fontWeight="500"
          fill="url(#textGradient)"
          letterSpacing="-1"
        >
          pair
        </text>
        
        {/* Subtle connection arc between 'a' and 'p' */}
        <path
          d="M 155 30 Q 165 20, 175 30"
          stroke={color}
          strokeWidth="2.5"
          fill="none"
          opacity="0.4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
