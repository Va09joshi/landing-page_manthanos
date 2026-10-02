export function FooterArt({ className = "" }) {
  return (
    <svg viewBox="0 0 360 330" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="envelope-back" x1="75" y1="55" x2="260" y2="280" gradientUnits="userSpaceOnUse"><stop stopColor="#4896ff" /><stop offset=".55" stopColor="#144cf1" /><stop offset="1" stopColor="#082aaf" /></linearGradient>
        <linearGradient id="envelope-paper" x1="135" y1="60" x2="240" y2="220" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" /><stop offset="1" stopColor="#cbdcff" /></linearGradient>
        <linearGradient id="envelope-front" x1="80" y1="185" x2="265" y2="315" gradientUnits="userSpaceOnUse"><stop stopColor="#388dff" /><stop offset=".6" stopColor="#135af6" /><stop offset="1" stopColor="#0739ce" /></linearGradient>
        <linearGradient id="envelope-side" x1="300" y1="160" x2="150" y2="290" gradientUnits="userSpaceOnUse"><stop stopColor="#65c6ff" /><stop offset="1" stopColor="#1e5ef3" /></linearGradient>
        <linearGradient id="envelope-badge" x1="275" y1="40" x2="310" y2="100" gradientUnits="userSpaceOnUse"><stop stopColor="#5bbaff" /><stop offset="1" stopColor="#235bff" /></linearGradient>
        <filter id="envelope-shadow" x="-40%" y="-30%" width="180%" height="180%"><feDropShadow dx="0" dy="18" stdDeviation="12" floodColor="#020617" floodOpacity=".62" /></filter>
        <filter id="envelope-floor"><feGaussianBlur stdDeviation="9" /></filter>
      </defs>
      <ellipse cx="176" cy="298" rx="118" ry="13" fill="#002488" opacity=".35" filter="url(#envelope-floor)" />
      <g transform="rotate(-10 180 175)" filter="url(#envelope-shadow)">
        <path d="M55 128 160 35Q172 24 185 35L300 128V268Q300 283 284 283H71Q55 283 55 267Z" fill="url(#envelope-back)" stroke="#77afff" strokeWidth="2" />
        <path d="m57 130 120 95 121-95-121 37Z" fill="#0732bf" />
        <rect x="94" y="52" width="174" height="192" rx="12" fill="url(#envelope-paper)" stroke="white" strokeWidth="2" />
        <rect x="120" y="91" width="124" height="10" rx="5" fill="#397bff" />
        <rect x="120" y="116" width="104" height="10" rx="5" fill="#559aff" />
        <rect x="120" y="141" width="76" height="10" rx="5" fill="#397bff" />
        <path d="m56 130 121 97L63 279Q55 276 55 266Z" fill="url(#envelope-front)" stroke="#5a99ff" strokeWidth="2" />
        <path d="m299 130-122 97 114 51q9-3 9-15Z" fill="url(#envelope-side)" stroke="#69b6ff" strokeWidth="2" />
        <path d="m61 278 105-100q11-10 23 0l104 100q-4 6-17 6H75q-9 0-14-6Z" fill="url(#envelope-front)" stroke="#5995ff" strokeWidth="2" />
      </g>
      <g transform="rotate(15 301 71)"><rect x="274" y="43" width="57" height="57" rx="17" fill="url(#envelope-badge)" stroke="#8ccfff" strokeWidth="1.5" /><path d="m288 72 10 9 17-22" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" /></g>
    </svg>
  );
}
