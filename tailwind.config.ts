import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    /* 사용 예시
      <div className="mobile:bg-red-500 tablet:bg-blue-500 pc:bg-green-500">
        디바이스 배경색
      </div>
    */
    screens: {
      mobile: '375px',
      tablet: '744px',
      pc: '1280px',
    },

    extend: {
      colors: {
        /* 사용 예시
        백그라운드 컬러: bg-brand-primary
        텍스트 컬러: text-point-purple
        테두리 컬러: border-border-primary
        */
        // Brand Colors
        brand: {
          primary: '#10B981',
          secondary: '#34D399',
          tertiary: '#A3E635',
          gradient: '#10B981-#A3E635',
        },
        // Point Colors
        point: {
          purple: '#A855F7',
          blue: '#3B82F6',
          cyan: '#06B6D4',
          pink: '#EC4899',
          rose: '#F43F5E',
          orange: '#F97316',
          yellow: '#EAB308',
        },
        // Background Colors
        background: {
          primary: '#0F172A',
          secondary: '#1E293B',
          tertiary: '#334155',
          inverse: '#FFFFFF',
        },
        // Interaction Colors
        interaction: {
          inactive: '#94A3B8',
          hover: '#059669',
          pressed: '#047857',
          focus: '#10B981',
        },
        // Border Colors
        border: {
          primary: '#8FAFC50',
        },
        // Text Colors
        text: {
          primary: '#F8FAFC',
          secondary: '#CBD5E1',
          tertiary: '#E2E8F0',
          default: '#64748B',
          inverse: '#FFFFFF',
          disabled: '#94A3B8',
        },
        // Status Colors
        status: {
          danger: '#DC2626',
        },
        // Icon Colors
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
    },
  },
  plugins: [],
} satisfies Config;
