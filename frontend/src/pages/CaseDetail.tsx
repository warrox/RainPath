import { useParams, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { CaseHeader } from '../components/case/CaseHeader';
import { SpecimenCard } from '../components/case/SpecimenCard';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useCase } from '../hooks/useCase';
import { calculateCaseStats } from '../lib/case-utils';

export function CaseDetail() {
  const { id } = useParams<{ id: string }>();
  const { caseData, loading, error } = useCase(id);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-rainpath-primary mx-auto" />
          <p className="mt-4 text-rainpath-gray-600">Loading case...</p>
        </div>
      </div>
    );
  }

  if (error || !caseData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Card className="max-w-md border-rainpath-primary shadow-lg">
          <CardHeader>
            <CardTitle className="text-rainpath-primary">
              {error || 'Case not found'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link to="/cases">
                <ArrowLeft className="h-4 w-4" />
                Back to Cases
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { specimenCount, blockCount, slideCount } = calculateCaseStats(caseData);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <Button variant="link" asChild className="p-0">
            <Link to="/cases">
              <ArrowLeft className="h-4 w-4" />
              Back to Cases
            </Link>
          </Button>
        </div>

        <CaseHeader
          caseId={caseData.id}
          createdAt={caseData.createdAt}
          specimenCount={specimenCount}
          blockCount={blockCount}
          slideCount={slideCount}
        />

        <div className="space-y-6">
          {caseData.samples.map((sample, specimenIndex) => (
            <SpecimenCard
              key={sample.id}
              sample={sample}
              specimenIndex={specimenIndex}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
