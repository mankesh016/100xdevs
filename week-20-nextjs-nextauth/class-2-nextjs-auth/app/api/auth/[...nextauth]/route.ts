import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

import NextAuth from "next-auth";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Username and Password",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter password",
        },
      },
      async authorize(credentials) {
        const username = credentials?.username;
        const password = credentials?.password;

        //db request to check if the username and password are correct basically the authentication part!
        const user = {
          id: "3",
          name: "Alicedsf",
          email: "alicedsf@gmail.com",
        };

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: "abc",
      clientSecret: "abc",
    }),
    GitHubProvider({
      clientId: "abc",
      clientSecret: "abc",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // optional
});

export { handler as GET, handler as POST };
