import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Search } from "lucide-react";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import Cta from "../components/home/Cta";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setSubmitting(true);
    // Simulate async send
    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
      setForm({ name: "", email: "", company: "", phone: "", message: "" });
    }, 900);
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <div className="container mx-auto">
        <div className="services_container">
          <Navbar />
          <div className="hero_container md:p-10 p-3">
            <div className="hero_text">
              <div>
                <div className="badge_design">
                  Contact Us<span></span>
                </div>
              </div>

              <div className="hero_text">
                <h1 className="md:text-5xl text-4xl mt-5 header md:w-9/12">
                  Get in Touch with Digital Logistics{" "}
                </h1>
                <p className="mt-5 md:w-7/12">
                  Have questions about our services, need a shipping quote, or
                  want to discuss your logistics needs? Our team is ready to
                  provide the support and solutions you need.
                </p>
              </div>

              <div className="md:flex justify-between items-center mt-10">
                <div className="hero_input px-4 py-2 md:mt-0 mt-10 rounded-2xl sm:ml-0">
                  <div
                    className="hr_input flex items-center gap-2"
                    style={{ position: "relative" }}
                  >
                    <Search size={24} className="text-gray-300 mr-2" />
                    <input
                      type="text"
                      placeholder="Enter tracking number..."
                      className="bg-transparent outline-none border-none text-gray-300 placeholder-gray-400 w-full text-lg"
                      style={{ paddingLeft: 0 }}
                    />
                    <button className="rounded-md">Track</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <header className="mx-auto max-w-5xl py-12 text-center">
          <h1 className="text-4xl font-extrabold text-(--text-primary)">
            Get in touch
          </h1>
          <p className="mt-3 text-(--text-secondary) max-w-2xl mx-auto">
            Whether you need a quote, partnership info, or support — reach out
            and we'll respond promptly.
          </p>
        </header>

        <main className="mx-auto grid gap-8 lg:grid-cols-3 max-w-6xl">
          {/* Form */}
          <section className="lg:col-span-2">
            <div className="rounded-2xl bg-(--bg-secondary) border border-(--border-soft) p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-(--text-primary)">
                Contact us
              </h2>

              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full name"
                    className="w-full rounded-lg bg-(--bg-primary)/10 border border-(--border-soft) px-4 py-3 outline-none text-(--text-primary)"
                  />
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className="w-full rounded-lg bg-(--bg-primary)/10 border border-(--border-soft) px-4 py-3 outline-none text-(--text-primary)"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Company (optional)"
                    className="w-full rounded-lg bg-(--bg-primary)/10 border border-(--border-soft) px-4 py-3 outline-none text-(--text-primary)"
                  />
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone (optional)"
                    className="w-full rounded-lg bg-(--bg-primary)/10 border border-(--border-soft) px-4 py-3 outline-none text-(--text-primary)"
                  />
                </div>

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  rows={6}
                  className="w-full rounded-lg bg-(--bg-primary)/10 border border-(--border-soft) px-4 py-3 outline-none text-(--text-primary)"
                />

                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-md bg-(--accent-teal) px-6 py-3 font-medium text-(--bg-primary) shadow-sm"
                  >
                    {submitting ? "Sending…" : "Send message"}
                  </button>

                  {sent && (
                    <div className="text-sm text-(--accent-teal)">
                      Thanks — we'll be in touch shortly.
                    </div>
                  )}
                </div>
              </form>
            </div>
          </section>

          {/* Info panel */}
          <aside className="lg:col-span-1">
            <div className="rounded-2xl bg-(--bg-secondary) border border-(--border-soft) p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="rounded-md bg-(--bg-primary) p-2 text-(--accent-teal)">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm text-(--text-tertiary)">Email</div>
                  <div className="font-medium text-(--text-primary)">
                    hello@DigitalLogistics.com
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-start gap-3">
                <div className="rounded-md bg-(--bg-primary) p-2 text-(--accent-teal)">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm text-(--text-tertiary)">
                    Call / WhatsApp
                  </div>
                  <div className="font-medium text-(--text-primary)">
                    +234 801 234 5678
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-start gap-3">
                <div className="rounded-md bg-(--bg-primary) p-2 text-(--accent-teal)">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm text-(--text-tertiary)">Office</div>
                  <div className="font-medium text-(--text-primary)">
                    Lagos, Nigeria
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-(--border-soft) pt-4">
                <div className="text-sm text-(--text-secondary)">
                  Support hours
                </div>
                <div className="font-medium text-(--text-primary) flex items-center gap-2">
                  <Clock className="h-4 w-4" /> Mon — Fri, 8am — 6pm
                </div>
              </div>
            </div>
          </aside>
        </main>

        <div className="mt-12 md:m-10 m-5">
          <Cta />
        </div>

        <footer className="mt-8">
          <Footer />
        </footer>
      </div>
    </div>
  );
}
