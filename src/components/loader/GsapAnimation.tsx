import { useEffect } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

export function useDigitalLogisticsLoader(
  rootRef: React.RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const route = root.querySelector<SVGPathElement>("#dl-route");
    const dot = root.querySelector<SVGCircleElement>("#dl-dot");

    if (!route || !dot) return;

    // Reduced motion support
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      dot.setAttribute("opacity", "0");
      route.style.opacity = "1";
      return;
    }

    const length = route.getTotalLength();

    // Prep draw
    route.style.strokeDasharray = `${length}`;
    route.style.strokeDashoffset = `${length}`;

    // Important: ensure transforms behave correctly in SVG
    gsap.set([route, dot], { transformOrigin: "50% 50%" });
    gsap.set(dot, { opacity: 0, x: 0, y: 0 });

    const tl = gsap.timeline({ repeat: -1 });

    tl.to(route, {
      strokeDashoffset: 0,
      duration: 1.1,
      ease: "power2.out",
    });

    tl.to(dot, { opacity: 1, duration: 0.01 }, 0.05);

    tl.to(
      dot,
      {
        duration: 1.1,
        ease: "power2.out",
        motionPath: {
          path: route,
          align: route,
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
          start: 0,
          end: 1,
        },
      },
      0,
    );

    // glow pulse (on the route itself)
    tl.to(
      route,
      { opacity: 0.85, duration: 0.25, ease: "sine.inOut" },
      0.65,
    ).to(route, { opacity: 1, duration: 0.25, ease: "sine.inOut" }, 0.9);

    // reset loop
    tl.to(dot, { opacity: 0, duration: 0.15 }, 1.05)
      .to(route, { opacity: 0, duration: 0.18 }, 1.05)
      .set(route, { strokeDashoffset: length, opacity: 1 })
      .set(dot, { opacity: 0, x: 0, y: 0 });

    return () => {
      tl.kill();
    };
  }, []); // run once
}
