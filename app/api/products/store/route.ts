import { NextResponse } from "next/server";

import { getTargetBackendUrl } from "@/lib/auth";

const API_BASE_URL = getTargetBackendUrl();

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products/store`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        {
          error: "Failed to fetch products from backend",
          details: errorText,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Unable to load products",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
