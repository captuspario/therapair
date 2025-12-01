import { TheraPairIcon } from './TheraPairIcon';

export function LogoVariants() {
  return (
    <div className="space-y-8">
      {/* Primary Horizontal Logo */}
      <div className="space-y-4">
        <h3 className="text-[#000000]">Primary Horizontal</h3>
        <div className="bg-white rounded-2xl p-12 border border-[#E2D9CC] flex items-center justify-center">
          <div className="flex items-center gap-4">
            <TheraPairIcon size={64} variant="full-color" />
            <div className="space-y-0.5">
              <div
                className="tracking-tight"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '48px',
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
                  fontSize: '12px',
                  color: '#000000',
                  letterSpacing: '0.15em',
                }}
              >
                SMART THERAPY MATCHING
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm text-[#4A5568] italic">Logo / Primary Horizontal · Full Colour</p>
      </div>

      {/* Stacked Logo */}
      <div className="space-y-4">
        <h3 className="text-[#000000]">Stacked</h3>
        <div className="bg-white rounded-2xl p-12 border border-[#E2D9CC] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <TheraPairIcon size={80} variant="full-color" />
            <div className="space-y-1 text-center">
              <div
                className="tracking-tight"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '40px',
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
                  fontSize: '11px',
                  color: '#000000',
                  letterSpacing: '0.15em',
                }}
              >
                SMART THERAPY MATCHING
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm text-[#4A5568] italic">Logo / Stacked · Full Colour</p>
      </div>

      {/* Icon Only Variants */}
      <div className="space-y-4">
        <h3 className="text-[#000000]">Icon Only</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Full Color Icon */}
          <div className="space-y-3">
            <div className="bg-white rounded-2xl p-12 border border-[#E2D9CC] flex items-center justify-center aspect-square">
              <TheraPairIcon size={120} variant="full-color" />
            </div>
            <p className="text-sm text-[#4A5568] italic">Logo / Icon · Full Colour</p>
          </div>

          {/* Navy Icon */}
          <div className="space-y-3">
            <div className="bg-white rounded-2xl p-12 border border-[#E2D9CC] flex items-center justify-center aspect-square">
              <TheraPairIcon size={120} variant="navy" />
            </div>
            <p className="text-sm text-[#4A5568] italic">Logo / Icon · Navy</p>
          </div>

          {/* White Icon on Navy */}
          <div className="space-y-3">
            <div className="bg-[#0F1E4B] rounded-2xl p-12 border border-[#0F1E4B] flex items-center justify-center aspect-square">
              <TheraPairIcon size={120} variant="white" />
            </div>
            <p className="text-sm text-[#4A5568] italic">Logo / Icon · White</p>
          </div>
        </div>
      </div>

      {/* Monochrome Variants */}
      <div className="space-y-4">
        <h3 className="text-[#000000]">Monochrome Variants</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Navy Full Logo */}
          <div className="space-y-3">
            <div className="bg-white rounded-2xl p-12 border border-[#E2D9CC] flex items-center justify-center">
              <div className="flex items-center gap-4">
                <TheraPairIcon size={64} variant="navy" />
                <div className="space-y-0.5">
                  <div
                    className="tracking-tight"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 700,
                      fontSize: '40px',
                      color: '#0F1E4B',
                    }}
                  >
                    TheraPair
                  </div>
                  <div
                    className="tracking-[0.15em]"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 400,
                      fontSize: '10px',
                      color: '#0F1E4B',
                      letterSpacing: '0.15em',
                    }}
                  >
                    SMART THERAPY MATCHING
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm text-[#4A5568] italic">Logo / Primary Horizontal · Navy</p>
          </div>

          {/* White on Navy Full Logo */}
          <div className="space-y-3">
            <div className="bg-[#0F1E4B] rounded-2xl p-12 border border-[#0F1E4B] flex items-center justify-center">
              <div className="flex items-center gap-4">
                <TheraPairIcon size={64} variant="white" />
                <div className="space-y-0.5">
                  <div
                    className="tracking-tight"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 700,
                      fontSize: '40px',
                      color: '#FFFFFF',
                    }}
                  >
                    TheraPair
                  </div>
                  <div
                    className="tracking-[0.15em]"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 400,
                      fontSize: '10px',
                      color: '#FFFFFF',
                      letterSpacing: '0.15em',
                    }}
                  >
                    SMART THERAPY MATCHING
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm text-[#4A5568] italic">Logo / Primary Horizontal · White</p>
          </div>
        </div>
      </div>

      {/* Size Variations */}
      <div className="space-y-4">
        <h3 className="text-[#000000]">Size Variations</h3>
        <div className="bg-white rounded-2xl p-12 border border-[#E2D9CC] space-y-10">
          {/* Large */}
          <div className="flex items-center gap-5">
            <TheraPairIcon size={80} variant="full-color" />
            <div className="space-y-1">
              <div
                className="tracking-tight"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '56px',
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
                  fontSize: '14px',
                  color: '#000000',
                  letterSpacing: '0.15em',
                }}
              >
                SMART THERAPY MATCHING
              </div>
            </div>
          </div>

          {/* Medium */}
          <div className="flex items-center gap-4">
            <TheraPairIcon size={64} variant="full-color" />
            <div className="space-y-0.5">
              <div
                className="tracking-tight"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '40px',
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
                  fontSize: '11px',
                  color: '#000000',
                  letterSpacing: '0.15em',
                }}
              >
                SMART THERAPY MATCHING
              </div>
            </div>
          </div>

          {/* Small */}
          <div className="flex items-center gap-3">
            <TheraPairIcon size={40} variant="full-color" />
            <div className="space-y-0">
              <div
                className="tracking-tight"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '24px',
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
                SMART THERAPY MATCHING
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}