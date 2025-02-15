import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { db as prisma } from '@/db'
import { generateUsername } from '@/utils/generate-username'


export const { auth, handlers } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // Store user in DB if not exists
    async signIn({ user }) {
      try {
        const existingUser = await prisma.user.findUnique({ where: { email: user.email! } })
        const username = generateUsername(user.email ? user.email : null);

        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.email!,
              username,
              name: user.name!,
              image: user.image!,
            },
          })
        }

        return true
      } catch (error) {
        console.error('Error storing user in DB:', error)
        return false
      }
    },

    authorized: async ({ auth, request }) => {
      const { nextUrl } = request
      if (
        nextUrl.pathname.startsWith("/_next/") || // Next.js static files
        nextUrl.pathname.startsWith("/favicon.ico") || // Favicon
        nextUrl.pathname.startsWith("/public/") || // Public folder assets
        nextUrl.pathname.startsWith("/api/auth/") // Allow NextAuth API routes
      ) {
        return true
      }

      // Define public routes (accessible without login)
      const publicRoutes = ['/', '/problemset']

      // Allow access to public routes
      if (publicRoutes.includes(nextUrl.pathname)) {
        return true
      }

      // Require authentication for all other routes
      return !!auth
    },
  },

})

