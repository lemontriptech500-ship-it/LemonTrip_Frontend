const countryFlags: Record<string, string> = {
  'United Kingdom': '🇬🇧',
  France: '🇫🇷',
  Australia: '🇦🇺',
  'United States': '🇺🇸',
  Singapore: '🇸🇬',
  Thailand: '🇹🇭',
}

export function CountryFlag({ country, className = '' }: { country: string; className?: string }) {
  return (
    <span
      role="img"
      aria-label={`${country} flag`}
      className={`inline-flex items-center justify-center rounded-lg bg-[var(--color-secondary-soft)] ${className}`}
    >
      {countryFlags[country] ?? '🏳️'}
    </span>
  )
}
