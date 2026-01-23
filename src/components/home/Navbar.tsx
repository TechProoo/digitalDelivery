import { useEffect, useState } from "react";
import Logo from "../../assets/logo.png";
import { Globe, Menu, Moon, Sun, X } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import {
  applyTheme,
  getAppliedTheme,
  toggleTheme,
  type Theme,
} from "../../lib/theme";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => getAppliedTheme());
  const location = useLocation();

  const isDark = theme === "dark";

  const { isAuthenticated } = useAuth();
  const navLinks = [
    { name: "Solutions", path: "/#solutions" },
    { name: "About", path: "/about" },
    { name: "Resources", path: "/resources" },
    { name: "Support", path: "/support" },
    { name: "Contact", path: "/contact" },
  ];

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");
    if (!id) return;

    const scroll = () => {
      const target = document.getElementById(id);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    // Wait a tick so the route renders the section.
    requestAnimationFrame(() => requestAnimationFrame(scroll));
  }, [location.pathname, location.hash]);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((t) => toggleTheme(t));
  };

  const navUnderlineBase =
    "relative inline-flex items-center text-sm font-medium transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100";

  return (
    <>
      <header
        className="sticky top-0 z-50 w-full"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--background) / 0.90) 0%, hsl(var(--background) / 0.70) 100%)",
          borderBottom: "1px solid var(--border-soft)",
          backdropFilter: "blur(14px)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <nav className="h-16 flex items-center gap-4">
            {/* Brand */}
            <NavLink
              to="/"
              className="flex items-center gap-3 shrink-0"
              aria-label="Go to home"
            >
              <span
                className="grid place-items-center rounded-xl"
                style={{
                  width: 40,
                  height: 40,
                  background: "var(--gradient-primary)",
                  boxShadow: "var(--glow-primary)",
                }}
              >
                <img
                  src={Logo}
                  alt="Digital Logistics"
                  className="h-7 w-7"
                  style={{ filter: "drop-shadow(0 1px 6px rgba(0,0,0,0.35))" }}
                />
              </span>
              <div className="leading-tight">
                <div
                  className="font-semibold tracking-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  Digital
                  <span style={{ color: "var(--accent-teal)" }}>Logistics</span>
                </div>
              </div>
            </NavLink>

            {/* Center Links (desktop) */}
            <div className="hidden lg:flex flex-1 justify-center">
              <ul className="flex items-center gap-8">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        [
                          navUnderlineBase,
                          isActive
                            ? "text-(--text-primary) after:scale-x-100"
                            : "text-(--text-secondary) hover:text-(--text-primary)",
                        ].join(" ")
                      }
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2 sm:gap-3 ml-auto">
              <button
                type="button"
                onClick={handleToggleTheme}
                className="hidden sm:grid place-items-center rounded-full h-10 w-10 transition"
                style={{
                  border: "1px solid var(--border-soft)",
                  background: "hsl(var(--card) / 0.65)",
                  color: "var(--text-primary)",
                }}
                aria-label="Toggle theme"
                title="Toggle theme"
              >
                {isDark ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>

              {isAuthenticated ? (
                <NavLink
                  to="/dashboard"
                  className="hidden sm:inline-flex items-center px-3 py-2 text-sm font-medium transition-colors"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Dashboard
                </NavLink>
              ) : (
                <NavLink
                  to="/login"
                  className="hidden sm:inline-flex items-center px-3 py-2 text-sm font-medium transition-colors"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Sign In
                </NavLink>
              )}

              <NavLink
                to="/dashboard/new-delivery"
                className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold"
                style={{
                  background: "hsl(var(--primary))",
                  color: "var(--primary-foreground)",
                  boxShadow: "var(--glow-primary)",
                }}
              >
                Get a Quote
              </NavLink>

              <button
                onClick={() => setIsMobileMenuOpen((v) => !v)}
                className="lg:hidden grid place-items-center rounded-full h-10 w-10"
                aria-label="Toggle menu"
                style={{
                  border: "1px solid var(--border-soft)",
                  background: "hsl(var(--card) / 0.65)",
                  color: "var(--text-primary)",
                }}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ background: "rgba(0,0,0,0.55)" }}
          />

          <div
            className="fixed top-0 right-0 z-50 lg:hidden h-full w-[90vw] max-w-sm"
            style={{
              background: "hsl(var(--background) / 0.98)",
              borderLeft: "1px solid var(--border-soft)",
              boxShadow: "var(--shadow-strong)",
            }}
          >
            <div
              className="h-16 px-4 flex items-center justify-between"
              style={{ borderBottom: "1px solid var(--border-soft)" }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="grid place-items-center rounded-lg"
                  style={{
                    width: 34,
                    height: 34,
                    background: "var(--gradient-primary)",
                    boxShadow: "var(--glow-primary)",
                  }}
                >
                  <img src={Logo} alt="Digital Logistics" className="h-6 w-6" />
                </span>
                <div
                  className="font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Digital
                  <span style={{ color: "var(--accent-teal)" }}>Logistics</span>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="grid place-items-center rounded-full h-10 w-10"
                aria-label="Close menu"
                style={{
                  border: "1px solid var(--border-soft)",
                  background: "hsl(var(--card) / 0.65)",
                  color: "var(--text-primary)",
                }}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4">
              <div
                className="flex items-center justify-between rounded-xl px-4 py-3"
                style={{
                  background: "hsl(var(--card) / 0.6)",
                  border: "1px solid var(--border-soft)",
                }}
              >
                <div
                  className="flex items-center gap-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <Globe className="h-4 w-4" />
                  <span className="text-sm font-medium">us</span>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    EN
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleToggleTheme}
                  className="grid place-items-center rounded-full h-10 w-10"
                  style={{
                    border: "1px solid var(--border-soft)",
                    background: "hsl(var(--background) / 0.6)",
                    color: "var(--text-primary)",
                  }}
                  aria-label="Toggle theme"
                >
                  {isDark ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </button>
              </div>

              <nav className="mt-4">
                <ul className="space-y-1">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <NavLink
                        to={link.path}
                        className={({ isActive }) =>
                          [
                            "block rounded-xl px-4 py-3 transition-colors",
                            navUnderlineBase,
                            isActive
                              ? "text-(--text-primary) after:scale-x-100"
                              : "text-(--text-secondary) hover:text-(--text-primary)",
                          ].join(" ")
                        }
                        style={{
                          background: "transparent",
                        }}
                      >
                        {link.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-6 grid gap-2">
                {isAuthenticated ? (
                  <NavLink
                    to="/dashboard"
                    className="rounded-full px-4 py-3 text-center text-sm font-semibold"
                    style={{
                      border: "1px solid var(--border-soft)",
                      background: "hsl(var(--card) / 0.6)",
                      color: "var(--text-primary)",
                    }}
                  >
                    Dashboard
                  </NavLink>
                ) : (
                  <NavLink
                    to="/login"
                    className="rounded-full px-4 py-3 text-center text-sm font-semibold"
                    style={{
                      border: "1px solid var(--border-soft)",
                      background: "hsl(var(--card) / 0.6)",
                      color: "var(--text-primary)",
                    }}
                  >
                    Sign In
                  </NavLink>
                )}
                <NavLink
                  to="/dashboard/new-delivery"
                  className="rounded-full px-4 py-3 text-center text-sm font-semibold"
                  style={{
                    background: "hsl(var(--primary))",
                    color: "var(--primary-foreground)",
                    boxShadow: "var(--glow-primary)",
                  }}
                >
                  Get a Quote
                </NavLink>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
