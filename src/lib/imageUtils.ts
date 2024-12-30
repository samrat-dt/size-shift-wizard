import imageCompression from "browser-image-compression";

interface LabelConfig {
  text: string;
}

export async function processImage(
  file: File,
  format: string,
  quality: number,
  labelConfig?: LabelConfig
): Promise<{ url: string; size: number }> {
  const options = {
    maxSizeMB: 50,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: `image/${format}`,
    initialQuality: quality / 100,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    let url = await imageCompression.getDataUrlFromFile(compressedFile);

    if (labelConfig?.text) {
      url = await addLabelToImage(url, labelConfig);
    }

    const response = await fetch(url);
    const blob = await response.blob();

    return { url, size: blob.size };
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
}

async function addLabelToImage(
  dataUrl: string,
  labelConfig: LabelConfig
): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return resolve(dataUrl);

      const labelHeight = Math.max(40, img.height * 0.1);
      canvas.width = img.width;
      canvas.height = img.height + labelHeight;

      // Draw original image
      ctx.drawImage(img, 0, 0);

      // Add label background
      ctx.fillStyle = "#000000e6";
      ctx.fillRect(0, img.height, img.width, labelHeight);

      // Add borders
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 1;
      ctx.strokeRect(0, img.height, img.width, 0); // top
      ctx.strokeRect(0, img.height, 0, labelHeight); // left
      ctx.strokeRect(img.width - 1, img.height, 0, labelHeight); // right
      ctx.lineWidth = 3;
      ctx.strokeRect(0, canvas.height - 1, img.width, 0); // bottom

      // Add text
      ctx.fillStyle = "#FFFFFF";
      ctx.font = `${labelHeight * 0.4}px Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        labelConfig.text,
        img.width / 2,
        img.height + labelHeight / 2
      );

      resolve(canvas.toDataURL());
    };
    img.src = dataUrl;
  });
}