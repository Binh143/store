import { useEffect, useState } from "react";

export default function useDebounce(initialineValue = ``, delay = 1000) {
  const [debounceValues, setDebounce] = useState(initialineValue);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(initialineValue);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [delay, initialineValue]);
  return debounceValues;
}
