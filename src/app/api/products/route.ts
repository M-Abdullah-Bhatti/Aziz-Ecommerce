import { connectDb } from "@/dbConfig/connectDb";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/productModel";
connectDb();

export async function GET(request: NextRequest) {
  try {
    const products = await Product.find();
    console.log("products are", products);
    return NextResponse.json({ message: "Products fetched", data: products });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
