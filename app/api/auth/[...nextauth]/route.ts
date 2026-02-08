import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

/**
 * 🚀 IMPORTANT
 * This route MUST be dynamic to avoid cold-start compile delays
 */
export const dynamic = "force-dynamic";

/**
 * (Optional but recommended)
 * Forces Node.js runtime for credentials auth
 */
export const runtime = "nodejs";

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "text",
				},
				password: {
					label: "Password",
					type: "password",
				},
			},
			async authorize(credentials) {
				// ❌ Never log secrets in production
				if (
					!credentials?.email ||
					!credentials?.password
				) {
					return null;
				}

				if (
					credentials.email ===
						process.env.ADMIN_USERNAME &&
					credentials.password ===
						process.env.ADMIN_PASSWORD
				) {
					return {
						id: "1",
						name: "Admin",
						email: "admin@portfolio.com",
					};
				}

				return null;
			},
		}),
	],

	pages: {
		signIn: "/admin/login",
	},

	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},

		async session({ session, token }) {
			if (session.user && token?.id) {
				(session.user as { id: string }).id =
					token.id as string;
			}
			return session;
		},
	},

	secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
