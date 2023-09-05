import { connectDb } from "@/dbConfig/connectDb";
import Product from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  // we will use params to access the data passed to the dynamic route
  const productId = params.id;
  try {
    const productDetails = await Product.findById(productId);
    console.log("products are", productDetails);
    return NextResponse.json({
      message: "Products fetched",
      data: productDetails,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
connectDb();
