import { useRef } from "react";
import { useDigitalLogisticsLoader } from "./GsapAnimation";

export default function LoaderAnim() {
  const rootRef = useRef<HTMLDivElement>(null);
  useDigitalLogisticsLoader(rootRef);

  return (
    <div ref={rootRef} style={{ display: "grid", placeItems: "center" }}>
      <svg
        width="120"
        height="120"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Digital Delivery loading"
        role="img"
      >
        <defs>
          <linearGradient
            id="dlGrad"
            x1="20"
            y1="20"
            x2="80"
            y2="80"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="var(--accent-teal)" />
            <stop offset="100%" stopColor="var(--accent-sky)" />
          </linearGradient>

          <filter id="dlGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          id="dl-track"
          d="M26 30
             Q26 22 34 22
             H46
             Q54 22 54 30
             V70
             Q54 78 46 78
             H34
             Q26 78 26 70
             V30
             M54 30
             Q54 22 62 22
             H74
             Q82 22 82 30
             V70
             Q82 78 74 78
             H62
             Q54 78 54 70"
          stroke="hsl(var(--foreground) / 0.10)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          id="dl-route"
          d="M26 30
             Q26 22 34 22
             H46
             Q54 22 54 30
             V70
             Q54 78 46 78
             H34
             Q26 78 26 70
             V30
             M54 30
             Q54 22 62 22
             H74
             Q82 22 82 30
             V70
             Q82 78 74 78
             H62
             Q54 78 54 70"
          stroke="url(#dlGrad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#dlGlow)"
        />

        {/* Start dot at the route's start point */}
        <circle
          id="dl-dot"
          cx="26"
          cy="30"
          r="3.2"
          fill="var(--accent-amber)"
          opacity="0.95"
        />
      </svg>
    </div>
  );
}
