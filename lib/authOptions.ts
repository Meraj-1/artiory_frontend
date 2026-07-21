import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"; 
import clientPromise from "@/lib/mongodb";
import type { NextAuthOptions } from "next-auth";
import { comparePasswords } from "@/lib/auth";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { email, password } = credentials;

        // Example: fetch user from Mongo and verify password
        const db = (await clientPromise).db();
        const user = await db.collection("users").findOne({ email });

        if (!user) return null;
        // verify password (bcrypt)
        const valid = await comparePasswords(password, user.passwordHash);
        if (!valid) return null;

        // return user object for session (must have id, name/email)
        return { 
          id: user._id.toString(), 
          email: user.email, 
          name: user.name, 
          image: user.image,
          number: user.number || "",
          gender: user.gender || ""
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        const userId = (user as { id?: string; _id?: string }).id || (user as { id?: string; _id?: string })._id || token.sub || "";
        token.id = userId;
        // Store additional fields in token
        token.number = (user as { number?: string }).number || "";
        token.gender = (user as { gender?: string }).gender || "";
      }
      
      // Handle session updates (when user updates profile)
      if (trigger === "update" && session) {
        token.number = session.number;
        token.gender = session.gender;
      }
      
      return token;
    },
    async session({ session, token }) {
      (session as { user: { id?: string; number?: string; gender?: string } }).user.id = token.id ?? token.sub;
      (session as { user: { id?: string; number?: string; gender?: string } }).user.number = token.number as string || "";
      (session as { user: { id?: string; number?: string; gender?: string } }).user.gender = token.gender as string || "";
      return session;
    }
  },
  pages: {
    signIn: "/auth/signin", // optional custom sign-in page
  },
};