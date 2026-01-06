import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Home, Package, MapPin, Clock, LogOut, Menu, X } from "lucide-react";

// simple className merger
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Sidebar({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false); // mobile
  const [isCollapsed, setIsCollapsed] = useState(false); // desktop collapsed
  const [isLarge, setIsLarge] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsLarge("matches" in e ? e.matches : mq.matches);
    // set initial
    setIsLarge(mq.matches);
    if (mq.addEventListener) mq.addEventListener("change", handler as any);
    else mq.addListener(handler as any);
    return () => {
      if (mq.removeEventListener)
        mq.removeEventListener("change", handler as any);
      else mq.removeListener(handler as any);
    };
  }, []);

  useEffect(() => {
    // lock body scroll when mobile menu open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const mainMenu = [
    {
      title: "Dashboard",
      to: "/dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: "New Delivery",
      to: "/new-delivery",
      icon: <Package className="h-5 w-5" />,
    },
    {
      title: "Track Package",
      to: "/track-package",
      icon: <MapPin className="h-5 w-5" />,
    },
    {
      title: "My Orders",
      to: "/my-orders",
      icon: <Clock className="h-5 w-5" />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-muted/50">
      {/* mobile backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity lg:hidden",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      />

      {/* sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen flex flex-col transition-all duration-300 overflow-x-hidden no-scrollbar",
          // width
          isCollapsed ? "w-20" : "w-64",
          // mobile translate
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen"
        )}
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderRight: "1px solid var(--border-medium)",
        }}
      >
        {/* header */}
        <div
          className={cn("h-16 flex items-center px-4 border-b")}
          style={{
            borderColor: "var(--border-medium)",
            color: "var(--text-primary)",
          }}
        >
          {!isCollapsed ? (
            <>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                  <Package className="h-5 w-5" />
                </div>
                <div className="hidden lg:block">
                  <div className="text-lg font-bold text-primary">
                    Digital Delivery
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Logistics Platform
                  </div>
                </div>
              </div>
              {/* single toggle button removed from here; control is in header bar to keep behavior consistent */}
            </>
          ) : (
            // collapsed header
            <div className="w-full flex items-center justify-center">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                <Package className="h-5 w-5" />
              </div>
            </div>
          )}
        </div>

        {/* nav */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar">
          <div>
            <div className="space-y-1">
              {mainMenu.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "group relative flex items-center rounded-lg transition-all duration-150 overflow-hidden",
                      isCollapsed
                        ? "justify-center px-0 py-2.5 gap-0"
                        : "gap-3 px-3 py-2.5",
                      "hover:bg-(--hover-overlay)",
                      isActive && "shadow-sm"
                    )
                  }
                  style={({ isActive }) => ({
                    color: isActive
                      ? "var(--text-primary)"
                      : "var(--text-secondary)",
                    backgroundColor: isActive
                      ? "var(--bg-tertiary)"
                      : undefined,
                  })}
                >
                  <span
                    className="shrink-0 flex items-center justify-center"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    {item.icon}
                  </span>

                  <span className={cn(isCollapsed && "sr-only")}>
                    {item.title}
                  </span>

                  {isCollapsed && (
                    <div
                      className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transform transition-all duration-200 group-hover:translate-x-1"
                      style={{
                        backgroundColor: "var(--bg-overlay)",
                        color: "var(--text-primary)",
                      }}
                    >
                      {item.title}
                    </div>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>

        {/* footer */}
        <div
          className="mt-auto border-t p-4"
          style={{
            borderColor: "var(--border-medium)",
            color: "var(--text-primary)",
          }}
        >
          {!isCollapsed ? (
            <div className="flex items-center gap-3">
              <div
                className="h-10 w-10 rounded-full"
                style={{
                  backgroundColor: "var(--brand-primary)",
                  color: "var(--text-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 600,
                }}
              >
                TP
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">TechPro</div>
                <div
                  className="text-xs"
                  style={{ color: "var(--text-secondary)" }}
                >
                  techpro@email.com
                </div>
              </div>
              <button
                className="px-3 py-2 rounded-lg flex items-center gap-2"
                style={{
                  color: "var(--text-primary)",
                  backgroundColor: "transparent",
                }}
              >
                <LogOut
                  className="h-4 w-4"
                  style={{ color: "var(--status-failed)" }}
                />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div
                className="h-10 w-10 rounded-full"
                style={{
                  backgroundColor: "var(--brand-primary)",
                  color: "var(--text-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 600,
                }}
              >
                TP
              </div>
              <button
                className="p-2 rounded relative group"
                style={{ backgroundColor: "transparent" }}
              >
                <LogOut
                  className="h-5 w-5"
                  style={{ color: "var(--status-failed)" }}
                />
                <div
                  className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none"
                  style={{
                    backgroundColor: "var(--bg-overlay)",
                    color: "var(--text-primary)",
                  }}
                >
                  Logout
                </div>
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* main content area */}
      <div
        className={cn(
          "flex-1 flex flex-col min-h-screen lg:pl-0",
          isCollapsed ? "pl-20" : "pl-64"
        )}
      >
        {/* header bar */}
        <header className="sticky top-0 h-16 bg-(--bg-secondary) border-b z-30 flex items-center px-4">
          <div className="flex items-center gap-3">
            {/* unified toggle button: on large screens toggles collapse, on small screens toggles open */}
            <button
              onClick={() => {
                if (isLarge) setIsCollapsed((s) => !s);
                else setIsOpen((s) => !s);
              }}
              aria-label={
                isLarge
                  ? isCollapsed
                    ? "Open sidebar"
                    : "Close sidebar"
                  : isOpen
                  ? "Close sidebar"
                  : "Open sidebar"
              }
              className="p-2 rounded-lg"
            >
              {isLarge ? (
                !isCollapsed ? (
                  <X className="h-5 w-5" color="#e6f1f5" />
                ) : (
                  <Menu className="h-5 w-5" color="#e6f1f5" />
                )
              ) : isOpen ? (
                <X className="h-5 w-5" color="#e6f1f5" />
              ) : (
                <Menu className="h-5 w-5" color="#e6f1f5" />
              )}
            </button>
            <div className="ml-2 text-xl font-semibold text-(--text-primary)">
              Dashboard
            </div>
          </div>

          <div className="flex-1"></div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button className="p-2 rounded-lg">
                <Package className="h-5 w-5" color="#e6f1f5" />
              </button>
              <span className="absolute top-0 right-0 h-2 w-2 bg-primary rounded-full" />
            </div>
          </div>
        </header>

        {/* content */}
        <main className="flex-1 p-4 lg:p-6 bg-muted/50">{children}</main>
      </div>
    </div>
  );
}

export default Sidebar;
