import { useState } from "react";
import { ProcessingOptions } from "./ProcessingOptions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { processImage } from "@/lib/imageUtils";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { ImageLabel } from "./ImageLabel";

interface ImageProcessorProps {
  file: File;
  preview: string;
  onReset: () => void;
}

export const ImageProcessor = ({ file, preview, onReset }: ImageProcessorProps) => {
  const [processing, setProcessing] = useState(false);
  const [processedImage, setProcessedImage] = useState<string>("");
  const [processedSize, setProcessedSize] = useState<number>(0);
  const [labelConfig, setLabelConfig] = useState<{
    text: string;
    textColor: string;
    borderColor: string;
  }>({ text: "", textColor: "#FFFFFF", borderColor: "#000000" });
  const { toast } = useToast();

  const handleProcess = async (format: string, quality: number) => {
    try {
      setProcessing(true);
      const result = await processImage(file, format, quality, labelConfig);
      setProcessedImage(result.url);
      setProcessedSize(result.size);
      toast({
        title: "Success!",
        description: "Image processed successfully",
        duration: 2000, // Auto-dismiss after 2 seconds
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process image",
        variant: "destructive",
        duration: 2000, // Auto-dismiss after 2 seconds
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (processedImage) {
      const link = document.createElement("a");
      link.href = processedImage;
      link.download = `processed-${file.name.split(".")[0]}.${processedImage.split(";")[0].split("/")[1]}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Original</h3>
            <img
              src={preview}
              alt="Original"
              className="max-w-full h-auto rounded-lg"
            />
            <p className="mt-2 text-sm text-gray-500">
              Size: {(file.size / 1024).toFixed(2)} KB
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Processed</h3>
            {processedImage ? (
              <>
                <img
                  src={processedImage}
                  alt="Processed"
                  className="max-w-full h-auto rounded-lg"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Size: {(processedSize / 1024).toFixed(2)} KB
                </p>
              </>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center text-gray-500">
                Processed image will appear here
              </div>
            )}
          </div>
        </div>
      </Card>

      <ImageLabel onLabelChange={setLabelConfig} />

      <ProcessingOptions onProcess={handleProcess} disabled={processing} />

      <div className="flex justify-between">
        <Button variant="outline" onClick={onReset}>
          Upload New Image
        </Button>
        <Button
          onClick={handleDownload}
          disabled={!processedImage || processing}
        >
          {processing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Download Processed Image"
          )}
        </Button>
      </div>
    </div>
  );
};