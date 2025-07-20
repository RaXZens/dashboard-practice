import { NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connection } from "./db";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}
export const authOption: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.debug("Trying to login with", credentials);
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const [rows] = await connection.query(
          "SELECT id, name, email, password from usersid WHERE email= ?",
          [credentials.email]
        );
        const user = (rows as User[])[0];

        if (!user || !user.password) {
          return null;
        }

        const isPasswordVaild = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordVaild) {
          console.debug("Password incorrect");
          return null;
        }

        if (isPasswordVaild) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        }
        return null;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
