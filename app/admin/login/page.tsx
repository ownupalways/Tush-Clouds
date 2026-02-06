"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (
		e: React.FormEvent,
	) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			const result = await signIn("credentials", {
				email,
				password,
				redirect: false,
			});

			if (result?.error) {
				setError("Invalid credentials");
			} else {
				router.push("/admin");
			}
		} catch (err) {
			console.error("Login error:", err);
			setError("An error occurred");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			style={{
				display: "flex",
                justifyContent: "center",
                padding:"0 8px",
				alignItems: "center",
				minHeight: "100vh",
			}}>
			<div
				style={{
					background: "linear-gradient(135deg, #14532D 0%, #FACC15 100%)",
					borderRadius: "10px",
					boxShadow:
						"0 10px 40px rgba(0,0,0,0.2)",
					width: "100%",
                    maxWidth: "400px",
                    padding: "30px",
				}}>
				<h2
					style={{
						textAlign: "center",
						marginBottom: "30px",
						color: "white",
					}}>
					Admin Login
				</h2>
				<form onSubmit={handleSubmit}>
					<div style={{ marginBottom: "20px" }}>
						<label
							style={{
								display: "block",
								marginBottom: "5px",
								color: "#fff",
								fontWeight: "500",
							}}>
							Username
						</label>
						<input
							type="text"
							value={email}
							onChange={(e) =>
								setEmail(e.target.value)
							}
							required
							className="input"
						/>
					</div>
					<div style={{ marginBottom: "20px" }}>
						<label
							style={{
								display: "block",
								marginBottom: "5px",
								color: "#fff",
								fontWeight: "500",
							}}>
							Password
						</label>
						<input
							type="password"
							value={password}
							onChange={(e) =>
								setPassword(e.target.value)
							}
							required
							className="input"
						/>
					</div>
					{error && (
						<div
							style={{
								padding: "10px",
								background: "#fee",
								color: "#c00",
								borderRadius: "5px",
								marginBottom: "20px",
								textAlign: "center",
							}}>
							{error}
						</div>
					)}
					<button
						type="submit"
						disabled={loading}
						style={{
							width: "100%",
							padding: "12px",
							background: loading
								? "#999"
								: "#0a0a0a",
							color: "#fff",
							border: "none",
							borderRadius: "5px",
							fontSize: "16px",
							fontWeight: "600",
							cursor: loading
								? "not-allowed"
								: "pointer",
						}}>
						{loading ? "Logging in..." : "Login"}
					</button>
				</form>
			</div>
		</div>
	);
}
