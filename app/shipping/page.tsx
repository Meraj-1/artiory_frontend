export const metadata = {
  title: "Shipping Policy | Artiory",
  description:
    "Read Artiory's Shipping Policy for order processing, delivery timelines, shipping charges, and more.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-black text-white shadow-2xl">
          <div className="px-8 py-12 md:px-12 md:py-16">
            <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
              Shipping Policy
            </span>

            <h1 className="mt-5 text-4xl font-extrabold md:text-5xl">
              Shipping Policy
            </h1>

            <p className="mt-4 text-lg text-slate-300">
              Last Updated: 10-03-2025
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl md:p-12">
          <div className="space-y-10 text-slate-700 leading-8">
            <p>
              Thank you for shopping with Artiory. We are committed to
              delivering your orders safely and efficiently. Please read our
              Shipping Policy carefully before placing an order on{" "}
              <strong>www.artiory.com</strong>.
            </p>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                1. Order Processing
              </h2>

              <ul className="list-disc space-y-2 pl-6">
                <li>Orders are shipped after successful payment confirmation.</li>
                <li>
                  Orders are generally processed within 1–3 business days,
                  excluding Sundays and public holidays.
                </li>
                <li>
                  During sale periods, festive seasons, or high order volumes,
                  order processing may take additional time.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                2. Shipping Coverage
              </h2>

              <ul className="list-disc space-y-2 pl-6">
                <li>Artiory currently delivers products across India.</li>
                <li>We do not currently offer international shipping.</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                3. Delivery Timeline
              </h2>

              <p>Estimated delivery timelines are</p>

              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>Metro Cities: 2–5 business days</li>
                <li>Tier 2 & Tier 3 Cities: 3–7 business days</li>
                <li>Remote Locations: 5–10 business days</li>
              </ul>

              <p className="mt-5">
                Delivery timelines are estimates only and may vary depending on
                your location and courier operations.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                4. Shipping Charges
              </h2>

              <ul className="list-disc space-y-2 pl-6">
                <li>
                  Shipping charges, if applicable, will be displayed during
                  checkout before payment.
                </li>
                <li>
                  Free shipping offers may be available on selected products or
                  promotional campaigns and will be communicated on the website.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                5. Order Tracking
              </h2>

              <p>
                Once your order has been shipped, you will receive the shipment
                details, including a tracking number, via email, SMS, or
                WhatsApp (where applicable). You may track your shipment
                directly through the courier partner's tracking portal.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                6. Delivery Partners
              </h2>

              <p>
                Artiory works with trusted logistics partners to ensure timely
                and secure deliveries across India.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                7. Customer Responsibilities
              </h2>

              <p>
                Customers are responsible for providing accurate shipping
                information, including:
              </p>

              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>Full Name</li>
                <li>Mobile Number</li>
                <li>Complete Shipping Address</li>
                <li>City</li>
                <li>State</li>
                <li>PIN Code</li>
              </ul>

              <p className="mt-5">
                Artiory shall not be responsible for delays, failed deliveries,
                or additional shipping charges resulting from incorrect or
                incomplete address details provided by the customer.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                8. Delivery Attempts
              </h2>

              <p>
                Our logistics partners will attempt delivery as per their
                standard delivery policy. If delivery cannot be completed
                because:
              </p>

              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>the customer is unavailable,</li>
                <li>the delivery address is incorrect,</li>
                <li>or the shipment is refused,</li>
              </ul>

              <p className="mt-5">
                The order may be returned to Artiory. Re-shipping charges, if
                applicable, shall be borne by the customer.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                9. Delayed Deliveries
              </h2>

              <p>
                While we strive to deliver all orders within the estimated
                timelines, delays may occur due to circumstances beyond our
                control, including but not limited to:
              </p>

              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>Weather conditions</li>
                <li>Natural disasters</li>
                <li>Public holidays</li>
                <li>Government restrictions</li>
                <li>Transport disruptions</li>
                <li>Courier operational delays</li>
                <li>Force majeure events</li>
              </ul>

              <p className="mt-5">
                Artiory shall not be held liable for such delays.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                10. Damaged or Incorrect Deliveries
              </h2>

              <p>If you receive:</p>

              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>A damaged product</li>
                <li>An incorrect product</li>
                <li>A package that appears tampered with</li>
              </ul>

              <p className="mt-5">
                Please contact us within 48 hours of delivery by emailing
                <strong> contact@artiory.com </strong>
                with:
              </p>

              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>Your Order Number</li>
                <li>Photographs of the product</li>
                <li>Photographs of the outer packaging</li>
              </ul>

              <p className="mt-5">
                Our team will review the issue and provide an appropriate
                resolution, where applicable.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                11. Order Cancellation
              </h2>

              <p>
                Orders may only be cancelled before they are dispatched. Once
                an order has been shipped, cancellation requests cannot be
                accepted.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                12. Return & Refund
              </h2>

              <p>
                Shipping charges, where applicable, are non-refundable unless
                the return or refund is approved due to an error on Artiory's
                part, such as dispatching an incorrect or damaged product. For
                complete details, please refer to our Return & Refund Policy.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                13. Contact Us
              </h2>

              <p>For any shipping-related queries, please contact us:</p>

              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <p>
                  <strong>Email:</strong> contact@artiory.com
                </p>

                <p className="mt-2">
                  <strong>Phone:</strong> +91 81085 61836
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                14. Changes to this Shipping Policy
              </h2>

              <p>
                Artiory reserves the right to modify this Shipping Policy at any
                time without prior notice. Updated versions will be published on
                <strong> www.artiory.com</strong>, and continued use of the
                website constitutes acceptance of the revised policy.
              </p>
            </section>

            <div className="rounded-2xl border border-slate-200 bg-slate-100 p-6 text-center">
              <p className="font-semibold text-slate-900">
                Last Updated: 10-03-2025
              </p>

              <p className="mt-3 text-slate-700">
                Disclaimer: This is a temporary shipping policy and may be
                updated as Artiory's logistics operations, delivery partners,
                website functionality, and business requirements evolve.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}