import { ImageUploader } from "@/components/ImageUploader";

const Index = () => {
  return (
    <div className="h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">IMGne</h1>
          <p className="mt-2 text-lg text-gray-500">
            Made by Samrat Talukder
          </p>
        </div>
        <ImageUploader />
      </div>
    </div>
  );
};

export default Index;