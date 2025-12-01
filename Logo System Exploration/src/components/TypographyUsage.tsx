import { Check } from 'lucide-react';

export function TypographyUsage() {
  return (
    <div className="space-y-6">
      {/* Article Example */}
      <div className="bg-white rounded-2xl p-12 border border-[#E2D9CC]">
        <article className="max-w-3xl space-y-6">
          {/* Overline */}
          <div
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              fontWeight: '500',
              lineHeight: '1.4',
              letterSpacing: '0.08em',
              color: '#3D578A',
            }}
          >
            GETTING STARTED
          </div>

          {/* H1 */}
          <h1
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '48px',
              fontWeight: '700',
              lineHeight: '1.2',
              letterSpacing: '0',
              color: '#000000',
            }}
          >
            How to choose the right therapist
          </h1>

          {/* Body Large */}
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '18px',
              fontWeight: '400',
              lineHeight: '1.6',
              letterSpacing: '0',
              color: '#4A5568',
            }}
          >
            Finding a therapist who truly understands you is one of the most important steps in your mental health journey. Here's what you should consider.
          </p>

          {/* H2 */}
          <h2
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '36px',
              fontWeight: '700',
              lineHeight: '1.3',
              letterSpacing: '0',
              color: '#000000',
            }}
          >
            Identity and specialization
          </h2>

          {/* Body */}
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '16px',
              fontWeight: '400',
              lineHeight: '1.6',
              letterSpacing: '0',
              color: '#4A5568',
            }}
          >
            TheraPair helps you filter by therapists who specialize in LGBTQ+ affirming care, neurodivergent-friendly approaches, trauma-informed therapy, and more. Your identity matters, and your therapist should create a space where you feel truly seen.
          </p>

          {/* H3 */}
          <h3
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '28px',
              fontWeight: '600',
              lineHeight: '1.3',
              letterSpacing: '0',
              color: '#000000',
            }}
          >
            What to look for
          </h3>

          {/* Body with list */}
          <ul className="space-y-3">
            {[
              'Experience with your specific concerns or diagnosis',
              'Therapeutic approach that resonates with you',
              'Cultural competency and lived experience',
              'Availability and session format preferences',
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-3"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: '400',
                  lineHeight: '1.6',
                  letterSpacing: '0',
                  color: '#4A5568',
                }}
              >
                <Check className="w-5 h-5 text-[#3D578A] mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Caption */}
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
            Updated November 27, 2025 · 5 min read
          </p>
        </article>
      </div>

      {/* Card Grid Example */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            category: 'SPECIALIZATION',
            title: 'LGBTQ+ affirming',
            description: 'Therapists who provide inclusive, affirming care for all gender identities and sexual orientations.',
          },
          {
            category: 'APPROACH',
            title: 'Neurodivergent-friendly',
            description: 'Practitioners experienced in ADHD, autism, and other neurodevelopmental differences.',
          },
          {
            category: 'MODALITY',
            title: 'Trauma-informed',
            description: 'Evidence-based approaches for healing from trauma, PTSD, and complex experiences.',
          },
        ].map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 border border-[#E2D9CC] space-y-3"
          >
            {/* Overline */}
            <div
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                fontWeight: '500',
                lineHeight: '1.4',
                letterSpacing: '0.08em',
                color: '#3D578A',
              }}
            >
              {card.category}
            </div>

            {/* H4 */}
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
              {card.title}
            </h4>

            {/* Body Small */}
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
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}