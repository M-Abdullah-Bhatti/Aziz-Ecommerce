import { NextRequest, NextResponse } from "next/server";
import Order from "../../../../models/orderModel";
import { getDataFromToken } from "../../../../utils/getDataFromToken";

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  const token = params.token;

  try {
    console.log("token: ", token);

    const userID = await getDataFromToken(token);
    const orders = await Order.find({ userId: userID });
    return NextResponse.json({
      success: true,

      orders,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
