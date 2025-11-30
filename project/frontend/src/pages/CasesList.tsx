import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { casesApi } from '../api/casesApi';
import { Case } from '../types/case';
import { Header } from '../components/Header';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Loader2, Network } from 'lucide-react';

export function CasesList() {
  const navigate = useNavigate();
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCases();
  }, []);

  const loadCases = async () => {
    try {
      setLoading(true);
      const data = await casesApi.getAll();
      setCases(data);
      setError(null);
    } catch (err) {
      setError('Failed to load cases');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-rainpath-gray-900 flex items-center justify-center transition-colors">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-rainpath-primary mx-auto" />
          <p className="mt-4 text-rainpath-gray-600 dark:text-rainpath-gray-300">Loading cases...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-rainpath-gray-900 flex items-center justify-center transition-colors">
        <Card className="max-w-md border-rainpath-primary shadow-lg dark:bg-rainpath-gray-800">
          <CardHeader>
            <CardTitle className="text-rainpath-primary">{error}</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={loadCases}>
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-rainpath-gray-900 transition-colors">
      <Header />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-rainpath-text dark:text-white mb-2">Cases</h1>
          <p className="text-rainpath-gray-600 dark:text-rainpath-gray-300">Manage your case collection</p>
        </div>

        {cases.length === 0 ? (
          <Card className="p-12 text-center shadow-sm dark:bg-rainpath-gray-800 dark:border-rainpath-gray-700">
            <CardContent className="space-y-4">
              <p className="text-rainpath-gray-600 dark:text-rainpath-gray-300 text-lg">No cases found</p>
              <Button asChild>
                <Link to="/create-case">
                  Create your first case
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cases.map((caseItem) => (
              <Card key={caseItem.id} className="hover:border-rainpath-primary transition hover:shadow-md dark:bg-rainpath-gray-800 dark:border-rainpath-gray-700">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <Link to={`/cases/${caseItem.id}`} className="flex-1">
                      <CardTitle className="text-xl text-rainpath-text dark:text-white hover:text-rainpath-primary transition">
                        Case #{caseItem.id}
                      </CardTitle>
                    </Link>
                    <Badge>
                      {caseItem.samples.length} {caseItem.samples.length === 1 ? 'specimen' : 'specimens'}
                    </Badge>
                  </div>
                </CardHeader>
                <Link to={`/cases/${caseItem.id}`}>
                  <CardContent className="space-y-2 text-sm text-rainpath-gray-600 dark:text-rainpath-gray-300">
                    <div className="flex justify-between">
                      <span>Blocks:</span>
                      <span className="font-medium text-rainpath-text dark:text-white">
                        {caseItem.samples.reduce((sum, s) => sum + s.blocks.length, 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Slides:</span>
                      <span className="font-medium text-rainpath-text dark:text-white">
                        {caseItem.samples.reduce(
                          (sum, s) => sum + s.blocks.reduce((bSum, b) => bSum + b.slides.length, 0),
                          0
                        )}
                      </span>
                    </div>
                  </CardContent>
                </Link>
                <CardFooter className="text-xs text-rainpath-gray-500 dark:text-rainpath-gray-400 border-t dark:border-rainpath-gray-700 pt-4 flex justify-between items-center">
                  <span>Created: {new Date(caseItem.createdAt).toLocaleDateString()}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/graph/${caseItem.id}`);
                    }}
                  >
                    <Network className="h-3 w-3 mr-1" />
                    View Graph
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
