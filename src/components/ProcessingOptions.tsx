import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface ProcessingOptionsProps {
  onProcess: (format: string, quality: number) => void;
  disabled: boolean;
}

export const ProcessingOptions = ({ onProcess, disabled }: ProcessingOptionsProps) => {
  const [format, setFormat] = useState("jpeg");
  const [quality, setQuality] = useState(80);

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Output Format</Label>
          <Select
            value={format}
            onValueChange={setFormat}
            disabled={disabled}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="jpeg">JPEG</SelectItem>
              <SelectItem value="png">PNG</SelectItem>
              <SelectItem value="webp">WebP</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Quality ({quality}%)</Label>
          <Slider
            value={[quality]}
            onValueChange={(value) => setQuality(value[0])}
            min={1}
            max={100}
            step={1}
            disabled={disabled}
          />
        </div>

        <Button
          className="w-full"
          onClick={() => onProcess(format, quality)}
          disabled={disabled}
        >
          Process Image
        </Button>
      </div>
    </Card>
  );
};