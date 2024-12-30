import { useState, useCallback } from "react";
import { ImageProcessor } from "./ImageProcessor";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";

export const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const { toast } = useToast();

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  }, []);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 50MB",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  if (selectedFile && preview) {
    return <ImageProcessor file={selectedFile} preview={preview} onReset={() => {
      setSelectedFile(null);
      setPreview("");
    }} />;
  }

  return (
    <div className="h-full flex items-center justify-center">
      <Card className="w-full max-w-xl mx-auto bg-white rounded-lg shadow-md">
        <div
          className="p-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors"
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
        >
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="mt-4">
              <label htmlFor="file-upload" className="cursor-pointer">
                <span className="mt-2 block text-sm font-medium text-gray-900">
                  Drop an image here, or click to select
                </span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  accept="image/jpeg,image/png,image/gif,image/webp,image/avif"
                  onChange={handleFileInput}
                />
              </label>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              JPEG, PNG, GIF, WebP, AVIF up to 50MB
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};