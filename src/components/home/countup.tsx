import React, { useState, useEffect, useRef } from "react";

interface Props {
  endValue: number;
  duration?: number;
  suffix?: string;
}

const CountUp = ({ endValue, duration = 2000, suffix = "" }: Props) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasStarted = useRef(false);

  const startAnimation = () => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    const start = 0;
    const end = parseFloat(endValue.toString().replace(/\+/g, ""));
    const startTime = Date.now();

    const step = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentValue = Math.floor(progress * (end - start) + start);
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        // Ensure the final value is exactly the target
        setCount(end);
      }
    };

    requestAnimationFrame(step);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
        }
      },
      {
        threshold: 0.5, // Start when 50% of the element is visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

export default CountUp;
