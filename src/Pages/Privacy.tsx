import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";

const LAST_UPDATED = "February 11, 2026";

const sections = [
  { id: "overview", title: "Overview" },
  { id: "data-we-collect", title: "Information We Collect" },
  { id: "how-we-use", title: "How We Use Information" },
  { id: "legal-basis", title: "Legal Basis" },
  { id: "sharing", title: "Sharing & Disclosure" },
  { id: "cookies", title: "Cookies & Tracking" },
  { id: "security", title: "Security" },
  { id: "retention", title: "Data Retention" },
  { id: "your-rights", title: "Your Rights" },
  { id: "children", title: "Children’s Privacy" },
  { id: "intl", title: "International Transfers" },
  { id: "updates", title: "Policy Updates" },
  { id: "contact", title: "Contact Us" },
];

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2
        className="text-xl sm:text-2xl font-bold tracking-tight"
        style={{ color: "var(--text-primary)" }}
      >
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-sm sm:text-base leading-relaxed">
        {children}
      </div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((t) => (
        <li key={t} className="flex gap-3">
          <span
            className="mt-2 h-1.5 w-1.5 rounded-full shrink-0"
            style={{ background: "hsl(var(--primary))" }}
          />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Privacy() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "hsl(var(--background))" }}
    >
      <Navbar />

      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "radial-gradient(1200px 520px at 50% 0%, hsl(var(--primary) / 0.18), transparent 60%), linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--background)) 100%)",
          borderBottom: "1px solid var(--border-soft)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 pt-16 pb-14 text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm"
            style={{
              background: "hsl(var(--card) / 0.55)",
              border: "1px solid var(--border-soft)",
              color: "var(--text-secondary)",
            }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: "hsl(var(--primary))" }}
            />
            <span>Last updated: {LAST_UPDATED}</span>
          </div>

          <h1
            className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Privacy Policy
          </h1>

          <p
            className="mx-auto mt-4 max-w-3xl text-base sm:text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            This Privacy Policy explains how we collect, use, share, and protect
            your information when you use our website, platforms, and logistics
            services. We’re committed to handling your data responsibly and
            transparently.
          </p>

          <div className="mx-auto mt-7 max-w-3xl">
            <div
              className="grid gap-3 sm:grid-cols-3 rounded-2xl p-4"
              style={{
                background: "hsl(var(--card) / 0.55)",
                border: "1px solid var(--border-soft)",
                boxShadow: "var(--shadow-card)",
                color: "var(--text-secondary)",
              }}
            >
              <div className="text-left">
                <p className="text-xs" style={{ opacity: 0.9 }}>
                  What this covers
                </p>
                <p
                  className="mt-1 font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Website + Services
                </p>
              </div>
              <div className="text-left">
                <p className="text-xs" style={{ opacity: 0.9 }}>
                  Data types
                </p>
                <p
                  className="mt-1 font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Contact, usage, shipping
                </p>
              </div>
              <div className="text-left">
                <p className="text-xs" style={{ opacity: 0.9 }}>
                  Your control
                </p>
                <p
                  className="mt-1 font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Access, delete, opt-out
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-14">
        <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
          {/* SIDEBAR NAV */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div
              className="rounded-2xl p-6"
              style={{
                background: "hsl(var(--card) / 0.55)",
                border: "1px solid var(--border-soft)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <h3
                className="text-sm font-semibold tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                Quick navigation
              </h3>

              <div className="mt-4 space-y-1">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="group flex items-center justify-between rounded-xl px-3 py-2 text-sm transition"
                    style={{
                      color: "var(--text-secondary)",
                      border: "1px solid transparent",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.border =
                        "1px solid var(--border-soft)";
                      (e.currentTarget as HTMLAnchorElement).style.background =
                        "hsl(var(--background) / 0.35)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.border =
                        "1px solid transparent";
                      (e.currentTarget as HTMLAnchorElement).style.background =
                        "transparent";
                    }}
                  >
                    <span>{s.title}</span>
                    <span
                      className="opacity-0 group-hover:opacity-100 transition text-xs"
                      style={{ color: "hsl(var(--primary))" }}
                    >
                      View
                    </span>
                  </a>
                ))}
              </div>

              <div
                className="mt-6 rounded-2xl p-4 text-sm"
                style={{
                  background: "hsl(var(--background) / 0.35)",
                  border: "1px solid var(--border-soft)",
                  color: "var(--text-secondary)",
                }}
              >
                <p
                  className="font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Quick summary
                </p>
                <BulletList
                  items={[
                    "We collect information you provide and some usage data to run our services.",
                    "We don’t sell your personal data.",
                    "You can request access, correction, or deletion where applicable.",
                  ]}
                />
              </div>
            </div>
          </aside>

          {/* MAIN CARD */}
          <div
            className="rounded-2xl p-6 sm:p-10"
            style={{
              background: "hsl(var(--card) / 0.55)",
              border: "1px solid var(--border-soft)",
              boxShadow: "var(--shadow-card)",
              color: "var(--text-secondary)",
            }}
          >
            <div className="space-y-10">
              <Section id="overview" title="Overview">
                <p>
                  This Privacy Policy applies to information collected through
                  our website, customer support channels, and logistics-related
                  services (including shipment booking, tracking, and account
                  management).
                </p>
                <p>
                  By using our services, you agree to the practices described in
                  this policy. If you do not agree, please discontinue use of
                  the website and services.
                </p>
              </Section>

              <Section id="data-we-collect" title="Information We Collect">
                <p>
                  We collect information in three main ways: (1) information you
                  provide, (2) information collected automatically, and (3)
                  information from service usage (like shipment details).
                </p>

                <h3
                  className="mt-4 text-base sm:text-lg font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Information you provide
                </h3>
                <BulletList
                  items={[
                    "Account details (name, email, phone number, business name).",
                    "Billing details (payment status, invoices; payment processing may be handled by third parties).",
                    "Support messages (when you contact us via forms, email, or chat).",
                  ]}
                />

                <h3
                  className="mt-6 text-base sm:text-lg font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Shipment & service information
                </h3>
                <BulletList
                  items={[
                    "Pickup and delivery addresses, shipment references, tracking updates.",
                    "Package metadata (weight, dimensions, declared category, customs-related notes).",
                    "Recipient contact details provided for delivery purposes.",
                  ]}
                />

                <h3
                  className="mt-6 text-base sm:text-lg font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Information collected automatically
                </h3>
                <BulletList
                  items={[
                    "Device and browser details, log data, IP address, and approximate location.",
                    "Usage analytics (pages visited, clicks, and time spent).",
                    "Cookies and similar technologies (see Cookies section).",
                  ]}
                />
              </Section>

              <Section id="how-we-use" title="How We Use Information">
                <p>We use collected information to:</p>
                <BulletList
                  items={[
                    "Provide and operate our logistics services (bookings, tracking, customer support).",
                    "Communicate service updates (delivery status, policy changes, security alerts).",
                    "Improve performance, reliability, and user experience of the website.",
                    "Prevent fraud, abuse, and security incidents.",
                    "Comply with legal obligations (e.g., customs documentation or tax requirements where applicable).",
                  ]}
                />

                <div
                  className="mt-5 rounded-2xl p-4"
                  style={{
                    background: "hsl(var(--background) / 0.35)",
                    border: "1px solid var(--border-soft)",
                  }}
                >
                  <p
                    className="font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    We do not sell personal information.
                  </p>
                  <p className="mt-1 text-sm sm:text-base">
                    We may share limited information with partners only when
                    it’s required to deliver services (e.g., carriers, payment
                    processors).
                  </p>
                </div>
              </Section>

              <Section id="legal-basis" title="Legal Basis">
                <p>
                  Where applicable, we process personal data based on one or
                  more of the following:
                </p>
                <BulletList
                  items={[
                    "Performance of a contract (to deliver requested services).",
                    "Legitimate interests (to secure, improve, and maintain the platform).",
                    "Consent (for optional marketing or non-essential cookies, where required).",
                    "Legal obligations (for compliance, record-keeping, or responding to lawful requests).",
                  ]}
                />
              </Section>

              <Section id="sharing" title="Sharing & Disclosure">
                <p>
                  We may share information with trusted third parties only when
                  necessary:
                </p>
                <BulletList
                  items={[
                    "Carriers and logistics partners (to fulfill pickup, transit, and delivery).",
                    "Payment providers (to process transactions and prevent fraud).",
                    "Analytics providers (to understand product usage and improve performance).",
                    "Legal and regulatory authorities (only when required by law).",
                  ]}
                />
                <p>
                  We require service providers to handle your information with
                  appropriate confidentiality and security measures.
                </p>
              </Section>

              <Section id="cookies" title="Cookies & Tracking">
                <p>
                  Cookies help us remember preferences, keep you signed in (if
                  applicable), and understand how the website is used.
                </p>
                <BulletList
                  items={[
                    "Essential cookies: required for core site functionality.",
                    "Performance cookies: help us measure and improve site performance.",
                    "Preference cookies: remember choices like language or layout.",
                  ]}
                />
                <p>
                  You can control cookies through your browser settings. Note
                  that disabling some cookies may affect certain site features.
                </p>
              </Section>

              <Section id="security" title="Security">
                <p>
                  We implement reasonable administrative, technical, and
                  organizational safeguards to protect information from
                  unauthorized access, loss, misuse, or alteration.
                </p>
                <BulletList
                  items={[
                    "Access controls and least-privilege practices where feasible.",
                    "Monitoring for suspicious activity and abuse prevention.",
                    "Secure handling of sensitive operations (e.g., payments via vetted providers).",
                  ]}
                />
                <p>
                  No method of transmission or storage is 100% secure, but we
                  work continuously to improve protections.
                </p>
              </Section>

              <Section id="retention" title="Data Retention">
                <p>
                  We keep personal information only as long as needed to provide
                  services, meet legal obligations, resolve disputes, and
                  enforce agreements.
                </p>
                <BulletList
                  items={[
                    "Account data: retained while your account is active (and for a reasonable period after).",
                    "Shipment records: retained for operational, audit, and compliance purposes where applicable.",
                    "Support messages: retained to improve support quality and resolve issues.",
                  ]}
                />
              </Section>

              <Section id="your-rights" title="Your Rights">
                <p>Depending on your location, you may have the right to:</p>
                <BulletList
                  items={[
                    "Request access to personal data we hold about you.",
                    "Request correction of inaccurate or incomplete data.",
                    "Request deletion (where legally permitted).",
                    "Object to certain processing or request restriction.",
                    "Withdraw consent (where processing is based on consent).",
                  ]}
                />
                <p>
                  To make a request, contact us using the details below. We may
                  need to verify your identity before fulfilling requests.
                </p>
              </Section>

              <Section id="children" title="Children’s Privacy">
                <p>
                  Our services are not intended for children under 13 (or the
                  minimum age required by local law). We do not knowingly
                  collect personal information from children.
                </p>
              </Section>

              <Section id="intl" title="International Transfers">
                <p>
                  If you access our services from outside the country where our
                  servers or partners operate, your information may be processed
                  across borders. We take steps to ensure appropriate safeguards
                  where required.
                </p>
              </Section>

              <Section id="updates" title="Policy Updates">
                <p>
                  We may update this policy from time to time to reflect
                  operational, legal, or regulatory changes. When we do, we will
                  revise the “Last updated” date at the top of this page.
                </p>
              </Section>

              <Section id="contact" title="Contact Us">
                <p>
                  If you have questions, concerns, or requests related to
                  privacy, contact our support team and we’ll respond as soon as
                  reasonably possible.
                </p>

                <div
                  className="mt-4 rounded-2xl p-5 sm:p-6"
                  style={{
                    background: "hsl(var(--background) / 0.35)",
                    border: "1px solid var(--border-soft)",
                  }}
                >
                  <p
                    className="font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Privacy requests
                  </p>
                  <p className="mt-1 text-sm sm:text-base">
                    Email:{" "}
                    <span style={{ color: "hsl(var(--primary))" }}>
                      support@yourdomain.com
                    </span>
                    <br />
                    Subject:{" "}
                    <span className="font-medium">“Privacy Request”</span>
                  </p>

                  <div className="mt-4 flex flex-col sm:flex-row gap-3">
                    <a
                      href="mailto:support@yourdomain.com?subject=Privacy%20Request"
                      className="inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition"
                      style={{
                        background: "hsl(var(--primary))",
                        color: "hsl(var(--primary-foreground))",
                      }}
                    >
                      Email Support
                    </a>
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition"
                      style={{
                        background: "transparent",
                        border: "1px solid var(--border-soft)",
                        color: "var(--text-primary)",
                      }}
                    >
                      Go to Contact Page
                    </a>
                  </div>
                </div>
              </Section>
            </div>

            {/* FOOTNOTE */}
            <div
              className="mt-10 pt-8 text-xs sm:text-sm"
              style={{
                borderTop: "1px solid var(--border-soft)",
                color: "var(--text-secondary)",
              }}
            >
              <p>
                Note: This privacy policy is provided for general informational
                purposes and may need adjustments to match your exact business
                processes and legal requirements in your operating regions.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
