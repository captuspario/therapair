import React from 'react';

interface DirectionCProps {
  size?: number;
  color?: string;
  layout?: 'horizontal' | 'stacked';
}

export function DirectionC({ size = 48, color = '#3B82F6', layout = 'horizontal' }: DirectionCProps) {
  if (layout === 'stacked') {
    return (
      <div className="flex flex-col items-center gap-3">
        {/* Compact symbol */}
        <svg width={size * 1.5} height={size * 1.5} viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M18 24 Q27 15, 36 24 T54 24"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M54 48 Q45 57, 36 48 T18 48"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="36" cy="36" r="3.5" fill={color} />
          <circle cx="27" cy="24" r="2.5" fill={color} opacity="0.6" />
          <circle cx="45" cy="48" r="2.5" fill={color} opacity="0.6" />
        </svg>
        
        <span 
          style={{ 
            fontSize: `${size * 0.8}px`,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontWeight: 500,
            color: '#1e293b',
            letterSpacing: '-0.02em'
          }}
        >
          Therapair
        </span>
      </div>
    );
  }
  
  return (
    <div className="flex items-center gap-4">
      {/* Balanced symbol */}
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 16 Q18 10, 24 16 T36 16"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M36 32 Q30 38, 24 32 T12 32"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="24" cy="24" r="2.5" fill={color} />
        <circle cx="18" cy="16" r="1.8" fill={color} opacity="0.6" />
        <circle cx="30" cy="32" r="1.8" fill={color} opacity="0.6" />
      </svg>
      
      <span 
        style={{ 
          fontSize: `${size}px`,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontWeight: 500,
          color: '#1e293b',
          letterSpacing: '-0.02em'
        }}
      >
        Therapair
      </span>
    </div>
  );
}
