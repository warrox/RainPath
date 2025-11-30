import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { casesApi } from '../api/casesApi';
import { Header } from '../components/Header';
import { SpecimenFormCard } from '../components/case/SpecimenFormCard';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Plus } from 'lucide-react';
import { useSamples } from '../hooks/useSamples';
import { validateSamples } from '../lib/validation';

export function CreateCase() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

    const validationError = validateSamples(samples);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const createdCase = await casesApi.create({ samples });
      navigate(`/cases/${createdCase.id}`);
    } catch (err) {
      setError('Failed to create case');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="py-8">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-rainpath-text mb-2">
              Create New Case
            </h1>
            <p className="text-rainpath-gray-600">
              Add specimens, blocks, and slides to your case
            </p>
          </div>

          {error && (
            <Card className="mb-6 border-rainpath-primary shadow-sm">
              <CardContent className="pt-6">
                <p className="text-rainpath-primary font-medium">{error}</p>
              </CardContent>
            </Card>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="flex gap-4">
              <Button type="button" variant="secondary" onClick={addSample}>
                <Plus className="h-4 w-4" />
                Add Specimen
              </Button>

              <Button type="submit" disabled={loading} size="lg">
                {loading ? 'Creating...' : 'Create Case'}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/cases')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
