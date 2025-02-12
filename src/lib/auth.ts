import { PrismaClient } from '@prisma/client'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const prisma = new PrismaClient()

export const { auth, handlers } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    // Store user in DB if not exists
    async signIn({ user }) {
      try {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        })

        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name!,
              image: user.image!,
              role: "user",
            },
          })
        }

        return true
      } catch (error) {
        console.error('Error storing user in DB:', error)
        return false
      }
    },

    // Protect Routes: Public & Private
    authorized: async ({ auth, request }) => {
      const { nextUrl } = request

      // Define public routes (accessible without login)
      const publicRoutes = ['/']

      // Allow access to public routes
      if (publicRoutes.includes(nextUrl.pathname)) {
        return true
      }

      // Require authentication for all other routes
      return !!auth
    },
  },
})

