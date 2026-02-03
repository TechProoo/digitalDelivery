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

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [slides.length, intervalMs]);

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
