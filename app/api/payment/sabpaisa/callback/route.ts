import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_BASE_URL || "https://api.artiory.com";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let bodyData: any;
    let isForm = false;

    if (contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await req.formData();
      const params = new URLSearchParams();
      formData.forEach((value, key) => {
        params.append(key, value.toString());
      });
      bodyData = params.toString();
      isForm = true;
    } else {
      bodyData = await req.json().catch(() => ({}));
    }

    console.log("SabPaisa Proxy Callback Requesting:", `${API_BASE_URL}/api/payment/sabpaisa/callback`);

    // Proxy the request to the backend callback endpoint
    const res = await fetch(`${API_BASE_URL}/api/payment/sabpaisa/callback`, {
      method: "POST",
      headers: {
        "Content-Type": isForm ? "application/x-www-form-urlencoded" : "application/json",
      },
      body: isForm ? bodyData : JSON.stringify(bodyData),
      redirect: "manual", // Intercept 302/301 redirects
    });

    const redirectUrl = res.headers.get("location");
    console.log("SabPaisa Proxy Callback Redirecting user to:", redirectUrl);

    if (redirectUrl) {
      return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.redirect(`${req.nextUrl.origin}/checkout/status?status=error&message=NoRedirect`);
  } catch (error) {
    console.error("Sabpaisa callback proxy error:", error);
    return NextResponse.redirect(`${req.nextUrl.origin}/checkout/status?status=error&message=ProxyError`);
  }
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams.toString();
    console.log("SabPaisa Proxy Callback GET Requesting:", `${API_BASE_URL}/api/payment/sabpaisa/callback?${searchParams}`);

    const res = await fetch(`${API_BASE_URL}/api/payment/sabpaisa/callback?${searchParams}`, {
      method: "GET",
      redirect: "manual",
    });

    const redirectUrl = res.headers.get("location");
    console.log("SabPaisa Proxy Callback GET Redirecting user to:", redirectUrl);

    if (redirectUrl) {
      return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.redirect(`${req.nextUrl.origin}/checkout/status?status=error&message=NoRedirect`);
  } catch (error) {
    console.error("Sabpaisa callback GET proxy error:", error);
    return NextResponse.redirect(`${req.nextUrl.origin}/checkout/status?status=error&message=ProxyError`);
  }
}
