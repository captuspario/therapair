export function TypographyScale() {
  const typeScale = [
    {
      name: 'Display Large',
      style: 'TheraPair / Display Large',
      size: '72px',
      weight: '700',
      lineHeight: '1.1',
      letterSpacing: '-0.02em',
      usage: 'Hero sections, landing pages',
      example: 'Find your therapist',
    },
    {
      name: 'Display',
      style: 'TheraPair / Display',
      size: '56px',
      weight: '700',
      lineHeight: '1.1',
      letterSpacing: '-0.01em',
      usage: 'Major page headers',
      example: 'Start your journey',
    },
    {
      name: 'Heading 1',
      style: 'TheraPair / H1',
      size: '48px',
      weight: '700',
      lineHeight: '1.2',
      letterSpacing: '0',
      usage: 'Primary headings',
      example: 'How TheraPair works',
    },
    {
      name: 'Heading 2',
      style: 'TheraPair / H2',
      size: '36px',
      weight: '700',
      lineHeight: '1.3',
      letterSpacing: '0',
      usage: 'Section headings',
      example: 'Your privacy matters',
    },
    {
      name: 'Heading 3',
      style: 'TheraPair / H3',
      size: '28px',
      weight: '600',
      lineHeight: '1.3',
      letterSpacing: '0',
      usage: 'Subsection headings',
      example: 'Matching process',
    },
    {
      name: 'Heading 4',
      style: 'TheraPair / H4',
      size: '20px',
      weight: '600',
      lineHeight: '1.4',
      letterSpacing: '0',
      usage: 'Card headers, minor headings',
      example: 'Therapist profiles',
    },
    {
      name: 'Body Large',
      style: 'TheraPair / Body Large',
      size: '18px',
      weight: '400',
      lineHeight: '1.6',
      letterSpacing: '0',
      usage: 'Introductory paragraphs, emphasis',
      example: 'We believe everyone deserves access to quality mental health care that feels right for them.',
    },
    {
      name: 'Body',
      style: 'TheraPair / Body',
      size: '16px',
      weight: '400',
      lineHeight: '1.6',
      letterSpacing: '0',
      usage: 'Default body text, paragraphs',
      example: 'Our platform uses smart matching to connect you with therapists who understand your unique needs and identity.',
    },
    {
      name: 'Body Small',
      style: 'TheraPair / Body Small',
      size: '14px',
      weight: '400',
      lineHeight: '1.5',
      letterSpacing: '0',
      usage: 'Secondary content, captions',
      example: 'All therapist profiles are verified and regularly updated.',
    },
    {
      name: 'Label',
      style: 'TheraPair / Label',
      size: '14px',
      weight: '500',
      lineHeight: '1.4',
      letterSpacing: '0',
      usage: 'Form labels, navigation',
      example: 'Preferred pronouns',
    },
    {
      name: 'Label Small',
      style: 'TheraPair / Label Small',
      size: '12px',
      weight: '500',
      lineHeight: '1.4',
      letterSpacing: '0.01em',
      usage: 'Input labels, metadata',
      example: 'Session type',
    },
    {
      name: 'Caption',
      style: 'TheraPair / Caption',
      size: '12px',
      weight: '400',
      lineHeight: '1.4',
      letterSpacing: '0',
      usage: 'Helper text, timestamps',
      example: 'Last updated 2 hours ago',
    },
    {
      name: 'Overline',
      style: 'TheraPair / Overline',
      size: '12px',
      weight: '500',
      lineHeight: '1.4',
      letterSpacing: '0.08em',
      usage: 'Category labels, tags',
      example: 'FEATURED THERAPIST',
    },
    {
      name: 'Button',
      style: 'TheraPair / Button',
      size: '16px',
      weight: '500',
      lineHeight: '1.5',
      letterSpacing: '0',
      usage: 'Button text',
      example: 'Find your match',
    },
  ];

  return (
    <div className="space-y-6">
      {typeScale.map((type, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-8 border border-[#E2D9CC]"
        >
          <div className="grid md:grid-cols-[1fr,320px] gap-8">
            {/* Example */}
            <div className="flex items-center">
              <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: type.size,
                  fontWeight: type.weight,
                  lineHeight: type.lineHeight,
                  letterSpacing: type.letterSpacing,
                  color: '#000000',
                }}
              >
                {type.example}
              </div>
            </div>

            {/* Specifications */}
            <div className="space-y-2 text-sm">
              <div className="text-[#000000]">{type.name}</div>
              <div className="space-y-1 text-[#4A5568]">
                <div className="italic">{type.style}</div>
                <div>Size: {type.size} · Weight: {type.weight}</div>
                <div>Line height: {type.lineHeight} · Tracking: {type.letterSpacing}</div>
                <div className="pt-1 text-xs">{type.usage}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}