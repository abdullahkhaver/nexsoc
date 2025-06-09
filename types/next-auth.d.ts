import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      phone: number;
    };
  }

  interface User {
    id: string;
    username: string;
    phone: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    phone: number;
  }
}
