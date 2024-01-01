import { apiInstance } from "@/axios/instance";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "mataringan@gmail.com",
        },
        password: {
          label: "password",
          type: "password",
        },
      },

      async authorize(credentials) {
        try {
          const res = await apiInstance.post(
            "/login",
            {
              email: credentials.email,
              password: credentials.password,
            },
            {
              headers: {
                accept: "*/*",
                "Content-Type": "application/json",
              },
            }
          );
          return res.data;
        } catch (error) {
          console.log("ERROR USER AUTH", error.response.data.message);
          throw new Error(error.response.data.message);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
