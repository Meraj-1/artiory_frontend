"use client";
import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Londrina_Solid } from "next/font/google";
import { useCart } from "@/app/context/cart/Cartcontext";

const londrina = Londrina_Solid({
  weight: ["100", "300", "400", "900"],
  subsets: ["latin"],
  display: "swap",
});

function StatusContent() {
  const { dispatch } = useCart();
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "pending";
  const orderId = searchParams.get("orderId") || "N/A";
  const txnId = searchParams.get("txnId") || "N/A";
  const amount = searchParams.get("amount") || "N/A";

  const isSuccess = status === "paid" || status === "success";
  const isFailed = status === "failed" || status === "error";

  React.useEffect(() => {
    if (isSuccess) {
      dispatch({ type: "CLEAR_CART" });
    }
  }, [isSuccess, dispatch]);

  return (
    <div className="max-w-md w-full border border-gray-200 rounded-3xl p-8 shadow-xl text-center bg-white space-y-6">
      {isSuccess && (
        <>
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-500 text-4xl">
            ✓
          </div>
          <h2 className={`${londrina.className} text-3xl font-bold text-emerald-600`}>Payment Successful!</h2>
          <p className="text-gray-500 text-sm">
            Thank you for your purchase. Your order has been placed and paid successfully.
          </p>
        </>
      )}

      {isFailed && (
        <>
          <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto text-rose-500 text-4xl">
            ✕
          </div>
          <h2 className={`${londrina.className} text-3xl font-bold text-rose-500`}>Payment Failed</h2>
          <p className="text-gray-500 text-sm">
            Unfortunately, your transaction could not be processed. Please try again or choose another payment method.
          </p>
        </>
      )}

      {!isSuccess && !isFailed && (
        <>
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto text-amber-500 text-4xl">
            ⌛
          </div>
          <h2 className={`${londrina.className} text-3xl font-bold text-amber-500`}>Payment Pending</h2>
          <p className="text-gray-500 text-sm">
            Your payment is currently processing. We will notify you once the status updates.
          </p>
        </>
      )}

      <div className="border-t border-dashed border-gray-200 pt-6 space-y-3 text-left text-sm text-gray-600">
        <div className="flex justify-between">
          <span className="font-medium text-[#2e306a]">Order ID:</span>
          <span className="font-mono text-gray-800">{orderId}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-[#2e306a]">Transaction ID:</span>
          <span className="font-mono text-gray-800">{txnId}</span>
        </div>
        {amount !== "N/A" && (
          <div className="flex justify-between">
            <span className="font-medium text-[#2e306a]">Amount Paid:</span>
            <span className="font-bold text-gray-900">₹{amount}</span>
          </div>
        )}
      </div>

      <div className="pt-4 flex flex-col gap-3">
        <Link
          href="/"
          className="w-full bg-[#00b8a2] hover:bg-[#009e8b] text-white font-semibold rounded-xl py-3 transition text-center"
        >
          Continue Shopping
        </Link>
        <Link
          href="/checkout"
          className="w-full border border-gray-300 hover:bg-gray-50 text-gray-600 font-semibold rounded-xl py-3 transition text-center"
        >
          Retry Order
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutStatusPage() {
  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <Suspense fallback={
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
          <p className="text-gray-500 text-sm">Loading status...</p>
        </div>
      }>
        <StatusContent />
      </Suspense>
    </section>
  );
}
