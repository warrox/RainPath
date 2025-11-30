import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { SlideField } from './SlideField';
import { Plus, X } from 'lucide-react';
import { getBlockLabel } from '../../lib/case-utils';
import type { CreateBlockDto } from '../../types/case';

interface BlockFormCardProps {
  block: CreateBlockDto;
  specimenIndex: number;
  blockIndex: number;
  canRemove: boolean;
  onAddSlide: () => void;
  onRemoveSlide: (slideIndex: number) => void;
  onUpdateColoration: (slideIndex: number, value: string) => void;
  onRemoveBlock: () => void;
}

export function BlockFormCard({
  block,
  specimenIndex,
  blockIndex,
  canRemove,
  onAddSlide,
  onRemoveSlide,
  onUpdateColoration,
  onRemoveBlock,
}: BlockFormCardProps) {
  return (
    <Card className="bg-rainpath-gray-50">
      <CardHeader>
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-rainpath-text">
            Block {getBlockLabel(blockIndex)}
          </h3>
          {canRemove && (
            <Button
              type="button"
              variant="link"
              onClick={onRemoveBlock}
              className="text-rainpath-primary"
            >
              <X className="h-4 w-4" />
              Remove Block
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {block.slides.map((slide, slideIndex) => (
          <SlideField
            key={slideIndex}
            specimenIndex={specimenIndex}
            blockIndex={blockIndex}
            slideIndex={slideIndex}
            value={slide.coloration}
            canRemove={block.slides.length > 1}
            onChange={(value) => onUpdateColoration(slideIndex, value)}
            onRemove={() => onRemoveSlide(slideIndex)}
          />
        ))}

        <Button
          type="button"
          variant="link"
          onClick={onAddSlide}
          className="text-rainpath-primary p-0"
        >
          <Plus className="h-4 w-4" />
          Add Slide
        </Button>
      </CardContent>
    </Card>
  );
}
