// lib/cloudinary.ts

// 1. Define the shape of the result info using Record
interface CloudinaryResultInfo {
	secure_url: string;
	// This says: "The object can have other string keys with any kind of value"
	[key: string]: unknown;
}

interface CloudinaryResult {
	event: string;
	info: CloudinaryResultInfo;
}

// 2. Define the Cloudinary Object structure so we don't need 'any'
type CloudinaryInstance = {
	createUploadWidget: (
		options: Record<string, unknown>,
		callback: (
			error: Error | null,
			result: CloudinaryResult,
		) => void,
	) => { open: () => void };
};


export const openCloudinaryWidget = (onSuccess: (url: string) => void): void => {
  
  // We cast to unknown first to tell TS "Stop looking at the standard Window type for a second"
  // then we cast to our specific object shape.
  const globalWithCloudinary = (window as unknown) as { cloudinary: CloudinaryInstance };

  if (typeof window !== "undefined" && globalWithCloudinary.cloudinary) {
    globalWithCloudinary.cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
        multiple: false,
        maxFiles: 1,
        clientAllowedFormats: ["png", "jpeg", "jpg", "webp"],
        theme: "minimal",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          onSuccess(result.info.secure_url);
        }
      }
    ).open();
  } else {
    console.error("Cloudinary script not loaded.");
  }
};
