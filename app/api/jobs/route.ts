import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://remotive.com/api/remote-jobs", {
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json([], { status: 500 });
    }

    const data = await res.json();

    return NextResponse.json(data.jobs);
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}
