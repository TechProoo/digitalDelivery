import { useState } from "react";
import { Building2, Clock, Headset, Mail, MapPin, Phone } from "lucide-react";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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

  const offices = [
    {
      city: "Lagos, Nigeria",
      address: "33, adeola street, oluti, amuwo odofin",
      phone: "+2348135699955",
      email: "support@digitaldelivery.org",
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{ background: "hsl(var(--background))" }}
    >
      <Navbar />

      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "radial-gradient(1200px 520px at 50% 0%, hsl(var(--primary) / 0.18), transparent 60%), linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--background)) 100%)",
          borderBottom: "1px solid var(--border-soft)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 pt-16 pb-14 text-center">
          <div className="flex justify-center">
            <span
              className="inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold"
              style={{
                background: "hsl(var(--card) / 0.65)",
                border: "1px solid var(--border-soft)",
                color: "var(--accent-teal)",
                boxShadow: "var(--shadow-card)",
                backdropFilter: "blur(10px)",
              }}
            >
              Contact Us
            </span>
          </div>

          <h1
            className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Get in <span style={{ color: "var(--accent-teal)" }}>Touch</span>
          </h1>

          <p
            className="mx-auto mt-4 max-w-2xl text-base sm:text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            Have questions about our services? Our team is here to help you find
            the perfect logistics solution.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-14">
        {/* Contact methods */}
        <section className="grid gap-6 md:grid-cols-3">
          <div
            className="rounded-2xl p-8"
            style={{
              background: "hsl(var(--card) / 0.55)",
              border: "1px solid var(--border-soft)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div
              className="grid place-items-center rounded-2xl"
              style={{
                width: 56,
                height: 56,
                background: "hsl(var(--background) / 0.35)",
                border: "1px solid var(--border-soft)",
                color: "var(--accent-teal)",
              }}
            >
              <Phone className="h-6 w-6" />
            </div>

            <div className="mt-6">
              <div
                className="text-lg font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                Call Us
              </div>
              <div
                className="mt-1 text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                Available 24/7
              </div>
              <a
                href="tel:+2348135699955"
                className="mt-4 inline-block font-semibold"
                style={{ color: "var(--accent-teal)" }}
              >
                +2348135699955
              </a>
            </div>
          </div>

          <div
            className="rounded-2xl p-8"
            style={{
              background: "hsl(var(--card) / 0.55)",
              border: "1px solid var(--border-soft)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div
              className="grid place-items-center rounded-2xl"
              style={{
                width: 56,
                height: 56,
                background: "hsl(var(--background) / 0.35)",
                border: "1px solid var(--border-soft)",
                color: "hsl(var(--success))",
              }}
            >
              <Mail className="h-6 w-6" />
            </div>

            <div className="mt-6">
              <div
                className="text-lg font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                Email Us
              </div>
              <div
                className="mt-1 text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                Response within 24 hours
              </div>
              <a
                href="mailto:support@digitaldelivery.org"
                className="mt-4 inline-block font-semibold"
                style={{ color: "hsl(var(--success))" }}
              >
                support@digitaldelivery.org
              </a>
            </div>
          </div>

          <div
            className="rounded-2xl p-8"
            style={{
              background: "hsl(var(--card) / 0.55)",
              border: "1px solid var(--border-soft)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div
              className="grid place-items-center rounded-2xl"
              style={{
                width: 56,
                height: 56,
                background: "hsl(var(--background) / 0.35)",
                border: "1px solid var(--border-soft)",
                color: "#8b5cf6",
              }}
            >
              <Headset className="h-6 w-6" />
            </div>

            <div className="mt-6">
              <div
                className="text-lg font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                Live Chat
              </div>
              <div
                className="mt-1 text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                Chat with our AI assistant
              </div>
              <a
                href="#send-message"
                className="mt-4 inline-flex items-center gap-2 font-semibold"
                style={{ color: "#8b5cf6" }}
              >
                Start Chat <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* Form + Offices */}
        <section className="mt-14 grid gap-10 lg:grid-cols-2">
          {/* Form */}
          <div>
            <h2
              className="text-3xl font-bold"
              style={{ color: "var(--text-primary)" }}
              id="send-message"
            >
              Send Us a Message
            </h2>

            <div
              className="mt-6 rounded-2xl p-8"
              style={{
                background: "hsl(var(--card) / 0.55)",
                border: "1px solid var(--border-soft)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      className="text-sm font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Full Name{" "}
                      <span style={{ color: "var(--accent-teal)" }}>*</span>
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="mt-2 w-full rounded-xl px-4 py-3 outline-none"
                      style={{
                        background: "hsl(var(--background) / 0.35)",
                        border: "1px solid var(--border-soft)",
                        color: "var(--text-primary)",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      className="text-sm font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Email{" "}
                      <span style={{ color: "var(--accent-teal)" }}>*</span>
                    </label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      className="mt-2 w-full rounded-xl px-4 py-3 outline-none"
                      style={{
                        background: "hsl(var(--background) / 0.35)",
                        border: "1px solid var(--border-soft)",
                        color: "var(--text-primary)",
                      }}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      className="text-sm font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Company
                    </label>
                    <input
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Your Company"
                      className="mt-2 w-full rounded-xl px-4 py-3 outline-none"
                      style={{
                        background: "hsl(var(--background) / 0.35)",
                        border: "1px solid var(--border-soft)",
                        color: "var(--text-primary)",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      className="text-sm font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Phone
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="mt-2 w-full rounded-xl px-4 py-3 outline-none"
                      style={{
                        background: "hsl(var(--background) / 0.35)",
                        border: "1px solid var(--border-soft)",
                        color: "var(--text-primary)",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Subject{" "}
                    <span style={{ color: "var(--accent-teal)" }}>*</span>
                  </label>
                  <input
                    name="subject"
                    value={(form as any).subject ?? ""}
                    onChange={(e) =>
                      setForm((s) => ({
                        ...(s as any),
                        subject: e.target.value,
                      }))
                    }
                    placeholder="How can we help?"
                    className="mt-2 w-full rounded-xl px-4 py-3 outline-none"
                    style={{
                      background: "hsl(var(--background) / 0.35)",
                      border: "1px solid var(--border-soft)",
                      color: "var(--text-primary)",
                    }}
                  />
                </div>

                <div>
                  <label
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Message{" "}
                    <span style={{ color: "var(--accent-teal)" }}>*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your logistics needs..."
                    rows={7}
                    className="mt-2 w-full rounded-xl px-4 py-3 outline-none"
                    style={{
                      background: "hsl(var(--background) / 0.35)",
                      border: "1px solid var(--border-soft)",
                      color: "var(--text-primary)",
                      resize: "vertical",
                    }}
                  />
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-xl px-6 py-3 font-semibold"
                    style={{
                      width: "100%",
                      background: "hsl(var(--primary))",
                      color: "hsl(var(--primary-foreground))",
                      boxShadow: "var(--glow-primary)",
                    }}
                  >
                    {submitting ? "Sending…" : "Send Message"}
                  </button>

                  {sent && (
                    <div
                      className="text-sm"
                      style={{ color: "var(--accent-teal)" }}
                    >
                      Thanks — we'll be in touch shortly.
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Offices + Hours */}
          <div>
            <h2
              className="text-3xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Our Offices
            </h2>

            <div className="mt-6 grid gap-5">
              {offices.map((o) => (
                <div
                  key={o.city}
                  className="rounded-2xl p-6"
                  style={{
                    background: "hsl(var(--card) / 0.55)",
                    border: "1px solid var(--border-soft)",
                    boxShadow: "var(--shadow-card)",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="grid place-items-center rounded-xl"
                      style={{
                        width: 44,
                        height: 44,
                        background: "hsl(var(--background) / 0.35)",
                        border: "1px solid var(--border-soft)",
                        color: "var(--accent-teal)",
                      }}
                    >
                      <Building2 className="h-5 w-5" />
                    </div>

                    <div className="flex-1">
                      <div
                        className="font-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {o.city}
                      </div>
                      <div
                        className="mt-1 text-sm"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {o.address}
                      </div>

                      <div
                        className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm"
                        style={{ color: "var(--accent-teal)" }}
                      >
                        <a
                          href={`tel:${o.phone.replace(/[^+\d]/g, "")}`}
                          className="inline-flex items-center gap-2"
                        >
                          <Phone className="h-4 w-4" /> {o.phone}
                        </a>
                        <a
                          href={`mailto:${o.email}`}
                          className="inline-flex items-center gap-2"
                          style={{ color: "var(--text-tertiary)" }}
                        >
                          <Mail className="h-4 w-4" /> {o.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div
                className="rounded-2xl p-6"
                style={{
                  background: "hsl(var(--card) / 0.55)",
                  border: "1px solid var(--border-soft)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="grid place-items-center rounded-xl"
                    style={{
                      width: 44,
                      height: 44,
                      background: "hsl(var(--background) / 0.35)",
                      border: "1px solid var(--border-soft)",
                      color: "hsl(var(--success))",
                    }}
                  >
                    <Clock className="h-5 w-5" />
                  </div>

                  <div className="flex-1">
                    <div
                      className="font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Business Hours
                    </div>

                    <div
                      className="mt-3 grid gap-2 text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <div className="flex items-center justify-between gap-6">
                        <span>Monday - Friday</span>
                        <span style={{ color: "var(--text-primary)" }}>
                          8:00 AM - 8:00 PM
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-6">
                        <span>Saturday</span>
                        <span style={{ color: "var(--text-primary)" }}>
                          9:00 AM - 5:00 PM
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-6">
                        <span>Sunday</span>
                        <span style={{ color: "var(--text-primary)" }}>
                          Closed
                        </span>
                      </div>
                      <div
                        style={{
                          borderTop: "1px solid hsl(var(--border) / 0.35)",
                          marginTop: 10,
                          paddingTop: 10,
                        }}
                      >
                        <div
                          className="inline-flex items-center gap-2"
                          style={{ color: "hsl(var(--success))" }}
                        >
                          <MapPin className="h-4 w-4" /> 24/7 Emergency Support
                          Available
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-14">
          <Footer />
        </div>
      </main>
    </div>
  );
}
