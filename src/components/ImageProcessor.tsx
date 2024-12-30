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
  }>({ text: "" });
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
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process image",
        variant: "destructive",
        duration: 2000,
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
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-4 p-4">
      <Card className="flex-grow overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full p-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Original</h3>
            <div className="relative h-[calc(100%-2rem)] overflow-hidden rounded-lg">
              <img
                src={preview}
                alt="Original"
                className="object-contain w-full h-full"
              />
              <p className="absolute bottom-2 right-2 text-sm bg-black/70 text-white px-2 py-1 rounded">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Processed</h3>
            <div className="relative h-[calc(100%-2rem)] overflow-hidden rounded-lg">
              {processedImage ? (
                <>
                  <img
                    src={processedImage}
                    alt="Processed"
                    className="object-contain w-full h-full"
                  />
                  <p className="absolute bottom-2 right-2 text-sm bg-black/70 text-white px-2 py-1 rounded">
                    {(processedSize / 1024).toFixed(2)} KB
                  </p>
                </>
              ) : (
                <div className="flex items-center justify-center h-full border-2 border-dashed border-gray-300 rounded-lg">
                  <p className="text-gray-500">Processed image will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ImageLabel onLabelChange={setLabelConfig} />
        <div className="md:col-span-2">
          <ProcessingOptions onProcess={handleProcess} disabled={processing} />
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onReset}>
          Upload New Image
        </Button>
        <Button onClick={handleDownload} disabled={!processedImage || processing}>
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