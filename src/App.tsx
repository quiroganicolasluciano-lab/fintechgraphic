import { useEffect, useMemo, useState } from 'react';

export default function AnimatedFinanceBackground() {
  const [accentColor, setAccentColor] = useState('#00d27a');
  const [backgroundColor, setBackgroundColor] = useState('#f4f5f7');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [backgroundOpacity, setBackgroundOpacity] = useState(0.2);
  const [blendMode, setBlendMode] = useState('overlay');
  const [chartStyle, setChartStyle] = useState('smooth');
  const [chartHeight, setChartHeight] = useState(45);
  const [waveAmplitude, setWaveAmplitude] = useState(1);
  const [waveFrequency, setWaveFrequency] = useState(1);
  const [animationSpeed, setAnimationSpeed] = useState(8);
  const [showControls, setShowControls] = useState(true);
  const [showChart, setShowChart] = useState(true);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const onMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setShowControls(false);
      }, 4000);
    };

    window.addEventListener('mousemove', onMove);
    onMove();

    return () => {
      window.removeEventListener('mousemove', onMove);
      clearTimeout(timeout);
    };
  }, []);

  const chartPath = useMemo(() => {
    const amp = waveAmplitude;
    const freq = waveFrequency;

    switch (chartStyle) {
      case 'volatile':
        return `M0 ${430 - amp * 20} L150 ${250 - amp * 40} L250 ${390 + amp * 10} L420 ${180 - amp * 30} L600 ${320 + amp * 20} L800 ${120 - amp * 50} L1000 ${260 + amp * 20} L1250 ${80 - amp * 30} L1500 ${180 + amp * 20} L1700 ${40 - amp * 20} L1920 ${20 - amp * 10}`;

      case 'stairs':
        return `M0 ${430 - amp * 10} L180 ${430 - amp * 10} L180 ${350 - amp * 15} L380 ${350 - amp * 15} L380 ${260 - amp * 20} L650 ${260 - amp * 20} L650 ${180 - amp * 25} L980 ${180 - amp * 25} L980 ${120 - amp * 30} L1400 ${120 - amp * 30} L1400 ${50 - amp * 20} L1920 ${50 - amp * 20}`;

      default:
        return `M0 ${430 - amp * 10}
          C${180 * freq} ${390 - amp * 20}
          ${240 * freq} ${450 + amp * 15}
          ${380 * freq} ${380 - amp * 25}
          C${500 * freq} ${320 - amp * 20}
          ${560 * freq} ${340 + amp * 10}
          ${700 * freq} ${260 - amp * 30}
          C${850 * freq} ${180 - amp * 40}
          ${920 * freq} ${230 + amp * 10}
          ${1060 * freq} ${170 - amp * 25}
          C${1220 * freq} ${100 - amp * 30}
          ${1320 * freq} ${140 + amp * 10}
          ${1500 * freq} ${80 - amp * 25}
          C${1650 * freq} ${40 - amp * 15}
          ${1780 * freq} ${70 + amp * 5}
          1920 ${20 - amp * 10}`;
    }
  }, [chartStyle, waveAmplitude, waveFrequency]);

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      style={{ backgroundColor }}
    >
      {/* Background image */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            opacity: backgroundOpacity,
            mixBlendMode: blendMode as React.CSSProperties['mixBlendMode'],
            filter: 'saturate(1.05) contrast(1.02)',
          }}
        />
      )}

      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,210,122,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(0,210,122,0.14),transparent_40%)]" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.05]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* World dots */}
      <div className="absolute top-0 right-0 opacity-20 scale-110 pointer-events-none">
        <svg width="100%" height="300" viewBox="0 0 800 300" preserveAspectRatio="xMidYMid slice">
          <g fill={accentColor}>
            {Array.from({ length: 500 }).map((_, i) => {
              const x = (i * 17) % 800;
              const y = ((i * 29) % 240) + 20;
              return <circle key={i} cx={x} cy={y} r="1.1" />;
            })}
          </g>
        </svg>
      </div>

      {/* AI neural activity widget */}
      <div className="absolute left-[4%] top-[7%] w-[260px] h-[180px] opacity-70 pointer-events-none">
        <svg viewBox="0 0 260 180" className="w-full h-full block">
          <defs>
            <linearGradient id="aiGlow" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={accentColor} stopOpacity="0.1" />
              <stop offset="50%" stopColor={accentColor} stopOpacity="1" />
              <stop offset="100%" stopColor={accentColor} stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {[
            [30, 40, 90, 70],
            [90, 70, 150, 50],
            [150, 50, 220, 90],
            [90, 70, 70, 140],
            [150, 50, 170, 130],
            [70, 140, 170, 130],
            [170, 130, 230, 150],
          ].map((line, i) => (
            <line
              key={i}
              x1={line[0]}
              y1={line[1]}
              x2={line[2]}
              y2={line[3]}
              stroke="url(#aiGlow)"
              strokeWidth="1.5"
              opacity="0.6"
            />
          ))}

          {[
            [30, 40],
            [90, 70],
            [150, 50],
            [220, 90],
            [70, 140],
            [170, 130],
            [230, 150],
          ].map((node, i) => (
            <circle
              key={i}
              cx={node[0]}
              cy={node[1]}
              r="5"
              fill={accentColor}
              opacity="0.9"
              style={{ filter: `drop-shadow(0 0 8px ${accentColor})` }}
            >
              <animate
                attributeName="r"
                values="4;6;4"
                dur={`${2 + i * 0.3}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}

          <circle r="3" fill={accentColor}>
            <animateMotion
              dur="6s"
              repeatCount="indefinite"
              path="M30 40 L90 70 L150 50 L220 90"
            />
          </circle>
        </svg>
      </div>

      {/* Main chart */}
      {showChart && (
        <div
          className="absolute bottom-0 left-0 w-full overflow-hidden opacity-80 transition-all duration-700"
          style={{ height: `${chartHeight}%` }}
        >
          <svg
            viewBox="0 0 1920 500"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="mainGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={accentColor} stopOpacity="0.35" />
                <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
              </linearGradient>
            </defs>

            <path
              d={chartPath}
              fill="none"
              stroke={accentColor}
              strokeWidth="4"
              strokeLinecap="round"
              style={{ filter: `drop-shadow(0 0 12px ${accentColor})` }}
            />

            <path
              d={`${chartPath} L1920 500 L0 500 Z`}
              fill="url(#mainGradient)"
            />

            {Array.from({ length: 10 }).map((_, i) => (
              <circle key={i} r="5" fill={accentColor} opacity="0.85">
                <animateMotion
                  dur={`${animationSpeed + i}s`}
                  repeatCount="indefinite"
                  path={chartPath}
                />
              </circle>
            ))}
          </svg>
        </div>
      )}

      {/* Bitcoin watermark */}
      <div className="absolute bottom-10 left-10 opacity-[0.05] select-none pointer-events-none">
        <div
          className="text-[120px] md:text-[240px] font-black"
          style={{ color: accentColor }}
        >
          ₿
        </div>
      </div>

      {/* Scan effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-[-20%] w-[30%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-12 animate-[scan_8s_linear_infinite]" />
      </div>

      {/* Controls */}
      <div
        className={`absolute top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${showControls ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}
      >
        <div className="backdrop-blur-xl bg-white/70 border border-black/10 rounded-3xl shadow-2xl px-5 py-4 flex flex-wrap gap-4 items-center max-w-[95vw] max-h-[80vh] overflow-y-auto">
          
          <div className="flex flex-col text-xs">
            <label>Accent</label>
            <input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} />
          </div>

          <div className="flex flex-col text-xs">
            <label>Background</label>
            <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} />
          </div>

          <div className="flex flex-col text-xs text-black">
            <label>Chart Style</label>
            <select value={chartStyle} onChange={(e) => setChartStyle(e.target.value)} className="rounded-lg px-2 py-1 bg-white border">
              <option value="smooth">Smooth</option>
              <option value="volatile">Volatile</option>
              <option value="stairs">Stairs</option>
            </select>
          </div>

          <div className="flex flex-col text-xs text-black min-w-[120px]">
            <label>Chart Height</label>
            <input type="range" min="20" max="90" value={chartHeight} onChange={(e) => setChartHeight(Number(e.target.value))} />
          </div>

          <div className="flex flex-col text-xs text-black min-w-[120px]">
            <label>Amplitude</label>
            <input type="range" min="0.2" max="3" step="0.1" value={waveAmplitude} onChange={(e) => setWaveAmplitude(Number(e.target.value))} />
          </div>

          <div className="flex flex-col text-xs text-black min-w-[120px]">
            <label>Frequency</label>
            <input type="range" min="0.5" max="2" step="0.1" value={waveFrequency} onChange={(e) => setWaveFrequency(Number(e.target.value))} />
          </div>

          <div className="flex flex-col text-xs text-black min-w-[120px]">
            <label>Speed</label>
            <input type="range" min="2" max="20" value={animationSpeed} onChange={(e) => setAnimationSpeed(Number(e.target.value))} />
          </div>

          <div className="flex flex-col text-xs text-black min-w-[140px]">
            <label>Background Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    setBackgroundImage(event.target?.result as string || '');
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="text-[10px] max-w-[180px]"
            />
          </div>

          <div className="flex flex-col text-xs text-black min-w-[120px]">
            <label>BG Opacity</label>
            <input type="range" min="0" max="1" step="0.01" value={backgroundOpacity} onChange={(e) => setBackgroundOpacity(Number(e.target.value))} />
          </div>

          <div className="flex flex-col text-xs text-black min-w-[140px]">
            <label>Blend Mode</label>
            <select value={blendMode} onChange={(e) => setBlendMode(e.target.value)} className="rounded-lg px-2 py-1 bg-white border">
              <option value="normal">Normal</option>
              <option value="multiply">Multiply</option>
              <option value="screen">Screen</option>
              <option value="overlay">Overlay</option>
              <option value="soft-light">Soft Light</option>
              <option value="hard-light">Hard Light</option>
              <option value="color-dodge">Color Dodge</option>
              <option value="luminosity">Luminosity</option>
              <option value="difference">Difference</option>
            </select>
          </div>

          {/* BOTON TOGGLE */}
          <div className="flex flex-col text-xs text-black">
            <label>Chart</label>
            <button
              onClick={() => setShowChart(!showChart)}
              className={`rounded-lg px-3 py-1 border text-xs font-medium transition-all ${
                showChart
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-black border-black/30'
              }`}
            >
              {showChart ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>

        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full blur-xl animate-pulse"
            style={{
              width: `${20 + i * 4}px`,
              height: `${20 + i * 4}px`,
              background: accentColor,
              opacity: 0.08,
              left: `${(i * 13) % 100}%`,
              top: `${(i * 17) % 100}%`,
              animationDuration: `${4 + i}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateX(-100%) rotate(12deg); }
          100% { transform: translateX(500%) rotate(12deg); }
        }
        @keyframes dashFlow {
          0% { stroke-dashoffset: 400; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}
