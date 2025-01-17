import debounce from 'lodash.debounce';
import { useState, useEffect, useCallback } from 'react';

export type ScreenType = 'mobile' | 'tablet' | 'pc' | null;

const BREAK_POINTS = {
  mobile: 0,
  tablet: 744,
  pc: 1280,
} as const;

const useResize = () => {
  const [screenType, setScreenType] = useState<ScreenType>(null);

  // 클라이언트에서만 초기값 설정
  useEffect(() => {
    const width = window.innerWidth;
    if (width >= BREAK_POINTS.pc) {
      setScreenType('pc');
    } else if (width >= BREAK_POINTS.tablet) {
      setScreenType('tablet');
    } else {
      setScreenType('mobile');
    }
  }, []);

  const handleResize = useCallback(() => {
    const debouncedResize = debounce(() => {
      const currentWidth = window.innerWidth;

      if (currentWidth >= BREAK_POINTS.pc) {
        setScreenType('pc');
      } else if (currentWidth >= BREAK_POINTS.tablet) {
        setScreenType('tablet');
      } else {
        setScreenType('mobile');
      }
    }, 250);

    debouncedResize();
    return debouncedResize;
  }, []);

  useEffect(() => {
    const debouncedHandler = handleResize();
    window.addEventListener('resize', debouncedHandler);

    return () => {
      debouncedHandler.cancel();
      window.removeEventListener('resize', debouncedHandler);
    };
  }, [handleResize]);

  return screenType;
};

export default useResize;
