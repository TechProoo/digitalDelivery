import { useState, useEffect } from "react";
import Logo from "../../assets/logo.png";
import { MoveRight, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "How it works", path: "/how-it-works" },
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

  return (
    <>
      <div className="navbar_container px-4 sm:px-6 lg:px-10">
        <div className="navbar">
          <div className="w-full flex justify-between items-center">
            {/* Logo */}
            <div className="nav_logo">
              <img className="w-100" src={Logo} alt="Digital Logistics Logo" />
            </div>

            {/* Desktop Navigation */}
            <div className="nav_list hidden lg:block">
              <ul>
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `nav_links${isActive ? " active" : ""}`
                      }
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <span className="nav_icon_wrapper">
                        <MoveRight size={25} />
                      </span>
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label="Toggle menu"
              style={{ color: "var(--text-primary)" }}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Mobile Menu Panel */}
          <div
            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] z-50 lg:hidden transition-transform duration-300"
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderLeft: "1px solid var(--border-medium)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            {/* Menu Header */}
            <div
              className="flex items-center justify-between p-4 border-b"
              style={{ borderColor: "var(--border-medium)" }}
            >
              <h2
                className="text-lg font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                Menu
              </h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-accent transition-colors"
                aria-label="Close menu"
                style={{ color: "var(--text-primary)" }}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Menu Items */}
            <nav className="p-4">
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <NavLink
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `nav_links block py-3 px-4 rounded-lg text-(--text-primary) transition-all${
                          isActive ? " active" : ""
                        }`
                      }
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                      }}
                    >
                      <span className="nav_icon_wrapper">
                        <MoveRight size={20} />
                      </span>
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
