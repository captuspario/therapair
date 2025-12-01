export function TypographySystem() {
  return (
    <div className="space-y-8">
      {/* Wordmark Style */}
      <div className="bg-white rounded-2xl p-8 border border-[#E2D9CC]">
        <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12">
          <div
            className="tracking-tight"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: '48px',
              color: '#000000',
              lineHeight: 1.2,
            }}
          >
            TheraPair
          </div>
          <div className="space-y-1 pb-1">
            <div className="text-sm text-[#4A5568]">TheraPair / Wordmark</div>
            <div className="text-sm text-[#4A5568]">Inter Bold · Title Case</div>
            <div className="text-sm text-[#4A5568]">Letter-spacing: Tight</div>
            <div className="text-sm text-[#4A5568]">Color: Black (#000000)</div>
          </div>
        </div>
      </div>

      {/* Tagline Style */}
      <div className="bg-white rounded-2xl p-8 border border-[#E2D9CC]">
        <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12">
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
          <div className="space-y-1 pb-0">
            <div className="text-sm text-[#4A5568]">TheraPair / Tagline</div>
            <div className="text-sm text-[#4A5568]">Inter Regular · All Caps</div>
            <div className="text-sm text-[#4A5568]">Letter-spacing: +0.15em</div>
            <div className="text-sm text-[#4A5568]">Color: Black (#000000)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
