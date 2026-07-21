import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      number?: string | null
      gender?: string | null
    }
  }

  interface User {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
    number?: string | null
    gender?: string | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    number?: string | null
    gender?: string | null
  }
}