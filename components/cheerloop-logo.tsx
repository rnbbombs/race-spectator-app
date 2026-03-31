interface CheerLoopLogoProps {
  size?: number
  className?: string
}

export function CheerLoopLogo({ size = 120, className = "" }: CheerLoopLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className={className}
    >
      {/* Central circle - deep forest green */}
      <circle
        cx="120"
        cy="120"
        r="38"
        stroke="#1B6B5F"
        strokeWidth="22"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Cardinal rays - same deep forest green */}
      <line x1="120" y1="18" x2="120" y2="67" stroke="#1B6B5F" strokeWidth="20" strokeLinecap="square" />
      <line x1="120" y1="173" x2="120" y2="222" stroke="#1B6B5F" strokeWidth="20" strokeLinecap="square" />
      <line x1="18" y1="120" x2="67" y2="120" stroke="#1B6B5F" strokeWidth="20" strokeLinecap="square" />
      <line x1="173" y1="120" x2="222" y2="120" stroke="#1B6B5F" strokeWidth="20" strokeLinecap="square" />
      {/* Diagonal rays - teal accent for visual interest */}
      <line x1="55" y1="55" x2="80" y2="80" stroke="#3BA5A0" strokeWidth="16" strokeLinecap="butt" />
      <line x1="160" y1="160" x2="185" y2="185" stroke="#3BA5A0" strokeWidth="16" strokeLinecap="butt" />
      <line x1="55" y1="185" x2="80" y2="160" stroke="#3BA5A0" strokeWidth="16" strokeLinecap="butt" />
      <line x1="160" y1="80" x2="185" y2="55" stroke="#3BA5A0" strokeWidth="16" strokeLinecap="butt" />
    </svg>
  )
}
