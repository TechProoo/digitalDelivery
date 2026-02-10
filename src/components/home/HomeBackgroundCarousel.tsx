import { useEffect, useMemo, useState } from "react";

type HomeBackgroundCarouselProps = {
  images: string[];
  intervalMs?: number;
};

export default function HomeBackgroundCarousel({
  images,
  intervalMs = 6500,
}: HomeBackgroundCarouselProps) {
  const slides = useMemo(() => images.filter(Boolean), [images]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedBySrc, setLoadedBySrc] = useState<Record<string, boolean>>({});
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const activeSrc = slides[activeIndex];
    if (!activeSrc) return;
    if (loadedBySrc[activeSrc]) return;

    const firstLoadedIndex = slides.findIndex((src) => loadedBySrc[src]);
    if (firstLoadedIndex >= 0 && firstLoadedIndex !== activeIndex) {
      setActiveIndex(firstLoadedIndex);
    }
  }, [slides, activeIndex, loadedBySrc]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mediaQuery.matches);

    sync();
    mediaQuery.addEventListener("change", sync);
    return () => mediaQuery.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    // Reset loaded flags when the slide list changes.
    setLoadedBySrc({});
    setActiveIndex(0);
  }, [slides]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (slides.length === 0) return;

    let cancelled = false;
    const preloaders: HTMLImageElement[] = [];

    slides.forEach((src) => {
      const img = new Image();
      preloaders.push(img);
      img.decoding = "async";
      img.loading = "eager";
      img.src = src;

      const markLoaded = () => {
        if (cancelled) return;
        setLoadedBySrc((current) => {
          if (current[src]) return current;
          return { ...current, [src]: true };
        });
      };

      img.onload = markLoaded;
      img.onerror = markLoaded;
    });

    return () => {
      cancelled = true;
      preloaders.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [slides]);

  useEffect(() => {
    if (reduceMotion) return;
    if (slides.length <= 1) return;
    if (typeof document === "undefined") return;

    const chooseNextIndex = (current: number) => {
      for (let offset = 1; offset <= slides.length; offset++) {
        const candidate = (current + offset) % slides.length;
        const candidateSrc = slides[candidate];
        if (loadedBySrc[candidateSrc]) return candidate;
      }
      return current;
    };

    const tick = () => {
      setActiveIndex((current) => chooseNextIndex(current));
    };

    let timer: number | null = null;

    const start = () => {
      if (timer !== null) return;
      timer = window.setInterval(tick, intervalMs);
    };

    const stop = () => {
      if (timer === null) return;
      window.clearInterval(timer);
      timer = null;
    };

    const handleVisibility = () => {
      if (document.visibilityState === "visible") start();
      else stop();
    };

    handleVisibility();
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [slides, intervalMs, reduceMotion, loadedBySrc]);

  if (slides.length === 0) return null;

  return (
    <div className="home_bg_carousel" aria-hidden="true">
      {slides.map((src, index) => (
        <div
          key={`${src}-${index}`}
          className={`home_bg_slide${index === activeIndex ? " is-active" : ""}`}
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}
    </div>
  );
}
