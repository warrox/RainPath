import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { X } from 'lucide-react';

interface SlideFieldProps {
  specimenIndex: number;
  blockIndex: number;
  slideIndex: number;
  value: string;
  canRemove: boolean;
  onChange: (value: string) => void;
  onRemove: () => void;
}

export function SlideField({
  specimenIndex,
  blockIndex,
  slideIndex,
  value,
  canRemove,
  onChange,
  onRemove,
}: SlideFieldProps) {
  const fieldId = `slide-${specimenIndex}-${blockIndex}-${slideIndex}`;

  return (
    <div className="flex gap-3 items-end">
      <div className="flex-1">
        <Label htmlFor={fieldId}>
          Slide #{slideIndex + 1} - Coloration
        </Label>
        <Input
          id={fieldId}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g., HE, PAS"
          required
        />
      </div>
      {canRemove && (
        <Button
          type="button"
          variant="link"
          onClick={onRemove}
          className="text-rainpath-primary"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
