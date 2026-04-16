// lib/auth.ts
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// Update this line to use the new package name:
import { MongoDBAdapter } from "@auth/mongodb-adapter"; 
import clientPromise from "./mongodb-client";

export const authOptions: NextAuthOptions = {
  // Pass the clientPromise directly
  adapter: MongoDBAdapter(clientPromise),
  
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },
  
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async session({ session, token }) {
      // Safely extending the session without using 'any'
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};
