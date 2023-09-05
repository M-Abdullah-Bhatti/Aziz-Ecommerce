// import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (token: string) => {
  try {
    // const token = request.cookies.get("token")?.value || "";
    // const token = request.cookies.get("token")?.value || "";
    const decodedToken: any = jwt.verify(token, "abcdefgh91");
    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
