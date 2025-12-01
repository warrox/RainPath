import { Card, CardContent, CardHeader } from '../ui/card';
import { SlideCard } from './SlideCard';
import { getBlockLabel } from '../../lib/case-utils';
import type { Slide } from '../../types/case';

interface BlockCardProps {
  blockId: number;
  blockIndex: number;
  slides: Slide[];
}

export function BlockCard({ blockId, blockIndex, slides }: BlockCardProps) {
  return (
    <Card className="bg-rainpath-gray-50 hover:border-rainpath-primary transition">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-rainpath-text">
            Block {getBlockLabel(blockIndex)}
          </h3>
          <span className='text-xs text-rainpath-gray-500'> ID: {blockId}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {slides.map((slide, slideIndex) => (
          <SlideCard
            key={slide.id}
            slideId={slide.id}
            slideIndex={slideIndex}
            coloration={slide.coloration}
          />
        ))}
      </CardContent>
    </Card>
  );
}
