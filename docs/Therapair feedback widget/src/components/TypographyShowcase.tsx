import React from 'react';
import { Card } from './ui/card';

export function TypographyShowcase() {
  const fontSizes = [
    { name: 'Display XL', var: '--text-6xl', px: '60px', usage: 'Hero headlines' },
    { name: 'Display L', var: '--text-5xl', px: '48px', usage: 'Page headlines' },
    { name: 'Display M', var: '--text-4xl', px: '36px', usage: 'Section titles' },
    { name: 'Display S', var: '--text-3xl', px: '30px', usage: 'Card headings' },
    { name: 'Heading XL', var: '--text-2xl', px: '24px', usage: 'H1 - Main headings' },
    { name: 'Heading L', var: '--text-xl', px: '20px', usage: 'H2 - Subheadings' },
    { name: 'Heading M', var: '--text-lg', px: '18px', usage: 'H3 - Small headings' },
    { name: 'Body L', var: '--text-base', px: '16px', usage: 'Body text, buttons' },
    { name: 'Body M', var: '--text-sm', px: '14px', usage: 'Secondary text' },
    { name: 'Body S', var: '--text-xs', px: '12px', usage: 'Captions, labels' },
  ];

  const fontWeights = [
    { name: 'Light', var: '--font-weight-light', value: '300', usage: 'Subtle emphasis' },
    { name: 'Regular', var: '--font-weight-normal', value: '400', usage: 'Body text' },
    { name: 'Medium', var: '--font-weight-medium', value: '500', usage: 'Headings, UI elements' },
    { name: 'Semibold', var: '--font-weight-semibold', value: '600', usage: 'Strong emphasis' },
    { name: 'Bold', var: '--font-weight-bold', value: '700', usage: 'High emphasis' },
  ];

  return (
    <div className="space-y-12">
      {/* Typography Overview */}
      <Card className="p-8 bg-gradient-to-br from-blue-50 to-white border-blue-100">
        <h3 className="mb-6 text-blue-900">Typography System</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-blue-900 mb-2">Font Family</h4>
            <p className="text-sm text-slate-600 mb-3">
              Inter — A humanist sans-serif designed for digital interfaces with excellent readability.
            </p>
            <div className="text-sm font-mono bg-white rounded px-3 py-2 border">
              --font-family-sans
            </div>
          </div>
          <div>
            <h4 className="text-blue-900 mb-2">Type Scale</h4>
            <p className="text-sm text-slate-600 mb-3">
              10-step modular scale from 12px to 60px, optimized for hierarchy and readability.
            </p>
            <div className="text-sm font-mono bg-white rounded px-3 py-2 border">
              --text-xs to --text-6xl
            </div>
          </div>
          <div>
            <h4 className="text-blue-900 mb-2">Principles</h4>
            <p className="text-sm text-slate-600 mb-3">
              Clear hierarchy, comfortable reading, warm professionalism, accessible contrast.
            </p>
            <div className="text-sm font-mono bg-white rounded px-3 py-2 border">
              Medium (500) default
            </div>
          </div>
        </div>
      </Card>

      {/* Font Size Scale */}
      <div className="space-y-6">
        <div>
          <h3 className="mb-2">Type Scale</h3>
          <p className="text-muted-foreground">
            A balanced scale that creates clear visual hierarchy across the platform.
          </p>
        </div>
        
        <Card className="p-8">
          <div className="space-y-6">
            {fontSizes.map((size) => (
              <div key={size.name} className="flex items-baseline gap-6 pb-6 border-b last:border-0 last:pb-0">
                <div className="w-32 shrink-0">
                  <p className="text-sm text-muted-foreground">{size.name}</p>
                  <p className="text-xs font-mono text-slate-500">{size.px}</p>
                </div>
                <div className="flex-1">
                  <p 
                    style={{ 
                      fontSize: `var(${size.var})`,
                      fontWeight: 'var(--font-weight-medium)',
                      lineHeight: 'var(--leading-tight)',
                      letterSpacing: 'var(--tracking-tight)'
                    }}
                  >
                    Finding the right therapist starts here
                  </p>
                </div>
                <div className="w-48 shrink-0 text-right">
                  <p className="text-sm text-slate-600">{size.usage}</p>
                  <code className="text-xs text-slate-400">{size.var}</code>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Font Weights */}
      <div className="space-y-6">
        <div>
          <h3 className="mb-2">Font Weights</h3>
          <p className="text-muted-foreground">
            Five weights for flexible typographic expression and emphasis.
          </p>
        </div>
        
        <Card className="p-8">
          <div className="space-y-6">
            {fontWeights.map((weight) => (
              <div key={weight.name} className="flex items-center gap-6 pb-6 border-b last:border-0 last:pb-0">
                <div className="w-32 shrink-0">
                  <p className="text-sm text-muted-foreground">{weight.name}</p>
                  <p className="text-xs font-mono text-slate-500">{weight.value}</p>
                </div>
                <div className="flex-1">
                  <p 
                    style={{ 
                      fontSize: 'var(--text-xl)',
                      fontWeight: `var(${weight.var})`,
                      lineHeight: 'var(--leading-normal)'
                    }}
                  >
                    Connect with care, grow with confidence
                  </p>
                </div>
                <div className="w-48 shrink-0 text-right">
                  <p className="text-sm text-slate-600">{weight.usage}</p>
                  <code className="text-xs text-slate-400">{weight.var}</code>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Type Specimens */}
      <div className="space-y-6">
        <div>
          <h3 className="mb-2">Type Specimens</h3>
          <p className="text-muted-foreground">
            Real-world examples showing typography in context.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Hero Example */}
          <Card className="p-8 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="space-y-4">
              <h1 
                style={{ 
                  fontSize: 'var(--text-4xl)',
                  fontWeight: 'var(--font-weight-semibold)',
                  lineHeight: 'var(--leading-tight)',
                  letterSpacing: 'var(--tracking-tight)'
                }}
              >
                Your healing journey begins with the right match
              </h1>
              <p 
                style={{ 
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-weight-normal)',
                  lineHeight: 'var(--leading-relaxed)',
                  opacity: 0.9
                }}
              >
                Therapair connects you with licensed therapists who truly understand your needs.
              </p>
              <div 
                className="inline-block px-6 py-3 bg-white text-blue-600 rounded-lg"
                style={{ 
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-weight-medium)'
                }}
              >
                Get Started
              </div>
            </div>
          </Card>

          {/* Card Example */}
          <Card className="p-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 
                  style={{ 
                    fontSize: 'var(--text-xl)',
                    fontWeight: 'var(--font-weight-semibold)',
                    lineHeight: 'var(--leading-tight)',
                    color: '#1e293b'
                  }}
                >
                  Dr. Sarah Chen, PhD
                </h3>
                <p 
                  style={{ 
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-normal)',
                    lineHeight: 'var(--leading-normal)',
                    color: '#64748b'
                  }}
                >
                  Clinical Psychologist • Anxiety & Depression
                </p>
              </div>
              <p 
                style={{ 
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-weight-normal)',
                  lineHeight: 'var(--leading-relaxed)',
                  color: '#475569'
                }}
              >
                I specialize in evidence-based approaches to help individuals navigate life transitions and build resilience.
              </p>
              <div className="flex gap-2">
                <span 
                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full"
                  style={{ 
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--font-weight-medium)'
                  }}
                >
                  CBT
                </span>
                <span 
                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full"
                  style={{ 
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--font-weight-medium)'
                  }}
                >
                  EMDR
                </span>
              </div>
            </div>
          </Card>

          {/* List Example */}
          <Card className="p-8 col-span-full">
            <div className="space-y-4">
              <h4 
                style={{ 
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-weight-semibold)',
                  lineHeight: 'var(--leading-normal)',
                  color: '#1e293b'
                }}
              >
                How Therapair Works
              </h4>
              <ol className="space-y-3">
                {[
                  { title: 'Share your needs', desc: 'Tell us about your preferences and what brings you to therapy' },
                  { title: 'Get matched', desc: 'Our intelligent system finds therapists who align with your requirements' },
                  { title: 'Start healing', desc: 'Begin your journey with video sessions, messaging, or in-person visits' }
                ].map((step, idx) => (
                  <li key={idx} className="flex gap-4">
                    <div 
                      className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0"
                      style={{ 
                        fontSize: 'var(--text-sm)',
                        fontWeight: 'var(--font-weight-semibold)'
                      }}
                    >
                      {idx + 1}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p 
                        style={{ 
                          fontSize: 'var(--text-base)',
                          fontWeight: 'var(--font-weight-medium)',
                          lineHeight: 'var(--leading-normal)',
                          color: '#1e293b'
                        }}
                      >
                        {step.title}
                      </p>
                      <p 
                        style={{ 
                          fontSize: 'var(--text-sm)',
                          fontWeight: 'var(--font-weight-normal)',
                          lineHeight: 'var(--leading-relaxed)',
                          color: '#64748b'
                        }}
                      >
                        {step.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Card>
        </div>
      </div>

      {/* Line Heights & Letter Spacing */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h3 className="mb-2">Line Heights</h3>
            <p className="text-muted-foreground text-sm">
              Optimized for readability across different contexts.
            </p>
          </div>
          <Card className="p-6">
            <div className="space-y-4">
              {[
                { name: 'Tight', var: '--leading-tight', value: '1.25', usage: 'Headlines' },
                { name: 'Normal', var: '--leading-normal', value: '1.5', usage: 'UI text' },
                { name: 'Relaxed', var: '--leading-relaxed', value: '1.625', usage: 'Body copy' },
              ].map((lh) => (
                <div key={lh.name} className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{lh.name} ({lh.value})</span>
                    <span className="font-mono">{lh.var}</span>
                  </div>
                  <p 
                    className="text-sm border-l-2 border-blue-400 pl-3"
                    style={{ lineHeight: `var(${lh.var})` }}
                  >
                    {lh.usage}: The right therapist can make all the difference in your mental health journey.
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="mb-2">Letter Spacing</h3>
            <p className="text-muted-foreground text-sm">
              Subtle adjustments for optical clarity.
            </p>
          </div>
          <Card className="p-6">
            <div className="space-y-4">
              {[
                { name: 'Tight', var: '--tracking-tight', value: '-0.025em', usage: 'Large headlines' },
                { name: 'Normal', var: '--tracking-normal', value: '0em', usage: 'Body text' },
                { name: 'Wide', var: '--tracking-wide', value: '0.025em', usage: 'Small caps, labels' },
              ].map((ls) => (
                <div key={ls.name} className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{ls.name} ({ls.value})</span>
                    <span className="font-mono">{ls.var}</span>
                  </div>
                  <p 
                    className="text-sm border-l-2 border-blue-400 pl-3"
                    style={{ letterSpacing: `var(${ls.var})` }}
                  >
                    {ls.usage}: THERAPAIR
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Usage Guidelines */}
      <Card className="p-8 bg-slate-50">
        <h3 className="mb-6 text-slate-900">Usage Guidelines</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <h4 className="text-green-700">✓ Do</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• Use medium weight (500) as the default for warmth</li>
              <li>• Maintain consistent hierarchy throughout pages</li>
              <li>• Use tight letter-spacing for large headlines</li>
              <li>• Ensure minimum 16px for body text</li>
              <li>• Use relaxed line-height for long-form content</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-red-700">✗ Don't</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• Use more than 3 font sizes on one screen</li>
              <li>• Set body text smaller than 14px</li>
              <li>• Use all caps for long sentences</li>
              <li>• Mix too many font weights in one component</li>
              <li>• Ignore accessibility contrast ratios</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
