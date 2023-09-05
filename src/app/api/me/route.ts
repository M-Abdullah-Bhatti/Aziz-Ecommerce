import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "../../../dbConfig/connectDb";
import User from "../../../models/userModel";
import { getDataFromToken } from "../../../utils/getDataFromToken";

connectDb();
export async function GET(request: NextRequest) {
  try {
    const userID = await getDataFromToken(request);
    const userData = await User.findOne({ _id: userID }).select("-password");
    console.log(userData);
    return NextResponse.json({ message: "User found", data: userData });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
