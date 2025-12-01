export function ColorPalette() {
  const colors = [
    {
      name: 'Dark Navy',
      role: 'Primary / Icon Core',
      hex: '#0F1E4B',
      variable: 'TheraPair / Dark Navy',
    },
    {
      name: 'Mid Blue',
      role: 'Icon Middle Layer',
      hex: '#3D578A',
      variable: 'TheraPair / Mid Blue',
    },
    {
      name: 'Light Blue',
      role: 'Icon Ears / Accents',
      hex: '#95B1CD',
      variable: 'TheraPair / Light Blue',
    },
    {
      name: 'Black',
      role: 'Wordmark / Headings',
      hex: '#000000',
      variable: 'TheraPair / Black',
    },
    {
      name: 'Warm Beige',
      role: 'Background',
      hex: '#FAF8F5',
      variable: 'TheraPair / Warm Beige',
    },
    {
      name: 'Dark Grey',
      role: 'Body Text / Secondary',
      hex: '#4A5568',
      variable: 'TheraPair / Dark Grey',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
      {colors.map((color) => (
        <div key={color.hex} className="space-y-3">
          <div
            className="w-full aspect-square rounded-xl shadow-sm border border-[#E2D9CC]"
            style={{ backgroundColor: color.hex }}
          ></div>
          <div className="space-y-1">
            <div className="text-[#000000]">{color.name}</div>
            <div className="text-sm text-[#4A5568]">{color.role}</div>
            <div className="text-sm font-mono text-[#4A5568]">{color.hex}</div>
            <div className="text-xs text-[#4A5568] italic">{color.variable}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
