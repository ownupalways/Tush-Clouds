import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
				// Debug logging (remove after fixing)
				console.log("🔐 Login attempt:");
				console.log(
					"Expected email:",
					process.env.ADMIN_USERNAME,
				);
				console.log(
					"Expected password exists:",
					!!process.env.ADMIN_PASSWORD,
				);
				console.log(
					"Received email:",
					credentials?.email,
				);
				console.log(
					"Received password exists:",
					!!credentials?.password,
				);

				// Check credentials against environment variables
				if (
					credentials?.email ===
						process.env.ADMIN_USERNAME &&
					credentials?.password ===
						process.env.ADMIN_PASSWORD
				) {
					console.log("✅ Login successful!");
					return {
						id: "1",
						name: "Admin",
						email: "admin@portfolio.com",
					};
				}

				console.log(
					"❌ Login failed - credentials don't match",
				);
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
			if (session.user) {
				(session.user as { id: string }).id =
					token.id as string;
			}
			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
