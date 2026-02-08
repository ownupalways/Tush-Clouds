/**
 * Returns a safe avatar URL for a user/testimonial.
 *
 * @param name - The name of the person (used for fallback avatar)
 * @param image - Optional image URL from database or static folder
 * @returns string - Valid image URL
 */
export function getAvatarUrl(
	name: string,
	image?: string,
): string {
	// If a valid image URL is provided, use it
	if (image && image.trim() !== "") {
		return image;
	}

	// Otherwise, generate a fallback avatar from ui-avatars.com
	const encodedName = encodeURIComponent(
		name || "Anonymous",
	);

	return `https://ui-avatars.com/api/?name=${encodedName}&background=FACC15&color=14532D`;
}
