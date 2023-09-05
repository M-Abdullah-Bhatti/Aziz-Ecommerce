import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
  });
}
