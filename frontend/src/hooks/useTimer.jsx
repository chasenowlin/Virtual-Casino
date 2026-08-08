import { useEffect, useRef } from "react";

const useTimer = () => {
  const timers = useRef([]);

  useEffect(() => {
    return () => {
      if (timers.current.length !== 0)
        timers.current.forEach((timerId) => {
          clearTimeout(timerId);
        });
    };
  }, []);

  const startTimer = (callback, delay) => {
    const timerId = setTimeout(callback, delay);
    timers.current = [...timers.current, timerId];
  };

  return { startTimer };
};

export default useTimer;
