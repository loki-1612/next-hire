import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://remotive.com/api/remote-jobs", {
      next: { revalidate: 3600 }, // ✅ Cache for 1 hour instead of no-store
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch jobs" },
        { status: res.status }, // ✅ Return actual status code, not always 500
      );
    }

    const data = await res.json();

    if (!data.jobs || !Array.isArray(data.jobs)) {
      return NextResponse.json([], { status: 200 }); // ✅ Guard against bad API response shape
    }

    return NextResponse.json(data.jobs);
  } catch (error) {
    console.error("Jobs API error:", error); // ✅ Log for debugging
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
