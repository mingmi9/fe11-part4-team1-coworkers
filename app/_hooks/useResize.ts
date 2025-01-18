import debounce from 'lodash.debounce';
import { useState, useEffect } from 'react';

export type ScreenType = 'mobile' | 'tablet' | 'pc' | null;

const BREAKPOINTS = {
  mobile: 0,
  tablet: 744,
  pc: 1280,
} as const;

const useResize = () => {
  const [screenType, setScreenType] = useState<ScreenType>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const getScreenType = (width: number): ScreenType => {
      if (width >= BREAKPOINTS.pc) {
        return 'pc';
      } else if (width >= BREAKPOINTS.tablet) {
        return 'tablet';
      } else {
        return 'mobile';
      }
    };

    // resize 이벤트용 debounced 함수
    const handleResize = debounce(() => {
      const currentWidth = window.innerWidth;
      setScreenType(getScreenType(currentWidth));
    }, 250);

    // 초기 화면 크기 250ms 지연 없이 즉시 설정
    setScreenType(getScreenType(window.innerWidth));

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenType;
};

export default useResize;
