import { useEffect, useRef } from 'react';

export function useIntervale(callback: () => void, delay: number | null) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const savedCallback = useRef() as any;

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [callback, delay]);
}
