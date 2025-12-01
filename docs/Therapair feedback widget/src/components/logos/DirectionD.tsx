import React from 'react';

interface DirectionDProps {
  size?: number;
  showText?: boolean;
  variant?: 'organic' | 'flowing' | 'waves';
  color1?: string;
  color2?: string;
  color3?: string;
}

export function DirectionD({ 
  size = 120, 
  showText = true, 
  variant = 'organic',
  color1 = '#3B82F6',
  color2 = '#60A5FA',
  color3 = '#93C5FD'
}: DirectionDProps) {
  const textSize = size / 3;
  
  const renderOrganicT = () => (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Left flowing section - top bar left side */}
      <path
        d="M20 15 Q22 12, 28 14 L35 18 Q38 20, 42 22 L48 25 Q52 27, 54 30 L54 35 Q52 38, 48 38 L45 36 Q42 35, 38 32 L32 28 Q28 26, 25 28 L25 35 Q27 38, 30 40 L38 44 Q42 46, 45 50 L48 56 Q50 60, 50 65 L50 95 Q50 100, 48 103 L45 106 Q42 108, 38 106 L35 103 Q32 100, 32 95 L32 70 Q32 65, 30 62 L28 58 Q26 55, 22 52 L18 48 Q15 45, 15 40 L15 25 Q15 18, 20 15 Z"
        fill={color1}
      />
      
      {/* Middle flowing section - center */}
      <path
        d="M54 15 Q58 13, 62 15 L68 20 Q72 24, 72 30 L72 40 Q72 44, 70 47 L68 52 Q66 56, 66 60 L66 88 Q66 93, 64 96 L62 100 Q60 103, 56 103 L54 102 Q52 100, 52 96 L52 65 Q52 60, 54 56 L56 52 Q58 48, 58 44 L58 30 Q58 24, 56 20 L54 16 Z"
        fill={color2}
      />
      
      {/* Right flowing section - top bar right side */}
      <path
        d="M72 18 Q75 15, 80 16 L88 20 Q92 22, 95 26 L98 32 Q100 38, 100 44 L100 52 Q98 56, 94 58 L88 62 Q85 64, 82 68 L80 72 Q78 76, 78 80 L78 100 Q78 105, 75 108 L72 110 Q68 112, 65 108 L63 104 Q62 100, 62 95 L62 75 Q62 70, 64 66 L68 60 Q70 56, 74 52 L78 48 Q80 45, 82 42 L85 36 Q87 32, 87 28 L87 24 Q85 20, 82 18 L78 16 Q75 16, 72 18 Z"
        fill={color3}
      />
    </svg>
  );

  const renderFlowingT = () => (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Left organic blob - darker blue */}
      <path
        d="M22 20 C22 15, 25 12, 30 14 L42 20 C46 22, 50 24, 52 28 L54 35 C54 40, 50 42, 46 40 L35 32 C32 30, 28 30, 26 32 L26 38 C28 42, 32 44, 38 48 L46 54 C50 58, 52 62, 52 68 L52 96 C52 102, 48 106, 42 106 L38 104 C34 102, 32 98, 32 92 L32 68 C32 62, 30 58, 26 54 L20 48 C16 44, 15 38, 15 32 L15 24 C15 18, 18 16, 22 20 Z"
        fill={color1}
      />
      
      {/* Center organic blob - medium blue */}
      <path
        d="M54 16 C58 14, 62 14, 64 18 L68 26 C70 32, 70 38, 70 44 L70 50 C70 56, 68 62, 66 68 L66 90 C66 96, 64 100, 60 102 L56 104 C52 104, 50 100, 50 94 L50 68 C50 62, 52 56, 54 50 L56 44 C58 38, 58 32, 56 26 L54 20 C52 16, 54 14, 54 16 Z"
        fill={color2}
      />
      
      {/* Right organic blob - lighter blue */}
      <path
        d="M72 22 C75 18, 80 16, 85 20 L92 26 C96 30, 98 36, 100 42 L102 50 C102 56, 98 60, 94 64 L86 70 C82 74, 80 78, 80 84 L80 98 C80 104, 76 108, 70 108 L66 106 C64 104, 62 100, 62 94 L62 78 C62 72, 64 66, 68 62 L74 56 C78 52, 82 48, 84 42 L86 34 C88 28, 86 24, 82 22 L76 20 C72 20, 70 22, 72 22 Z"
        fill={color3}
      />
    </svg>
  );

  const renderWavesT = () => (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Top bar - three wave sections */}
      {/* Left wave */}
      <path
        d="M20 18 C20 18, 22 12, 28 15 Q35 18, 42 22 T52 30 L52 38 Q48 42, 40 38 T28 30 Q24 28, 24 32 L24 40 Q28 44, 34 48 T46 58 L48 64 Q48 70, 48 80 L48 98 Q46 104, 40 104 T32 100 L32 92 L32 68 Q32 60, 28 54 T20 44 Q16 40, 16 34 L16 24 Q16 18, 20 18 Z"
        fill={color1}
      />
      
      {/* Center wave */}
      <path
        d="M52 16 Q56 12, 60 16 L64 24 Q66 30, 66 38 T66 54 L66 64 Q66 72, 66 82 L66 94 Q64 100, 58 102 T52 98 L52 88 L52 64 Q52 54, 54 46 T58 32 Q60 24, 58 20 T52 16 Z"
        fill={color2}
      />
      
      {/* Right wave */}
      <path
        d="M68 20 Q72 16, 78 18 T90 26 Q96 32, 98 40 T98 52 Q96 58, 90 62 T80 70 Q78 74, 78 80 L78 90 Q78 98, 74 104 T66 106 Q64 104, 64 98 L64 86 L64 72 Q64 66, 68 60 T78 50 Q84 46, 86 40 T86 28 Q84 22, 78 20 T68 20 Z"
        fill={color3}
      />
    </svg>
  );

  const renderT = () => {
    switch (variant) {
      case 'flowing':
        return renderFlowingT();
      case 'waves':
        return renderWavesT();
      default:
        return renderOrganicT();
    }
  };

  return (
    <div className="flex items-center gap-4">
      {renderT()}
      
      {showText && (
        <span 
          style={{ 
            fontSize: `${textSize}px`,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontWeight: 500,
            color: '#1e293b',
            letterSpacing: '-0.02em'
          }}
        >
          herapair
        </span>
      )}
    </div>
  );
}
