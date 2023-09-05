import { connectDb } from "../../../dbConfig/connectDb";
import User from "../../../models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    const userExists = await User.findOne({ email });

    if (!userExists) {
      return NextResponse.json({
        error: "Email doesn't exists",
        status: 400,
      });
    }
    if (
      !userExists &&
      !(await bcryptjs.compare(password, userExists.password))
    ) {
      return NextResponse.json({
        error: "Invalid email or password",
        status: 400,
      });
    }

    //creating jwt token
    const tokenData = {
      id: userExists._id,
      username: userExists.name,
      password: userExists.password,
    };
    const token = await jwt.sign(tokenData, "abcdefgh91", {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "User logged in successfully!",
      success: true,
      user: userExists,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
connectDb();
