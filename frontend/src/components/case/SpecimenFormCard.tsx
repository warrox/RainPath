import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { BlockFormCard } from './BlockFormCard';
import { Plus, X } from 'lucide-react';
import type { CreateSampleDto } from '../../types/case';

interface SpecimenFormCardProps {
  sample: CreateSampleDto;
  specimenIndex: number;
  canRemove: boolean;
  onAddBlock: () => void;
  onRemoveBlock: (blockIndex: number) => void;
  onAddSlide: (blockIndex: number) => void;
  onRemoveSlide: (blockIndex: number, slideIndex: number) => void;
  onUpdateColoration: (blockIndex: number, slideIndex: number, value: string) => void;
  onRemoveSpecimen: () => void;
}

export function SpecimenFormCard({
  sample,
  specimenIndex,
  canRemove,
  onAddBlock,
  onRemoveBlock,
  onAddSlide,
  onRemoveSlide,
  onUpdateColoration,
  onRemoveSpecimen,
}: SpecimenFormCardProps) {
  return (
    <Card className="border-l-4 border-rainpath-primary shadow-sm">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">
            Specimen #{specimenIndex + 1}
          </CardTitle>
          {canRemove && (
            <Button
              type="button"
              variant="link"
              onClick={onRemoveSpecimen}
              className="text-rainpath-primary"
            >
              <X className="h-4 w-4" />
              Remove Specimen
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {sample.blocks.map((block, blockIndex) => (
          <BlockFormCard
            key={blockIndex}
            block={block}
            specimenIndex={specimenIndex}
            blockIndex={blockIndex}
            canRemove={sample.blocks.length > 1}
            onAddSlide={() => onAddSlide(blockIndex)}
            onRemoveSlide={(slideIndex) => onRemoveSlide(blockIndex, slideIndex)}
            onUpdateColoration={(slideIndex, value) => onUpdateColoration(blockIndex, slideIndex, value)}
            onRemoveBlock={() => onRemoveBlock(blockIndex)}
          />
        ))}

        <Button
          type="button"
          variant="link"
          onClick={onAddBlock}
          className="text-rainpath-primary p-0"
        >
          <Plus className="h-4 w-4" />
          Add Block to Specimen #{specimenIndex + 1}
        </Button>
      </CardContent>
    </Card>
  );
}
