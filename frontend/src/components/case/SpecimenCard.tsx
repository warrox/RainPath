import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { BlockCard } from './BlockCard';
import type { Sample } from '../../types/case';

interface SpecimenCardProps {
  sample: Sample;
  specimenIndex: number;
}

export function SpecimenCard({ sample, specimenIndex }: SpecimenCardProps) {
  return (
    <Card className="border-l-4 border-rainpath-primary shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl">
          Specimen #{specimenIndex + 1}
        </CardTitle>
        <div className="text-sm text-rainpath-gray-600">
          {sample.blocks.length} block{sample.blocks.length !== 1 ? 's' : ''}
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sample.blocks.map((block, blockIndex) => (
            <BlockCard
              key={block.id}
              blockId={block.id}
              blockIndex={blockIndex}
              slides={block.slides}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
