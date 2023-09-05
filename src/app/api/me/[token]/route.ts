import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "../../../../dbConfig/connectDb";
import User from "../../../../models/userModel";
import { getDataFromToken } from "../../../../utils/getDataFromToken";

connectDb();
export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  const token = params.token;
  try {
    // const { token } = (request as any).query;
    console.log("token: ", token);
    const userID = await getDataFromToken(token);
    const userData = await User.findOne({ _id: userID }).select("-password");
    console.log(userData);
    return NextResponse.json({ message: "User found", data: userData });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
