import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Logo from "../../assets/logo.png";
import { ChevronRight, Globe, Menu, X } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const navUnderlineBase =
    "relative inline-flex items-center text-sm font-medium transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100";

  const navLinks = useMemo(
    () => [
      { name: "Solutions", path: "/#solutions" },
      { name: "About", path: "/about" },
      { name: "Resources", path: "/resources" },
      { name: "Haul With Us", path: "/haul-with-us" },
      { name: "Support", path: "/support" },
      { name: "Contact", path: "/contact" },
    ],
    [],
  );

  // lock body scroll on mobile menu
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.hash]);
  // smooth scroll for hash routes
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");
    if (!id) return;

    const scroll = () => {
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    requestAnimationFrame(() => requestAnimationFrame(scroll));
  }, [location.pathname, location.hash]);

  const headerStyle: React.CSSProperties = {
    background:
      "linear-gradient(180deg, hsl(var(--background) / 0.92) 0%, hsl(var(--background) / 0.70) 100%)",
    borderBottom: "1px solid var(--border-soft)",
    backdropFilter: "blur(14px)",
  };

  const chipStyle: React.CSSProperties = {
    background: "hsl(var(--card) / 0.65)",
    border: "1px solid var(--border-soft)",
    color: "var(--text-primary)",
    boxShadow: "var(--shadow-card)",
    backdropFilter: "blur(10px)",
  };

  const ghostBtnStyle: React.CSSProperties = {
    border: "1px solid var(--border-soft)",
    background: "hsl(var(--card) / 0.65)",
    color: "var(--text-primary)",
    boxShadow: "var(--shadow-card)",
  };

  const primaryBtnStyle: React.CSSProperties = {
    background: "hsl(var(--primary))",
    color: "var(--primary-foreground)",
    boxShadow: "var(--glow-primary)",
  };

  const activePill = (active: boolean): React.CSSProperties =>
    active
      ? {
          background: "hsl(var(--primary) / 0.14)",
          border: "1px solid hsl(var(--primary) / 0.25)",
          color: "var(--text-primary)",
        }
      : {
          background: "transparent",
          border: "1px solid transparent",
          color: "var(--text-secondary)",
        };

  const handleNav = (path: string) => {
    if (path.startsWith("/#")) {
      const hash = path.replace("/", "");
      if (location.pathname !== "/") {
        navigate("/" + hash);
      } else {
        navigate(hash);
      }
      return;
    }
    navigate(path);
  };

  const mobileMenu = (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ background: "rgba(0,0,0,0.55)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          <motion.aside
            className="fixed top-0 right-0 left-auto z-50 lg:hidden h-full w-[90vw] max-w-sm"
            style={{
              background: "hsl(var(--background) / 0.98)",
              borderLeft: "1px solid var(--border-soft)",
              boxShadow: "var(--shadow-strong)",
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <div
              className="h-16 px-4 flex items-center justify-between"
              style={{ borderBottom: "1px solid var(--border-soft)" }}
            >
              <NavLink
                to="/"
                className="flex items-center"
                aria-label="Go to home"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <img src={Logo} alt="Digital Delivery" className="w-50" />
              </NavLink>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="grid place-items-center rounded-full h-10 w-10"
                aria-label="Close menu"
                style={ghostBtnStyle}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4">
              <div
                className="flex items-center justify-between rounded-2xl px-4 py-3"
                style={chipStyle}
              >
                <div
                  className="flex items-center gap-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <Globe className="h-4 w-4" />
                  <span className="text-sm font-medium">US</span>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    EN
                  </span>
                </div>
              </div>

              <nav className="mt-4">
                <ul className="space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={`${link.name}-${link.path}`}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 12 }}
                      transition={{
                        duration: 0.25,
                        delay: 0.05 + index * 0.05,
                      }}
                    >
                      <NavLink
                        to={link.path}
                        onClick={(e) => {
                          if (link.path.startsWith("/#")) {
                            e.preventDefault();
                            handleNav(link.path);
                          }
                          setIsMobileMenuOpen(false);
                        }}
                        className="block rounded-2xl px-4 py-3 text-sm font-semibold transition"
                        style={({ isActive }) => ({
                          ...(isActive ? activePill(true) : activePill(false)),
                          background: isActive
                            ? "hsl(var(--primary) / 0.14)"
                            : "transparent",
                        })}
                      >
                        <div className="flex items-center justify-between">
                          <span>{link.name}</span>
                          <ChevronRight
                            className="h-4 w-4"
                            style={{ color: "var(--text-tertiary)" }}
                          />
                        </div>
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="mt-6 grid gap-2">
                {isAuthenticated ? (
                  <NavLink
                    to="/dashboard"
                    className="rounded-full px-4 py-3 text-center text-sm font-semibold transition"
                    style={ghostBtnStyle}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </NavLink>
                ) : (
                  <NavLink
                    to="/login"
                    className="rounded-full px-4 py-3 text-center text-sm font-semibold transition"
                    style={ghostBtnStyle}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </NavLink>
                )}

                <NavLink
                  to="/dashboard/new-delivery"
                  className="rounded-full px-4 py-3 text-center text-sm text-nowrap font-semibold transition"
                  style={primaryBtnStyle}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get a Quote
                </NavLink>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <header className="sticky top-0 z-50 w-full" style={headerStyle}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <nav className="h-20 flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <NavLink to="/" className="flex items-center gap-3 shrink-0">
                <img
                  src={Logo}
                  alt="Digital Delivery"
                  className="w-50"
                  style={{ filter: "drop-shadow(0 1px 6px rgba(0,0,0,0.35))" }}
                />
              </NavLink>
            </motion.div>

            <div className="hidden lg:flex flex-1 justify-center">
              <ul className="flex items-center gap-8">
                {navLinks.map((link) => (
                  <li key={`${link.name}-${link.path}`}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        [navUnderlineBase, isActive && "after:scale-x-100"]
                          .filter(Boolean)
                          .join(" ")
                      }
                      style={({ isActive }) => ({
                        color: isActive
                          ? "var(--text-primary)"
                          : "var(--text-secondary)",
                      })}
                      onClick={(e) => {
                        if (link.path.startsWith("/#")) {
                          e.preventDefault();
                          handleNav(link.path);
                        }
                      }}
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 ml-auto">
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
                className="hidden sm:inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold"
                style={primaryBtnStyle}
              >
                Get a Quote
              </NavLink>

              <motion.button
                onClick={() => setIsMobileMenuOpen((v) => !v)}
                className="lg:hidden grid place-items-center rounded-full h-10 w-10"
                aria-label="Toggle menu"
                style={ghostBtnStyle}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </motion.button>
            </div>
          </nav>
        </div>
      </header>

      {typeof document !== "undefined" &&
        createPortal(mobileMenu, document.body)}
    </>
  );
};

export default Navbar;
