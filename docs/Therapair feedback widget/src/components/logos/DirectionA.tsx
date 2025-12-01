import React from 'react';

interface DirectionAProps {
  size?: number;
  showText?: boolean;
  color?: string;
}

export function DirectionA({ size = 120, showText = true, color = '#3B82F6' }: DirectionAProps) {
  const textSize = size / 4;
  
  return (
    <div className="flex items-center gap-4">
      {/* Interwoven Connection Symbol */}
      <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* First curve - representing one person/entity */}
        <path
          d="M30 40 Q45 25, 60 40 T90 40"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          opacity="0.9"
        />
        {/* Second curve - representing another person/entity, mirrored and interwoven */}
        <path
          d="M90 80 Q75 95, 60 80 T30 80"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          opacity="0.9"
        />
        {/* Connecting element in the middle */}
        <circle
          cx="60"
          cy="60"
          r="6"
          fill={color}
          opacity="0.8"
        />
        {/* Subtle gradient overlay circles for depth */}
        <circle
          cx="45"
          cy="40"
          r="4"
          fill={color}
          opacity="0.6"
        />
        <circle
          cx="75"
          cy="80"
          r="4"
          fill={color}
          opacity="0.6"
        />
      </svg>
      
      {showText && (
        <div className="flex flex-col">
          <span 
            style={{ 
              fontSize: `${textSize * 1.4}px`,
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontWeight: 500,
              color: '#1e293b',
              letterSpacing: '-0.02em'
            }}
          >
            Therapair
          </span>
        </div>
      )}
    </div>
  );
}
