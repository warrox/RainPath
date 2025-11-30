import { useState, useEffect } from 'react';
import { casesApi } from '../api/casesApi';
import { Case } from '../types/case';

interface UseCaseResult {
  caseData: Case | null;
  loading: boolean;
  error: string | null;
}

export function useCase(id: string | undefined): UseCaseResult {
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Invalid case ID');
      setLoading(false);
      return;
    }

    const loadCase = async () => {
      try {
        setLoading(true);
        const data = await casesApi.getById(parseInt(id));
        setCaseData(data);
        setError(null);
      } catch (err) {
        setError('Failed to load case');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCase();
  }, [id]);

  return { caseData, loading, error };
}
