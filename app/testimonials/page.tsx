"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

interface Testimonial {
  _id: string;
  name: string;
  position?: string;
  company?: string;
  message: string;
  rating?: number;
  image?: string;
  createdAt: string;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/testimonials");
      const data = await res.json();
      setTestimonials(data.data || []);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
		<div
			style={{
				minHeight: "100vh",
				padding: "40px 20px",
				background: "#f9f9f9",
			}}>
			<div
				style={{
					maxWidth: "1200px",
					margin: "0 auto",
				}}>
				<div
					style={{
						textAlign: "center",
						marginBottom: "60px",
					}}>
					<h1
						style={{
							fontSize: "3rem",
							color: "#333",
							marginBottom: "10px",
						}}>
						What Our Clients Say
					</h1>
					<p
						style={{
							fontSize: "1.2rem",
							color: "#666",
						}}>
						Testimonials from satisfied clients
						and partners
					</p>
				</div>

				{loading ? (
					<div
						style={{
							textAlign: "center",
							padding: "60px 0",
						}}>
						<p
							style={{
								fontSize: "1.2rem",
								color: "#666",
							}}>
							Loading testimonials...
						</p>
					</div>
				) : testimonials.length === 0 ? (
					<div
						style={{
							textAlign: "center",
							padding: "60px 0",
						}}>
						<p
							style={{
								fontSize: "1.2rem",
								color: "#666",
							}}>
							No testimonials yet.
						</p>
					</div>
				) : (
					<div
						style={{
							display: "grid",
							gridTemplateColumns:
								"repeat(auto-fit, minmax(350px, 1fr))",
							gap: "30px",
						}}>
						{testimonials.map((testimonial) => (
							<div
								key={testimonial._id}
								style={{
									background: "#fff",
									padding: "30px",
									borderRadius: "10px",
									boxShadow:
										"0 4px 15px rgba(0,0,0,0.1)",
									position: "relative",
									transition:
										"transform 0.3s ease, box-shadow 0.3s ease",
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.transform =
										"translateY(-5px)";
									e.currentTarget.style.boxShadow =
										"0 8px 25px rgba(0,0,0,0.15)";
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.transform =
										"translateY(0)";
									e.currentTarget.style.boxShadow =
										"0 4px 15px rgba(0,0,0,0.1)";
								}}>
								<FontAwesomeIcon
									icon={faQuoteLeft}
									style={{
										fontSize: "2rem",
										color: "#4a90e2",
										opacity: 0.2,
										position: "absolute",
										top: "20px",
										left: "20px",
									}}
								/>

								<div
									style={{ marginTop: "20px" }}>
									{testimonial.rating && (
										<div
											style={{
												color: "#ffc107",
												marginBottom: "15px",
											}}>
											{[
												...Array(
													testimonial.rating,
												),
											].map((_, i) => (
												<FontAwesomeIcon
													key={i}
													icon={faStar}
												/>
											))}
										</div>
									)}

									<p
										style={{
											fontSize: "1rem",
											lineHeight: "1.8",
											color: "#555",
											marginBottom: "20px",
											fontStyle: "italic",
										}}>
										&quot;{testimonial.message}&quot;
									</p>

									<div
										style={{
											borderTop: "1px solid #eee",
											paddingTop: "15px",
										}}>
										<h4
											style={{
												margin: "0 0 5px 0",
												color: "#333",
												fontSize: "1.1rem",
											}}>
											{testimonial.name}
										</h4>
										{(testimonial.position ||
											testimonial.company) && (
											<p
												style={{
													margin: 0,
													color: "#888",
													fontSize: "0.9rem",
												}}>
												{testimonial.position}
												{testimonial.position &&
													testimonial.company &&
													" at "}
												{testimonial.company}
											</p>
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
