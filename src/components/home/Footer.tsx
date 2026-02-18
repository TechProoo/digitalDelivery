import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
const Footer = () => {
  return (
    <footer className="mt-20 bg-(--bg-primary) text-(--text-secondary)">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Link to="/" aria-label="Go to homepage">
            <img src={Logo} className="w-30" alt="Digital Delivery" />
          </Link>
          <p className="text-sm">
            Reliable logistics and shipping solutions tailored to your needs.
          </p>
        </div>

        <div>
          <h4 className="text-(--text-primary) font-semibold mb-2">Company</h4>
          <ul className="text-sm space-y-1">
            <li>
              <Link to="/about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link to="/articles" className="hover:underline">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-(--text-primary) font-semibold mb-2">Products</h4>
          <ul className="text-sm space-y-1">
            <li>
              <Link to="/shipping" className="hover:underline">
                Shipping
              </Link>
            </li>
            <li>
              <Link to="/fulfilment" className="hover:underline">
                Fulfilment
              </Link>
            </li>
            <li>
              <Link to="/tracking" className="hover:underline">
                Tracking
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-(--text-primary) font-semibold mb-2">Contact</h4>
          <a
            className="text-sm hover:underline"
            href="mailto:support@DigitalDelivery.example"
          >
            support@DigitalDelivery.example
          </a>
          <a
            className="text-sm mt-2 block hover:underline"
            href="tel:+15551234567"
          >
            +1 (555) 123-4567
          </a>
        </div>
      </div>

      <div className="border-t border-(--border-soft) mt-6">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-(--text-tertiary)">
          <div>
            © {new Date().getFullYear()} Digital Delivery. All rights reserved.
          </div>
          <div className="mt-3 md:mt-0 flex items-center gap-2">
            <Link to="/privacy" className="hover:underline">
              Privacy
            </Link>
            <span aria-hidden="true">•</span>
            <Link to="/terms" className="hover:underline">
              Terms
            </Link>
            <span aria-hidden="true">•</span>
            <Link to="/security" className="hover:underline">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
