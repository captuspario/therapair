import { useState } from 'react';
import { Star } from 'lucide-react';

interface RatingControlProps {
  style: 'star' | 'emoji';
  value: number;
  onChange: (value: number) => void;
}

const emojiOptions = ['😞', '😕', '😐', '🙂', '😊'];

export function RatingControl({ style, value, onChange }: RatingControlProps) {
  const [hoveredValue, setHoveredValue] = useState<number>(0);

  const displayValue = hoveredValue || value;

  if (style === 'emoji') {
    return (
      <div className="flex gap-2" role="radiogroup" aria-label="Rating">
        {emojiOptions.map((emoji, index) => {
          const ratingValue = index + 1;
          const isSelected = value === ratingValue;
          const isHovered = hoveredValue === ratingValue;

          return (
            <button
              key={ratingValue}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(ratingValue)}
              onMouseEnter={() => setHoveredValue(ratingValue)}
              onMouseLeave={() => setHoveredValue(0)}
              className={`
                text-4xl
                transition-all duration-150
                ${isSelected || isHovered ? 'scale-110' : 'scale-100'}
                ${!isSelected && !isHovered ? 'opacity-40' : 'opacity-100'}
                hover:scale-110
                focus:outline-none focus:ring-2 focus:ring-[#3A6EA5] rounded-lg
              `}
              style={{
                minWidth: '44px',
                minHeight: '44px'
              }}
              aria-label={`Rating ${ratingValue} of 5`}
            >
              {emoji}
            </button>
          );
        })}
      </div>
    );
  }

  // Star rating
  return (
    <div className="flex gap-1" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map(starValue => {
        const isFilled = starValue <= displayValue;
        const isSelected = value === starValue;

        return (
          <button
            key={starValue}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(starValue)}
            onMouseEnter={() => setHoveredValue(starValue)}
            onMouseLeave={() => setHoveredValue(0)}
            className={`
              transition-all duration-150
              ${isFilled ? 'text-[#3A6EA5]' : 'text-[#E5E7EB]'}
              hover:scale-110
              focus:outline-none focus:ring-2 focus:ring-[#3A6EA5] rounded
            `}
            style={{
              minWidth: '44px',
              minHeight: '44px'
            }}
            aria-label={`Rating ${starValue} of 5 stars`}
          >
            <Star
              className="w-8 h-8"
              fill={isFilled ? 'currentColor' : 'none'}
              strokeWidth={1.5}
            />
          </button>
        );
      })}
    </div>
  );
}
