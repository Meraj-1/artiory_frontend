import React from "react";

const sections = [
  { id: "information-we-collect", title: "Information We Collect", index: "01" },
  { id: "how-we-collect", title: "How We Collect Information", index: "02" },
  { id: "use-of-information", title: "Use of Your Personal Information", index: "03" },
  { id: "sharing", title: "Sharing of Information", index: "04" },
  { id: "email-opt-out", title: "Email Opt-Out", index: "05" },
  { id: "return-refund", title: "Return & Refund Policy", index: "06" },
  { id: "third-party", title: "Third-Party Websites", index: "07" },
  { id: "grievance", title: "Grievance Officer", index: "08" },
  { id: "updates", title: "Updates to this Policy", index: "09" },
  { id: "jurisdiction", title: "Jurisdiction", index: "10" }
];

function Section({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 group">
      <div className="flex items-start gap-6 mb-6">
        <span className="text-[11px] font-mono text-gray-600 pt-1 select-none tracking-widest">
          {index}
        </span>
        <h2 className="text-[1.35rem] font-semibold text-gray-900 tracking-tight leading-snug">
          {title}
        </h2>
      </div>
      <div className="pl-10 text-[0.9375rem] text-gray-500 leading-[1.85] space-y-4">
        {children}
      </div>
      <div className="mt-10 border-b border-dashed border-gray-100" />
    </section>
  );
}

function Sub({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-gray-400 mt-6 mb-2">
      {children}
    </p>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <svg
            className="mt-[6px] shrink-0 text-gray-600"
            width="6"
            height="6"
            viewBox="0 0 6 6"
            fill="currentColor"
          >
            <rect width="6" height="6" />
          </svg>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Notice({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-gray-900 pl-4 py-1 mt-4">
      <p className="text-[0.875rem] font-medium text-gray-800">{children}</p>
    </div>
  );
}

function InfoCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 border border-gray-200 rounded-none px-5 py-4 bg-white">
      <div className="text-gray-400">{icon}</div>
      <div>
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-gray-400 mb-0.5">
          {label}
        </p>
        <p className="text-[0.9375rem] font-medium text-gray-900">{value}</p>
      </div>
    </div>
  );
}

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
);

export default function Page() {
  return (
    <div className="min-h-screen bg-white">

      {/* Top bar */}
      <div className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
          <span className="text-[0.7rem] font-mono tracking-[0.2em] uppercase text-gray-600">
            Legal Document
          </span>
          <span className="text-[0.7rem] font-mono tracking-[0.15em] text-gray-600">
            Last Updated — 10-03-2025
          </span>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-8 pt-16 pb-14 border-b border-gray-100">
        <a className="text-[0.7rem] font-mono tracking-[0.25em] uppercase text-gray-600 mb-5">
          www.artiory.com
        </a>
        <h1 className="text-5xl font-bold tracking-tight text-[#00b8a2] leading-none mb-8">
          Privacy<br />Policy
        </h1>
        <div className="max-w-xl space-y-3 text-[0.9375rem] text-gray-500 leading-[1.85]">
          <p>
            This Privacy Policy applies to{" "}
            <strong className="text-gray-700 font-medium">www.artiory.com</strong>.
            Artiory recognizes the importance of maintaining your privacy. We value
            your privacy and appreciate your trust in us. This policy describes how
            we treat user information collected on{" "}
            <strong className="text-gray-700 font-medium">https://www.artiory.com</strong>{" "}
            and other offline sources.
          </p>
          <p>
            This Privacy Policy applies to current and former visitors to our website
            and online customers. By visiting and/or using our website, you agree to
            this Privacy Policy.
          </p>
          <p>
            <strong className="text-gray-700 font-medium">www.artiory.com</strong> is
            a property of{" "}
            <strong className="text-gray-700 font-medium">Artiory</strong>, a company
            started by a father &amp; daughter.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-8 py-16 flex gap-16 items-start">

        {/* Sticky TOC */}
        <aside className="hidden xl:block w-56 shrink-0 sticky top-10">
          <p className="text-[0.65rem] font-mono tracking-[0.25em] uppercase text-gray-600 mb-5">
            Contents
          </p>
          <nav className="space-y-0.5">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex items-center gap-3 py-1.5 group/link"
              >
                <span className="text-[0.65rem] font-mono text-gray-200 group-hover/link:text-gray-400 transition-colors">
                  {s.index}
                </span>
                <span className="text-[0.8125rem] text-gray-400 group-hover/link:text-gray-900 transition-colors leading-snug">
                  {s.title}
                </span>
              </a>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 space-y-10">

          <Section id="information-we-collect" index="01" title="Information We Collect">
            <Sub>Contact Information</Sub>
            <p>
              We may collect your name, email address, mobile number, phone number,
              street address, city, state, PIN code, country, and IP address for
              delivery and customer support purposes.
            </p>

            {/* <Sub>Payment &amp; Billing Information</Sub>
            <p>
              We may collect your billing name, billing address and payment method
              when you place an order. 
              PhonePe, Cashfree or other trusted providers.
            </p> */}

            <Sub>Information You Post</Sub>
            <p>
              We collect information you post publicly on our website or on
              third-party social media platforms related to Artiory.
            </p>

            <Sub>Demographic Information</Sub>
            <p>
              We may collect demographic information, shopping preferences, products
              you purchase and other information voluntarily provided by you.
            </p>

            <Sub>Other Information</Sub>
            <List
              items={[
                "IP Address",
                "Browser Type",
                "Pages Visited",
                "Time Spent on Website",
                "Referral Website",
                "Device Type",
                "Operating System",
              ]}
            />
          </Section>

          <Section id="how-we-collect" index="02" title="How We Collect Information">
            <Sub>Information Collected Directly</Sub>
            <List
              items={[
                "When you place an order",
                "When you contact us",
                "When you subscribe to newsletters",
                "When you fill out forms",
                "When you leave reviews or comments",
              ]}
            />

            <Sub>Information Collected Automatically</Sub>
            <p>We use the following technologies:</p>
            <List
              items={[
                "Google Analytics",
                "Google Search Console",
                "Cookies",
                "Web Beacons",
              ]}
            />

            <Sub>Information from Third Parties</Sub>
            <p>
              If you interact with us through social media platforms or other
              integrated services, we may receive basic profile information such as
              your name and email address.
            </p>
          </Section>

          <Section id="use-of-information" index="03" title="Use of Your Personal Information">
            <List
              items={[
                "Process and deliver your orders.",
                "Respond to customer support requests.",
                "Improve our website, products and services.",
                "Personalize your shopping experience.",
                "Analyze website usage and customer interests.",
                "Prevent fraud and misuse.",
                "Send promotional offers and newsletters.",
                "Send order updates through Email, SMS and WhatsApp.",
                "Comply with applicable laws.",
              ]}
            />
          </Section>

          <Section id="sharing" index="04" title="Sharing of Information">
            <p>We may share your information with:</p>
            <List
              items={[
                "Payment gateway providers",
                "Delivery and logistics partners",
                "Technology service providers",
                "Marketing partners",
                "Government authorities when required by law",
              ]}
            />

            <p className="mt-4">We may also disclose information if:</p>
            <List
              items={[
                "Required by law.",
                "Necessary to investigate fraud.",
                "Business ownership changes due to merger or acquisition.",
              ]}
            />

            <Notice>
              We never sell your personal information to third parties.
            </Notice>
          </Section>

          <Section id="email-opt-out" index="05" title="Email Opt-Out">
            <p>
              You may unsubscribe from promotional emails at any time by emailing{" "}
              <strong className="text-gray-700 font-medium">contact@artiory.com</strong>{" "}
              with the subject line{" "}
              <strong className="text-gray-700 font-medium">&quot;Unsubscribe&quot;</strong>.
            </p>
            <p>
              Please allow up to 10 business days for processing. You may still
              receive transactional emails and order updates.
            </p>
          </Section>

          <Section id="return-refund" index="06" title="Return & Refund Policy">
            <p>Every product is carefully inspected and packed before dispatch.</p>

            <div className="grid sm:grid-cols-2 gap-px bg-gray-100 border border-gray-100 mt-4">
              <div className="bg-white p-5">
                <p className="text-[0.7rem] font-mono tracking-[0.15em] uppercase text-gray-400 mb-2">
                  No Returns
                </p>
                <p className="text-[0.875rem] text-gray-600 leading-relaxed">
                  All purchases made through Artiory are final. We do not accept
                  returns.
                </p>
              </div>
              <div className="bg-white p-5">
                <p className="text-[0.7rem] font-mono tracking-[0.15em] uppercase text-gray-400 mb-2">
                  No Refunds for
                </p>
                <List
                  items={[
                    "Change of mind.",
                    "Incorrect product selection.",
                    "Used or damaged products after delivery.",
                    "Successfully delivered orders.",
                  ]}
                />
              </div>
            </div>

            <Sub>Damaged or Incorrect Products</Sub>
            <p>
              Contact us within 48 hours of delivery at{" "}
              <strong className="text-gray-700 font-medium">contact@artiory.com</strong>{" "}
              with your order details and product photographs.
            </p>

            <Sub>Order Cancellation</Sub>
            <p>
              Orders may only be cancelled before dispatch. Once shipped,
              cancellations are not possible.
            </p>
          </Section>

          <Section id="third-party" index="07" title="Third-Party Websites">
            <p>
              Our website may contain links to third-party websites. Once you leave
              Artiory, this Privacy Policy no longer applies. We encourage you to
              review the privacy policies of those websites.
            </p>
          </Section>

          <Section id="grievance" index="08" title="Grievance Officer">
            <div className="grid sm:grid-cols-2 gap-3 mt-2">
              <InfoCard label="Phone" value="+91 81085 61836" icon={<PhoneIcon />} />
              <InfoCard label="Email" value="contact@artiory.com" icon={<MailIcon />} />
            </div>
            <p className="mt-5">
              For any privacy-related concerns or complaints, please contact us
              using the details above.
            </p>
          </Section>

          <Section id="updates" index="09" title="Updates to this Privacy Policy">
            <p>
              This Privacy Policy may be updated from time to time to reflect changes
              in our business, legal requirements or website functionality.
            </p>
            <p className="text-[0.8125rem] text-gray-400 font-mono mt-2">
              Last Updated — 10-03-2025
            </p>
          </Section>

          <Section id="jurisdiction" index="10" title="Jurisdiction">
            <p>
              Your use of www.artiory.com and any dispute arising from it shall be governed by and construed in accordance with the laws of India.

Any disputes, claims, or legal proceedings arising out of or relating to the use of this website, its products, or services shall be subject to the exclusive jurisdiction of the Hon'ble High Court of Bombay and the courts subordinate to it, and all parties hereby submit to the jurisdiction of such courts.
            </p>
          </Section>

        </main>
      </div>

      {/* Footer rule */}
      <div className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-8 py-6 flex items-center justify-between">
          <span className="text-[0.7rem] font-mono tracking-[0.2em] uppercase text-gray-600">
            Artiory — Privacy Policy
          </span>
          <span className="text-[0.7rem] font-mono text-gray-600">
            © {new Date().getFullYear()} Artiory. All rights reserved.
          </span>
        </div>
      </div>

    </div>
  );
}
