import { authOption } from "@/app/lib/auth";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
    };
  }
  interface User {
    id: string;
    name: string;
    email: string;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
  }
}
const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
