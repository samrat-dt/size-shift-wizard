import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ChromePicker } from "react-color";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ImageLabelProps {
  onLabelChange: (labelConfig: {
    text: string;
    textColor: string;
    borderColor: string;
  }) => void;
}

export const ImageLabel = ({ onLabelChange }: ImageLabelProps) => {
  const [labelText, setLabelText] = useState("");
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [borderColor, setBorderColor] = useState("#000000");
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [showBorderColorPicker, setShowBorderColorPicker] = useState(false);

  const handleLabelChange = (text: string) => {
    setLabelText(text);
    onLabelChange({ text, textColor, borderColor });
  };

  const handleTextColorChange = (color: { hex: string }) => {
    setTextColor(color.hex);
    onLabelChange({ text: labelText, textColor: color.hex, borderColor });
  };

  const handleBorderColorChange = (color: { hex: string }) => {
    setBorderColor(color.hex);
    onLabelChange({ text: labelText, textColor, borderColor: color.hex });
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
      
      <div className="flex space-x-4">
        <div>
          <Label>Text Color</Label>
          <Popover open={showTextColorPicker} onOpenChange={setShowTextColorPicker}>
            <PopoverTrigger asChild>
              <div
                className="w-8 h-8 rounded cursor-pointer border"
                style={{ backgroundColor: textColor }}
              />
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <ChromePicker
                color={textColor}
                onChange={handleTextColorChange}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div>
          <Label>Border Color</Label>
          <Popover open={showBorderColorPicker} onOpenChange={setShowBorderColorPicker}>
            <PopoverTrigger asChild>
              <div
                className="w-8 h-8 rounded cursor-pointer border"
                style={{ backgroundColor: borderColor }}
              />
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <ChromePicker
                color={borderColor}
                onChange={handleBorderColorChange}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};