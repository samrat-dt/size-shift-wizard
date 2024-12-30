import { ImageUploader } from "@/components/ImageUploader";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Image Processor</h1>
          <p className="mt-3 text-lg text-gray-500">
            Convert and compress your images easily
          </p>
        </div>
        <ImageUploader />
      </div>
    </div>
  );
};

export default Index;