import { TheraPairIcon } from './TheraPairIcon';
import { ColorPalette } from './ColorPalette';
import { TypographySystem } from './TypographySystem';
import { LogoVariants } from './LogoVariants';
import { TypographyScale } from './TypographyScale';
import { TypographyUsage } from './TypographyUsage';
import { UIComponents } from './UIComponents';

export function LogoExploration() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Navigation */}
      <nav className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-[#E2D9CC] z-50">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center gap-3">
            <TheraPairIcon size={40} variant="full-color" />
            <div className="space-y-0">
              <div
                className="tracking-tight"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '20px',
                  color: '#000000',
                }}
              >
                TheraPair
              </div>
              <div
                className="tracking-[0.15em]"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '7px',
                  color: '#000000',
                  letterSpacing: '0.15em',
                }}
              >
                DESIGN SYSTEM
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="p-8 md:p-16">
        <div className="max-w-7xl mx-auto space-y-24">
          {/* Header */}
          <header className="space-y-4">
            <h1 className="text-[#000000] tracking-tight">TheraPair Design System</h1>
            <p className="text-[#4A5568] max-w-2xl">
              A complete brand identity and design system for a privacy-first therapist matching platform. 
              Warm, calm, trustworthy—designed for inclusivity and caring technology.
            </p>
          </header>

          {/* Color Palette Section */}
          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-[#000000]">Color Palette</h2>
              <p className="text-[#4A5568]">Foundation colors for the TheraPair brand system</p>
            </div>
            <ColorPalette />
          </section>

          {/* Logo System Section */}
          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-[#000000]">Logo System</h2>
              <p className="text-[#4A5568]">Brand mark and wordmark variations</p>
            </div>
            <TypographySystem />
          </section>

          {/* Logo Variants Section */}
          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-[#000000]">Logo Variants</h2>
              <p className="text-[#4A5568]">Primary horizontal, stacked, icon-only, and monochrome versions</p>
            </div>
            <LogoVariants />
          </section>

          {/* Clear Space Guidelines */}
          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-[#000000]">Clear Space & Usage</h2>
              <p className="text-[#4A5568]">Minimum clear space equals the width of the icon</p>
            </div>
            <div className="bg-white rounded-2xl p-12 border border-[#E2D9CC]">
              <div className="relative inline-block">
                {/* Clear space indicators */}
                <div className="absolute -top-16 left-0 right-0 h-16 border-2 border-dashed border-[#3D578A] opacity-30"></div>
                <div className="absolute -bottom-16 left-0 right-0 h-16 border-2 border-dashed border-[#3D578A] opacity-30"></div>
                <div className="absolute -left-16 top-0 bottom-0 w-16 border-2 border-dashed border-[#3D578A] opacity-30"></div>
                <div className="absolute -right-16 top-0 bottom-0 w-16 border-2 border-dashed border-[#3D578A] opacity-30"></div>
                
                <div className="flex items-center gap-4">
                  <TheraPairIcon size={64} variant="full-color" />
                  <div className="space-y-0.5">
                    <div className="tracking-tight" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '40px', color: '#000000' }}>
                      TheraPair
                    </div>
                    <div className="tracking-[0.15em]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '11px', color: '#000000', letterSpacing: '0.15em' }}>
                      SMART THERAPY MATCHING
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Typography Scale Section */}
          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-[#000000]">Typography Scale</h2>
              <p className="text-[#4A5568]">Complete type hierarchy for interface and content</p>
            </div>
            <TypographyScale />
          </section>

          {/* Typography Usage Section */}
          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-[#000000]">Typography in Context</h2>
              <p className="text-[#4A5568]">Real-world examples showing type hierarchy and spacing</p>
            </div>
            <TypographyUsage />
          </section>

          {/* UI Components Section */}
          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-[#000000]">UI Components</h2>
              <p className="text-[#4A5568]">Typography applied to interface elements</p>
            </div>
            <UIComponents />
          </section>

          {/* Footer */}
          <footer className="pt-12 border-t border-[#E2D9CC] text-[#4A5568] text-sm">
            <p>TheraPair Design System · Logo & Typography · 2025</p>
          </footer>
        </div>
      </div>
    </div>
  );
}