import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

interface SlideCardProps {
  slideId: number;
  slideIndex: number;
  coloration: string;
}

export function SlideCard({ slideId, slideIndex, coloration }: SlideCardProps) {
  return (
    <Card className="hover:border-rainpath-primary transition">
      <CardContent className="p-3">
        <div className="flex justify-between items-center">
          <div>
            <div className="font-medium text-rainpath-text">
              Slide #{slideIndex + 1}
            </div>
            <div className="text-sm text-rainpath-gray-600 mt-1">
              <Badge>{coloration}</Badge>
            </div>
          </div>
          <div className="text-xs text-rainpath-gray-500">
            #{slideId}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
