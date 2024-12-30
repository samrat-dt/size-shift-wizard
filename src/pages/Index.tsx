import { ImageUploader } from "@/components/ImageUploader";

const Index = () => {
  return (
    <div className="h-screen bg-gray-50">
      <div className="h-full max-w-[1400px] mx-auto">
        <div className="text-center py-4">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">IMGne</h1>
          <p className="mt-2 text-lg text-gray-500">
            Made by Samrat Talukder
          </p>
        </div>
        <div className="h-[calc(100%-6rem)]">
          <ImageUploader />
        </div>
      </div>
    </div>
  );
};

export default Index;