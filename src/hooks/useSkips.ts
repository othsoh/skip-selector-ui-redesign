import { useState, useEffect, useCallback } from 'react';
import { Skip, SkipAPIResponse } from '../types';
import { skipService } from '../services';

export const useSkips = (postcode: string = 'NR32', area: string = 'Lowestoft') => {
  const [state, setState] = useState<SkipAPIResponse>({
    data: [],
    loading: true,
    error: undefined,
  });

  const fetchSkips = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: undefined }));
    
    try {
      const skips = await skipService.getSkipsByLocation(postcode, area);
      setState({
        data: skips,
        loading: false,
        error: undefined,
      });
    } catch (error) {
      setState({
        data: [],
        loading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  }, [postcode, area]);

  useEffect(() => {
    fetchSkips();
  }, [fetchSkips]);

  const refetch = useCallback(() => {
    fetchSkips();
  }, [fetchSkips]);

  return {
    ...state,
    refetch,
  };
};
