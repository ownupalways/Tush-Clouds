import {
	Body,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Link,
	Preview,
	Section,
	Text,
} from "@react-email/components";
import * as React from "react";

interface TestimonialNotificationProps {
	name: string;
	rating: number;
	message: string;
	position?: string;
	company?: string;
}

export const TestimonialNotificationEmail = ({
	name,
	rating,
	message,
	position,
	company,
}: TestimonialNotificationProps) => (
	<Html>
		<Head />
		<Preview>💬 New Testimonial from {name} — Action Required</Preview>
		<Body style={main}>
			<Container style={container}>
				<Section style={header}>
					<Text style={logoText}>TUSH-CLOUD</Text>
				</Section>
				<Heading style={heading}>New Testimonial Submitted</Heading>
				<Text style={paragraph}>
					A new testimonial has been submitted and is awaiting your approval.
				</Text>
				<Section style={infoSection}>
					<Text style={label}>CLIENT</Text>
					<Text style={value}>
						{name}
						{position ? ` — ${position}` : ""}
						{company ? ` at ${company}` : ""}
					</Text>

					<Text style={label}>RATING</Text>
					<Text style={value}>{"⭐".repeat(rating)} ({rating}/5)</Text>

					<Text style={label}>TESTIMONIAL</Text>
					<Text style={messageBox}>&quot;{message}&quot;</Text>
				</Section>
				<Section style={buttonContainer}>
					<Link
						style={button}
						href="https://tush-clouds-portfolio.vercel.app/admin">
						Review in Dashboard
					</Link>
				</Section>
				<Hr style={hr} />
				<Text style={footer}>
					This is an automated notification from your Tush-Cloud Portfolio.
					Log in to approve or reject this testimonial.
				</Text>
			</Container>
		</Body>
	</Html>
);

export default TestimonialNotificationEmail;

const main = {
	backgroundColor: "#0a0a0a",
	fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
};
const container = {
	margin: "0 auto",
	padding: "20px 0 48px",
	width: "580px",
};
const header = { padding: "32px 0" };
const logoText = {
	fontSize: "24px",
	fontWeight: "bold",
	color: "#00f260",
	letterSpacing: "2px",
	textAlign: "center" as const,
};
const heading = {
	fontSize: "32px",
	lineHeight: "1.3",
	fontWeight: "700",
	color: "#ffffff",
	textAlign: "center" as const,
};
const paragraph = {
	fontSize: "16px",
	lineHeight: "26px",
	color: "#a3a3a3",
	textAlign: "center" as const,
};
const infoSection = {
	padding: "24px",
	backgroundColor: "#171717",
	borderRadius: "12px",
	marginTop: "16px",
};
const label = {
	fontSize: "10px",
	fontWeight: "bold",
	letterSpacing: "1px",
	color: "#00f260",
	margin: "0 0 4px",
};
const value = {
	fontSize: "16px",
	color: "#ffffff",
	margin: "0 0 20px",
};
const messageBox = {
	fontSize: "14px",
	lineHeight: "22px",
	color: "#d4d4d4",
	fontStyle: "italic",
};
const buttonContainer = {
	textAlign: "center" as const,
	marginTop: "32px",
};
const button = {
	backgroundColor: "#00f260",
	borderRadius: "8px",
	color: "#050505",
	fontSize: "16px",
	fontWeight: "bold",
	textDecoration: "none",
	textAlign: "center" as const,
	display: "inline-block",
	padding: "12px 24px",
};
const hr = { borderColor: "#262626", margin: "40px 0" };
const footer = {
	color: "#525252",
	fontSize: "12px",
	textAlign: "center" as const,
};
