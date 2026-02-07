import Logo from "../../assets/logo.png";
const Footer = () => {
  return (
    <footer className="mt-20 bg-(--bg-primary) text-(--text-secondary)">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <img src={Logo} className="w-30" alt="" />
          <p className="text-sm">
            Reliable logistics and shipping solutions tailored to your needs.
          </p>
        </div>

        <div>
          <h4 className="text-(--text-primary) font-semibold mb-2">Company</h4>
          <ul className="text-sm space-y-1">
            <li>About</li>
            <li>Careers</li>
            <li>Blog</li>
          </ul>
        </div>

        <div>
          <h4 className="text-(--text-primary) font-semibold mb-2">Products</h4>
          <ul className="text-sm space-y-1">
            <li>Shipping</li>
            <li>Fulfilment</li>
            <li>Tracking</li>
          </ul>
        </div>

        <div>
          <h4 className="text-(--text-primary) font-semibold mb-2">Contact</h4>
          <p className="text-sm">support@DigitalLogistics.example</p>
          <p className="text-sm mt-2">+1 (555) 123-4567</p>
        </div>
      </div>

      <div className="border-t border-(--border-soft) mt-6">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-(--text-tertiary)">
          <div>
            © {new Date().getFullYear()} Digital Logistics. All rights reserved.
          </div>
          <div className="mt-3 md:mt-0">Privacy • Terms • Security</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
