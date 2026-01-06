import React, { useState } from "react";
import { motion } from "framer-motion";
import { Home, Package, MapPin, Clock } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

// Simple className merger
function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export type BottomNavProps = {
  className?: string;
  defaultIndex?: number;
};

const navItems = [
  { label: "Dashboard", icon: Home, href: "/dashboard" },
  { label: "New Order", icon: Package, href: "/dashboard/new-delivery" },
  { label: "Track", icon: MapPin, href: "/dashboard/track" },
  { label: "Orders", icon: Clock, href: "/dashboard/orders" },
];

export const BottomNav: React.FC<BottomNavProps> = ({
  className,
  defaultIndex = 0,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(defaultIndex);
  const [isSmallScreen, setIsSmallScreen] = useState(
    typeof window !== "undefined" ? window.innerWidth < 1024 : false
  );
  const navigate = useNavigate();
  const location = useLocation();

  // Track screen size
  React.useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // sync active index with current pathname
  React.useEffect(() => {
    const path = location.pathname;
    // try exact match first
    let idx = navItems.findIndex((it) => it.href === path);
    if (idx === -1) {
      // try startsWith to handle nested routes (e.g. /dashboard/orders/123)
      idx = navItems.findIndex(
        (it) => path === it.href || path.startsWith(it.href + "/")
      );
    }
    if (idx === -1) idx = defaultIndex;
    setActiveIndex(idx);
  }, [location.pathname, defaultIndex]);

  // Only render on small screens
  if (!isSmallScreen) return null;

  return (
    <motion.nav
      role="navigation"
      aria-label="Bottom Navigation"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      className={cn(
        "fixed bottom-4 left-1/2 -translate-x-1/2 z-50",
        "min-w-[320px] max-w-[95vw]",
        "flex items-center p-2 space-x-1 rounded-full shadow-xl",
        className
      )}
      style={{
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border-medium)",
        display: "flex",
      }}
    >
      {navItems.map((item, idx) => {
        const Icon = item.icon as React.ComponentType<any>;
        const isActive = idx === activeIndex;

        return (
          <motion.button
            key={item.label}
            type="button"
            aria-label={item.label}
            onClick={() => {
              setActiveIndex(idx);
              try {
                navigate(item.href);
              } catch (e) {
                /* noop */
              }
            }}
            whileTap={{ scale: 0.97 }}
            className={cn(
              "flex items-center rounded-full px-3 py-2 min-h-10 h-10 transition-colors duration-200 gap-2"
            )}
            style={{
              backgroundColor: isActive
                ? "rgba(46,196,182,0.12)" /* accent-teal tint */
                : "transparent",
              color: isActive ? "var(--accent-teal)" : "var(--text-secondary)",
            }}
          >
            <Icon size={22} strokeWidth={2} style={{ color: "currentColor" }} />

            <motion.div
              initial={false}
              animate={{
                width: isActive ? "72px" : "0px",
                opacity: isActive ? 1 : 0,
                marginLeft: isActive ? "8px" : "0px",
              }}
              transition={{
                width: { type: "spring", stiffness: 350, damping: 32 },
                opacity: { duration: 0.19 },
                marginLeft: { duration: 0.19 },
              }}
              className="overflow-hidden flex items-center max-w-18"
            >
              <span
                className="font-medium text-xs whitespace-nowrap overflow-hidden text-ellipsis"
                style={{ color: "inherit" }}
              >
                {item.label}
              </span>
            </motion.div>
          </motion.button>
        );
      })}
    </motion.nav>
  );
};

export default BottomNav;
