import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { RatingControl } from './rating-control';
import { Chip } from './chip';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  ratingStyle?: 'star' | 'emoji';
}

type ModalState = 'form' | 'success';

const areaOptions = ['Bug', 'Usability', 'Speed', 'Content', 'Accessibility', 'Other'];

export function FeedbackModal({ isOpen, onClose, ratingStyle = 'star' }: FeedbackModalProps) {
  const [modalState, setModalState] = useState<ModalState>('form');
  const [rating, setRating] = useState<number>(0);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [feedbackText, setFeedbackText] = useState<string>('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 480);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setModalState('form');
      setRating(0);
      setSelectedAreas([]);
      setFeedbackText('');
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (rating === 0) return;

    // Simulate capturing metadata
    const payload = {
      rating,
      areas: selectedAreas,
      feedback_text: feedbackText,
      page_url: window.location.href,
      user_agent: navigator.userAgent,
      viewport_w: window.innerWidth,
      viewport_h: window.innerHeight,
      created_at: new Date().toISOString()
    };

    console.log('Feedback submitted:', payload);

    setModalState('success');

    // Close modal after 2 seconds
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const toggleArea = (area: string) => {
    setSelectedAreas(prev =>
      prev.includes(area)
        ? prev.filter(a => a !== area)
        : [...prev, area]
    );
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className={`
          feedback_modal
          fixed z-50
          ${isMobile
            ? 'inset-x-0 bottom-0 rounded-t-[14px]'
            : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[14px] w-full max-w-[360px]'
          }
          bg-white
          shadow-[0_20px_60px_rgba(0,0,0,0.3)]
        `}
        role="dialog"
        aria-modal="true"
        aria-labelledby="feedback-title"
      >
        {modalState === 'form' ? (
          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <h2
                id="feedback-title"
                className="text-[#1F2937]"
                style={{ fontSize: '18px', lineHeight: '28px' }}
              >
                Share feedback
              </h2>
              <button
                onClick={onClose}
                className="text-[#6B7280] hover:text-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#3A6EA5] rounded p-1 transition-colors"
                aria-label="Close feedback modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Rating Group */}
            <div className="rating_group mb-6">
              <label
                className="block text-[#1F2937] mb-3"
                style={{ fontSize: '14px', lineHeight: '20px' }}
              >
                How's your experience so far?
                <span className="text-[#3A6EA5]"> *</span>
              </label>
              <RatingControl
                style={ratingStyle}
                value={rating}
                onChange={setRating}
              />
            </div>

            {/* Area Chips */}
            <div className="chip_group mb-6">
              <label
                className="block text-[#1F2937] mb-3"
                style={{ fontSize: '14px', lineHeight: '20px' }}
              >
                Which area best fits your feedback?{' '}
                <span className="text-[#6B7280]">(optional)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {areaOptions.map(area => (
                  <Chip
                    key={area}
                    label={area}
                    selected={selectedAreas.includes(area)}
                    onClick={() => toggleArea(area)}
                  />
                ))}
              </div>
            </div>

            {/* Feedback Textarea */}
            <div className="feedback_textarea mb-6">
              <label
                className="block text-[#1F2937] mb-3"
                style={{ fontSize: '14px', lineHeight: '20px' }}
              >
                Add any additional comments (optional)
              </label>
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                className="w-full p-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3A6EA5]"
                style={{ fontSize: '14px', lineHeight: '20px' }}
                rows={4}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="btn_cancel flex-1 px-4 py-2.5 rounded-lg border border-[#E5E7EB] text-[#1F2937] hover:bg-[#F7F9FB] focus:outline-none focus:ring-2 focus:ring-[#3A6EA5] transition-colors"
                style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  minHeight: '44px'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={rating === 0}
                className="btn_submit flex-1 px-4 py-2.5 rounded-lg bg-[#3A6EA5] text-white hover:bg-[#2F5985] focus:outline-none focus:ring-2 focus:ring-[#3A6EA5] focus:ring-offset-2 disabled:bg-[#E5E7EB] disabled:text-[#6B7280] disabled:cursor-not-allowed transition-all"
                style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  minHeight: '44px'
                }}
              >
                Submit
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center">
            <div className="mb-4">
              <div className="w-16 h-16 bg-[#3A6EA5]/10 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-[#3A6EA5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <p
              className="text-[#1F2937]"
              style={{ fontSize: '16px', lineHeight: '24px' }}
            >
              Thanks — your note helps us improve Therapair.
            </p>
          </div>
        )}
      </div>
    </>
  );
}