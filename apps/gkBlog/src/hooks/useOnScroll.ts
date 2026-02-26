import { useEffect, useRef, useState } from "react";

export default function useScroll(threshold = 0) {
  const [isScrolled, setScrolled] = useState<boolean>();
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > threshold);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    onScroll();

    document.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [threshold]);

  return isScrolled;
}
