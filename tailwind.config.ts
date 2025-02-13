import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    screens: {
      mobile: '375px',
      tablet: '744px',
      pc: '1280px',
    },
    extend: {
      colors: {
        brand: {
          primary: '#10B981',
          secondary: '#34D399',
          tertiary: '#A3E635',
          gradient: '#10B981-#A3E635',
        },
        point: {
          purple: '#A855F7',
          blue: '#3B82F6',
          cyan: '#06B6D4',
          pink: '#EC4899',
          rose: '#F43F5E',
          orange: '#F97316',
          yellow: '#EAB308',
        },
        background: {
          primary: '#0F172A',
          secondary: '#1E293B',
          tertiary: '#334155',
          inverse: '#FFFFFF',
        },
        interaction: {
          inactive: '#94A3B8',
          hover: '#059669',
          pressed: '#047857',
          focus: '#10B981',
        },
        border: {
          primary: 'rgba(248, 250, 252, 0.1)',
        },
        text: {
          primary: '#F8FAFC',
          secondary: '#CBD5E1',
          tertiary: '#E2E8F0',
          default: '#64748B',
          inverse: '#FFFFFF',
          disabled: '#94A3B8',
        },
        status: {
          danger: '#DC2626',
        },
        icon: {
          primary: '#64748B',
          inverse: '#8FAFC',
          brand: '#10B981',
        },
      },
      fontSize: {
        xs: '1.2rem',
        sm: '1.4rem',
        base: '1.6rem',
        lg: '1.8rem',
        xl: '2.0rem',
        '2xl': '2.4rem',
        '3xl': '3.0rem',
        '4xl': '3.6rem',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      backgroundImage: {
        'gradation-main': 'linear-gradient(90deg, #10B981 0%, #CEF57E 100%)',
      },
      boxShadow: {
        'drop-shadow-white': '0rem 0rem 1.2rem 0.2rem #ffffff40',
        'drop-shadow-black': '0rem 0rem 1.2rem 0.2rem #00000040',
      },
    },
  },
  plugins: [animate],
} satisfies Config;
