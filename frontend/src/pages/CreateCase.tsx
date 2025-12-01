import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { SpecimenFormCard } from '../components/case/SpecimenFormCard';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Plus, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useSamples } from '../hooks/useSamples';
import { casesApi } from '../api/casesApi';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';

export function CreateCase() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [createdCaseId, setCreatedCaseId] = useState<number | null>(null);

  const {
    samples,
    addSample,
    removeSample,
    addBlock,
    removeBlock,
    addSlide,
    removeSlide,
    updateColoration,
  } = useSamples();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const newCase = await casesApi.create({ samples });
      setCreatedCaseId(newCase.id);
      setShowSuccessDialog(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create case');
      setIsSubmitting(false);
    }
  };

  const handleViewCase = () => {
    if (createdCaseId) {
      navigate(`/cases/${createdCaseId}`);
    }
  };

  const handleCreateAnother = () => {
    setShowSuccessDialog(false);
    setCreatedCaseId(null);
    setIsSubmitting(false);
    window.location.reload();
  };

  const handleGoToCases = () => {
    navigate('/cases');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-6">
          <Button variant="link" asChild className="p-0">
            <Link to="/cases">
              <ArrowLeft className="h-4 w-4" />
              Back to Cases
            </Link>
          </Button>
        </div>

        <Card className="border-rainpath-primary shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl text-rainpath-text">Create New Case</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600">{error}</p>
                </div>
              )}

              {samples.map((sample, specimenIndex) => (
                <SpecimenFormCard
                  key={specimenIndex}
                  sample={sample}
                  specimenIndex={specimenIndex}
                  canRemove={samples.length > 1}
                  onAddBlock={() => addBlock(specimenIndex)}
                  onRemoveBlock={(blockIndex) => removeBlock(specimenIndex, blockIndex)}
                  onAddSlide={(blockIndex) => addSlide(specimenIndex, blockIndex)}
                  onRemoveSlide={(blockIndex, slideIndex) =>
                    removeSlide(specimenIndex, blockIndex, slideIndex)
                  }
                  onUpdateColoration={(blockIndex, slideIndex, value) =>
                    updateColoration(specimenIndex, blockIndex, slideIndex, value)
                  }
                  onRemoveSpecimen={() => removeSample(specimenIndex)}
                />
              ))}

              <Button
                type="button"
                variant="link"
                onClick={addSample}
                className="text-rainpath-primary p-0"
              >
                <Plus className="h-4 w-4" />
                Add Specimen
              </Button>

              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-rainpath-primary hover:bg-rainpath-primary/90"
                >
                  {isSubmitting ? 'Creating...' : 'Create Case'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <DialogTitle>Case Created Successfully!</DialogTitle>
            </div>
            <DialogDescription>
              Your new case (ID: {createdCaseId}) has been created with all specimens, blocks, and slides.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleCreateAnother}
              className="border-rainpath-gray-300"
            >
              Create Another
            </Button>
            <Button
              variant="outline"
              onClick={handleGoToCases}
              className="border-rainpath-gray-300"
            >
              View All Cases
            </Button>
            <Button
              onClick={handleViewCase}
              className="bg-rainpath-primary hover:bg-rainpath-primary/90"
            >
              View Case
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
