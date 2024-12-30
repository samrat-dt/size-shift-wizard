import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ImageLabelProps {
  onLabelChange: (labelConfig: {
    text: string;
  }) => void;
}

export const ImageLabel = ({ onLabelChange }: ImageLabelProps) => {
  const [labelText, setLabelText] = useState("");

  const handleLabelChange = (text: string) => {
    setLabelText(text);
    onLabelChange({ text });
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <div>
        <Label htmlFor="label-text">Label Text</Label>
        <Input
          id="label-text"
          value={labelText}
          onChange={(e) => handleLabelChange(e.target.value)}
          placeholder="Enter label text"
        />
      </div>
    </div>
  );
};