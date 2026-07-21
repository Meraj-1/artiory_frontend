// hooks/useBreakpoint.ts
import { useState, useEffect } from 'react';

const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

type Breakpoint = keyof typeof breakpoints;

export function useBreakpoint(debounceDelay = 200): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('xs');

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const getBreakpoint = (width: number): Breakpoint => {
      if (width >= breakpoints['2xl']) return '2xl';
      if (width >= breakpoints.xl) return 'xl';
      if (width >= breakpoints.lg) return 'lg';
      if (width >= breakpoints.md) return 'md';
      if (width >= breakpoints.sm) return 'sm';
      return 'xs';
    };

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const newBreakpoint = getBreakpoint(window.innerWidth);
        setBreakpoint((prev) => (prev !== newBreakpoint ? newBreakpoint : prev));
      }, debounceDelay);
    };

    handleResize(); // Set initial breakpoint
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [debounceDelay]);

  return breakpoint;
}