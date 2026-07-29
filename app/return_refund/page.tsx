import { ShieldCheck, PackageCheck, ClipboardCheck, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Refund & Return Policy | Artiory",
  description:
    "Read Artiory's Refund & Return Policy for purchases made through our website.",
};

export default function RefundReturnPage() {
  return (
    <main className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 py-20">
      {/* Background Decoration */}
      <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-indigo-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Hero */}
        <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-black text-white shadow-2xl">
          <div className="px-8 py-12 md:px-12 md:py-16">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
              <ShieldCheck className="mr-2 h-4 w-4" />
              Customer Protection Policy
            </span>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-5xl">
              Refund & Return Policy
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
              Thank you for shopping with us. We are committed to providing
              high-quality products for children.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl md:p-12">
          <div className="space-y-10">
            {/* Section 1 */}
            <div className="flex gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                <PackageCheck className="h-6 w-6" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  No Return & No Refund
                </h2>

                <p className="mt-4 leading-8 text-slate-600">
                  Due to the nature of the products we sell, including crayons,
                  coloring supplies, art materials, educational products, and
                  kids' toys, all sales are final. For hygiene, safety, and
                  quality assurance reasons, we do not accept returns,
                  exchanges, or provide refunds once an order has been
                  delivered.
                </p>
              </div>
            </div>

            <div className="border-t" />

            {/* Section 2 */}
            <div className="flex gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                <ShieldCheck className="h-6 w-6" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Why This Policy Exists
                </h2>

                <p className="mt-4 leading-8 text-slate-600">
                  Many of our products are intended for children's use and
                  cannot be resold or reused after the packaging has been opened
                  or handled. To ensure every customer receives brand-new,
                  unused products, we maintain a strict no-return and no-refund
                  policy.
                </p>
              </div>
            </div>

            <div className="border-t" />

            {/* Section 3 */}
            <div className="flex gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                <ClipboardCheck className="h-6 w-6" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Before Placing Your Order
                </h2>

                <p className="mt-4 leading-8 text-slate-600">
                  We encourage customers to carefully review the product
                  descriptions, specifications, colors, sizes, and images before
                  placing an order. If you have any questions about a product,
                  please contact our customer support team before making your
                  purchase.
                </p>
              </div>
            </div>

            <div className="border-t" />

            {/* Section 4 */}
            <div className="flex gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                <AlertTriangle className="h-6 w-6" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Replacement Eligibility
                </h2>

                <p className="mt-4 leading-8 text-slate-600">
                  Products reported after the specified time period or damaged
                  due to misuse, improper handling, or normal wear and tear will
                  not be eligible for replacement or compensation.
                </p>
              </div>
            </div>

            {/* Notice */}
            <div className="rounded-3xl border border-red-200 bg-gradient-to-r from-red-50 to-orange-50 p-8">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-red-600 p-3 text-white">
                  <AlertTriangle className="h-6 w-6" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Customer Agreement
                  </h3>

                  <p className="mt-4 leading-8 text-slate-700">
                    By placing an order on our website, you acknowledge that you
                    have read, understood, and agreed to this Refund & Return
                    Policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}