import { NextRequest, NextResponse } from "next/server";
import Order from "../../../models/orderModel";
import { getDataFromToken } from "@/utils/getDataFromToken";
// import { useId } from "react";
export async function POST(request: NextRequest) {
  // const userID = await getDataFromToken(request);
  // const orders = await Order.find({ user: userID });
  const reqBody = await request.json();

  const order = await Order.create(reqBody);

  return NextResponse.json({
    success: true,
    order,
  });
}
