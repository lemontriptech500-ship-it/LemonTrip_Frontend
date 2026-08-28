/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* ─── Brand Primary ─── */
        primary:        'var(--color-primary)',
        'primary-hover':  'var(--color-primary-hover)',
        'primary-active': 'var(--color-primary-active)',
        'primary-dark':   'var(--color-primary-dark)',
        'primary-soft':   'var(--color-primary-soft)',

        /* ─── Brand Secondary ─── */
        secondary:       'var(--color-secondary)',
        'secondary-hover': 'var(--color-secondary-hover)',
        'secondary-soft': 'var(--color-secondary-soft)',

        /* ─── Brand Accent ─── */
        accent:      'var(--color-accent)',
        'accent-hover': 'var(--color-accent-hover)',
        'accent-soft': 'var(--color-accent-soft)',

        /* ─── Neutral Surfaces ─── */
        background:          'var(--color-background)',
        'background-soft':   'var(--color-background-soft)',
        surface:             'var(--color-surface)',
        'surface-secondary': 'var(--color-surface-secondary)',

        /* ─── Text ─── */
        'text-primary':   'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted':     'var(--color-text-muted)',

        /* ─── Borders ─── */
        border:        'var(--color-border)',
        'border-light': 'var(--color-border-light)',
        'border-strong': 'var(--color-border-strong)',

        /* ─── Semantic ─── */
        success:     'var(--color-success)',
        'success-bg': 'var(--color-success-bg)',
        warning:     'var(--color-warning)',
        'warning-bg': 'var(--color-warning-bg)',
        error:       'var(--color-error)',
        'error-bg':  'var(--color-error-bg)',
        info:        'var(--color-info)',
        'info-bg':   'var(--color-info-bg)',
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1280px',
      },
      borderRadius: {
        sm:   'var(--radius-sm)',
        md:   'var(--radius-md)',
        lg:   'var(--radius-lg)',
        xl:   'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        pill: 'var(--radius-pill)',
      },
      boxShadow: {
        xs:   'var(--shadow-xs)',
        sm:   'var(--shadow-sm)',
        md:   'var(--shadow-md)',
        lg:   'var(--shadow-lg)',
        xl:   'var(--shadow-xl)',
      },
      screens: {
        xs: '375px',
      },
    },
  },
  plugins: [],
}
