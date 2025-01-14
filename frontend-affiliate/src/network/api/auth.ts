import errorHandling from "@/lib/errorHandling";
import { parseStringify } from "@/lib/utils";
import { AuthUser } from "@/models/authUser";
import api from "@/app/api/axiosInstance";
import { NextResponse } from "next/server";

export async function authGoogle(credentials: SignUpValues, encode: string) {
  try {
    const response = await api.post<AuthUser>(
      `/auth/google?roles=${encode}`,
      credentials
    );
    return parseStringify(response.data);
  } catch (error: any) {
    errorHandling.handle(NextResponse, error.message);
  }
}
