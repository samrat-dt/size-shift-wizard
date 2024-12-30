import imageCompression from "browser-image-compression";

export async function processImage(
  file: File,
  format: string,
  quality: number
): Promise<{ url: string; size: number }> {
  const options = {
    maxSizeMB: 10,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: `image/${format}`,
    initialQuality: quality / 100,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    const url = await imageCompression.getDataUrlFromFile(compressedFile);
    return { url, size: compressedFile.size };
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
}