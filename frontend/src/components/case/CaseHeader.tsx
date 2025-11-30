import { Card, CardHeader, CardTitle } from '../ui/card';
import { formatDateTime } from '../../lib/case-utils';

interface CaseHeaderProps {
  caseId: number;
  createdAt: Date | string;
  specimenCount: number;
  blockCount: number;
  slideCount: number;
}

export function CaseHeader({ caseId, createdAt, specimenCount, blockCount, slideCount }: CaseHeaderProps) {
  const stats = [
    { label: 'Specimens', value: specimenCount },
    { label: 'Blocks', value: blockCount },
    { label: 'Slides', value: slideCount },
  ];

  return (
    <Card className="mb-8 shadow-sm">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-3xl mb-2">Case #{caseId}</CardTitle>
            <p className="text-rainpath-gray-600 text-sm">
              Created: {formatDateTime(createdAt)}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-rainpath-gray-600 space-y-1">
              {stats.map(({ label, value }) => (
                <div key={label}>
                  <span className="font-medium text-rainpath-text">{value}</span> {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
