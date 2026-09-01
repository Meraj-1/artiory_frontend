import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { createBackendToken, getTargetBackendUrl } from "@/lib/auth";

const API_BASE_URL = getTargetBackendUrl();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ success: true, cart: [] }, { status: 200 });
    }

    const token = createBackendToken(session.user);

    const res = await fetch(`${API_BASE_URL}/api/users/cart`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      const text = await res.text();
      console.error(`Cart Proxy GET: Backend returned non-JSON response (status ${res.status}):`, text.slice(0, 500));
      return NextResponse.json({ success: true, cart: [] }, { status: 200 });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Cart proxy GET error:", error);
    return NextResponse.json({ success: true, cart: [] }, { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const token = createBackendToken(session.user);
    const body = await req.json();

    const res = await fetch(`${API_BASE_URL}/api/users/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      const text = await res.text();
      console.error(`Cart Proxy POST: Backend returned non-JSON response (status ${res.status}):`, text.slice(0, 500));
      return NextResponse.json({ success: false, message: "Backend error" }, { status: 200 });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Cart proxy POST error:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 200 });
  }
}
