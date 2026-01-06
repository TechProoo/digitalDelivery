import Logo from "../../assets/logo.png";
import { MoveRight } from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "How it works", path: "/how-it-works" },
    // { name: "Track Shipment", path: "/track-shipment" },
    { name: "Contact", path: "/contact" },
  ];
  return (
    <div className="navbar_container px-10">
      <div className="navbar">
        <div className="w-full flex justify-between items-center">
          <div className="nav_logo">
            <img className="w-100" src={Logo} alt="" />
          </div>
          <div className="nav_list">
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
        </div>
      </div>
    </div>
  );
};

export default Navbar;
