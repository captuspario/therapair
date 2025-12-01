import { MessageCircle } from 'lucide-react';
import { useState } from 'react';

interface FeedbackCTAProps {
  position?: 'br' | 'bl';
  onClick: () => void;
  compact?: boolean;
}

export function FeedbackCTA({ position = 'br', onClick, compact = false }: FeedbackCTAProps) {
  const [state, setState] = useState<'default' | 'hover' | 'focus' | 'pressed'>('default');

  const handleMouseEnter = () => setState('hover');
  const handleMouseLeave = () => setState('default');
  const handleMouseDown = () => setState('pressed');
  const handleMouseUp = () => setState('hover');
  const handleFocus = () => setState('focus');
  const handleBlur = () => setState('default');

  const getStateStyles = () => {
    switch (state) {
      case 'hover':
        return 'bg-[#2F5985] shadow-[0_8px_24px_rgba(58,110,165,0.24)]';
      case 'focus':
        return 'bg-[#3A6EA5] shadow-[0_8px_24px_rgba(58,110,165,0.24)] ring-2 ring-[#3A6EA5] ring-offset-2';
      case 'pressed':
        return 'bg-[#2A5174] shadow-[0_4px_12px_rgba(58,110,165,0.16)] scale-[0.98]';
      default:
        return 'bg-[#3A6EA5] shadow-[0_6px_20px_rgba(58,110,165,0.2)]';
    }
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={`
        feedback_cta
        inline-flex items-center gap-2
        ${compact ? 'px-3 py-2.5' : 'px-4 py-3'}
        rounded-full
        text-white
        transition-all duration-200 ease-out
        ${getStateStyles()}
      `}
      style={{
        minWidth: '44px',
        minHeight: '44px',
        fontSize: '14px',
        lineHeight: '20px'
      }}
      aria-label="Tell us your feedback"
    >
      <MessageCircle className={compact ? 'w-4 h-4' : 'w-5 h-5'} />
      {!compact && <span>Tell us your feedback</span>}
    </button>
  );
}
