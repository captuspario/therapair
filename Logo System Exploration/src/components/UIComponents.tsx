import { Search, Heart, Calendar, MessageCircle } from 'lucide-react';

export function UIComponents() {
  return (
    <div className="space-y-8">
      {/* Buttons */}
      <div className="space-y-4">
        <h3 className="text-[#000000]">Buttons</h3>
        <div className="bg-white rounded-2xl p-8 border border-[#E2D9CC]">
          <div className="flex flex-wrap gap-4">
            {/* Primary Button */}
            <button
              className="px-6 py-3 bg-[#3D578A] hover:bg-[#2D4770] transition-colors rounded-xl"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                fontWeight: '500',
                lineHeight: '1.5',
                letterSpacing: '0',
                color: '#FFFFFF',
              }}
            >
              Find your match
            </button>

            {/* Secondary Button */}
            <button
              className="px-6 py-3 bg-transparent hover:bg-[#FAF8F5] transition-colors rounded-xl border-2 border-[#000000]"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                fontWeight: '500',
                lineHeight: '1.5',
                letterSpacing: '0',
                color: '#000000',
              }}
            >
              Learn more
            </button>

            {/* Ghost Button */}
            <button
              className="px-6 py-3 bg-transparent hover:bg-[#FAF8F5] transition-colors rounded-xl"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                fontWeight: '500',
                lineHeight: '1.5',
                letterSpacing: '0',
                color: '#4A5568',
              }}
            >
              Cancel
            </button>
          </div>

          {/* Small buttons */}
          <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-[#E2D9CC]">
            <button
              className="px-4 py-2 bg-[#3D578A] hover:bg-[#2D4770] transition-colors rounded-lg"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: '500',
                lineHeight: '1.4',
                letterSpacing: '0',
                color: '#FFFFFF',
              }}
            >
              Save
            </button>

            <button
              className="px-4 py-2 bg-transparent hover:bg-[#FAF8F5] transition-colors rounded-lg border border-[#E2D9CC]"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: '500',
                lineHeight: '1.4',
                letterSpacing: '0',
                color: '#4A5568',
              }}
            >
              Edit profile
            </button>
          </div>
        </div>
      </div>

      {/* Form Inputs */}
      <div className="space-y-4">
        <h3 className="text-[#1A2B3D]">Form Elements</h3>
        <div className="bg-white rounded-2xl p-8 border border-[#E2D9CC]">
          <div className="max-w-md space-y-6">
            {/* Text Input */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: '500',
                  lineHeight: '1.4',
                  letterSpacing: '0',
                  color: '#000000',
                }}
              >
                Full name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-xl border-2 border-[#E2D9CC] focus:border-[#3D578A] focus:outline-none transition-colors"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: '400',
                  lineHeight: '1.5',
                  letterSpacing: '0',
                  color: '#000000',
                }}
              />
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  fontWeight: '400',
                  lineHeight: '1.4',
                  letterSpacing: '0',
                  color: '#4A5568',
                }}
              >
                This will be visible to your matched therapists
              </p>
            </div>

            {/* Select Input */}
            <div className="space-y-2">
              <label
                htmlFor="pronouns"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: '500',
                  lineHeight: '1.4',
                  letterSpacing: '0',
                  color: '#000000',
                }}
              >
                Preferred pronouns
              </label>
              <select
                id="pronouns"
                className="w-full px-4 py-3 rounded-xl border-2 border-[#E2D9CC] focus:border-[#3D578A] focus:outline-none transition-colors"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: '400',
                  lineHeight: '1.5',
                  letterSpacing: '0',
                  color: '#000000',
                }}
              >
                <option>Select your pronouns</option>
                <option>she/her</option>
                <option>he/him</option>
                <option>they/them</option>
                <option>Custom</option>
              </select>
            </div>

            {/* Textarea */}
            <div className="space-y-2">
              <label
                htmlFor="about"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: '500',
                  lineHeight: '1.4',
                  letterSpacing: '0',
                  color: '#000000',
                }}
              >
                What brings you to therapy?
              </label>
              <textarea
                id="about"
                rows={4}
                placeholder="Share as much or as little as you're comfortable with..."
                className="w-full px-4 py-3 rounded-xl border-2 border-[#E2D9CC] focus:border-[#3D578A] focus:outline-none transition-colors resize-none"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: '400',
                  lineHeight: '1.5',
                  letterSpacing: '0',
                  color: '#000000',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Therapist Card Example */}
      <div className="space-y-4">
        <h3 className="text-[#1A2B3D]">Component Example: Therapist Card</h3>
        <div className="bg-white rounded-2xl p-8 border border-[#E2D9CC]">
          <div className="max-w-2xl">
            <div className="flex gap-6">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#95B1CD] to-[#3D578A] flex-shrink-0" />

              {/* Content */}
              <div className="flex-1 space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '20px',
                        fontWeight: '600',
                        lineHeight: '1.4',
                        letterSpacing: '0',
                        color: '#000000',
                      }}
                    >
                      Dr. Sarah Chen
                    </h4>
                    <p
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        fontWeight: '400',
                        lineHeight: '1.5',
                        letterSpacing: '0',
                        color: '#4A5568',
                      }}
                    >
                      Licensed Clinical Psychologist · she/her
                    </p>
                  </div>
                  <button className="text-[#4A5568] hover:text-[#3D578A] transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {['LGBTQ+ Affirming', 'Trauma-Informed', 'Neurodivergent-Friendly'].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[#FAF8F5] rounded-full"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '12px',
                        fontWeight: '500',
                        lineHeight: '1.4',
                        letterSpacing: '0.01em',
                        color: '#4A5568',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    fontWeight: '400',
                    lineHeight: '1.5',
                    letterSpacing: '0',
                    color: '#4A5568',
                  }}
                >
                  Specializing in anxiety, depression, and identity exploration. I create a warm, 
                  non-judgmental space where you can explore your authentic self.
                </p>

                {/* Meta info */}
                <div className="flex items-center gap-4 pt-2">
                  <div className="flex items-center gap-1.5 text-[#4A5568]">
                    <Calendar className="w-4 h-4" />
                    <span
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '12px',
                        fontWeight: '400',
                        lineHeight: '1.4',
                        letterSpacing: '0',
                      }}
                    >
                      Available this week
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#4A5568]">
                    <MessageCircle className="w-4 h-4" />
                    <span
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '12px',
                        fontWeight: '400',
                        lineHeight: '1.4',
                        letterSpacing: '0',
                      }}
                    >
                      95% match
                    </span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    className="px-4 py-2 bg-[#3D578A] hover:bg-[#2D4770] transition-colors rounded-lg"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      fontWeight: '500',
                      lineHeight: '1.4',
                      letterSpacing: '0',
                      color: '#FFFFFF',
                    }}
                  >
                    Book session
                  </button>
                  <button
                    className="px-4 py-2 bg-transparent hover:bg-[#FAF8F5] transition-colors rounded-lg border border-[#E2D9CC]"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      fontWeight: '500',
                      lineHeight: '1.4',
                      letterSpacing: '0',
                      color: '#4A5568',
                    }}
                  >
                    View profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="space-y-4">
        <h3 className="text-[#1A2B3D]">Search</h3>
        <div className="bg-white rounded-2xl p-8 border border-[#E2D9CC]">
          <div className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A5568]" />
              <input
                type="text"
                placeholder="Search by specialization, approach, or identity..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-[#E2D9CC] focus:border-[#3D578A] focus:outline-none transition-colors"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: '400',
                  lineHeight: '1.5',
                  letterSpacing: '0',
                  color: '#000000',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Example */}
      <div className="space-y-4">
        <h3 className="text-[#1A2B3D]">Navigation</h3>
        <div className="bg-white rounded-2xl p-8 border border-[#E2D9CC]">
          <nav className="flex items-center gap-8">
            {['Browse', 'My matches', 'Messages', 'Profile'].map((item, index) => (
              <a
                key={item}
                href="#"
                className={`${index === 0 ? 'text-[#3D578A]' : 'text-[#4A5568]'} hover:text-[#3D578A] transition-colors`}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: '500',
                  lineHeight: '1.4',
                  letterSpacing: '0',
                }}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}