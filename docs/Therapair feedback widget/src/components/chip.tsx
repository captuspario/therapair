import { useState } from 'react';

interface ChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

type ChipState = 'default' | 'hover' | 'focus';

export function Chip({ label, selected, onClick, disabled = false }: ChipProps) {
  const [state, setState] = useState<ChipState>('default');

  const handleMouseEnter = () => !disabled && setState('hover');
  const handleMouseLeave = () => !disabled && setState('default');
  const handleFocus = () => !disabled && setState('focus');
  const handleBlur = () => !disabled && setState('default');

  const getStyles = () => {
    if (disabled) {
      return 'bg-[#F7F9FB] text-[#6B7280] border-[#E5E7EB] cursor-not-allowed opacity-50';
    }

    if (selected) {
      return 'bg-[#3A6EA5]/10 text-[#3A6EA5] border-[#3A6EA5]';
    }

    switch (state) {
      case 'hover':
        return 'bg-[#F7F9FB] text-[#1F2937] border-[#3A6EA5]/50';
      case 'focus':
        return 'bg-[#F7F9FB] text-[#1F2937] border-[#3A6EA5] ring-2 ring-[#3A6EA5] ring-offset-1';
      default:
        return 'bg-[#F7F9FB] text-[#1F2937] border-[#E5E7EB]';
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center
        px-3 py-1.5
        rounded-xl
        border
        transition-all duration-150
        ${getStyles()}
      `}
      style={{
        fontSize: '14px',
        lineHeight: '20px',
        minHeight: '32px'
      }}
      role="checkbox"
      aria-checked={selected}
      aria-label={label}
    >
      {label}
    </button>
  );
}
