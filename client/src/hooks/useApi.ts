import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, Submission, Review, Certificate, DashboardStats, ReviewStats } from '@/services/api';
import { toast } from 'sonner';

// Dashboard hook
export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: api.getDashboardData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Submissions hook
export function useSubmissions() {
  return useQuery({
    queryKey: ['submissions'],
    queryFn: api.getSubmissions,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Submit paper mutation
export function useSubmitPaper() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.submitPaper,
    onSuccess: () => {
      // Invalidate and refetch related queries
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['certificates'] });
      
      toast.success('Paper submitted successfully!', {
        description: 'Your submission is being processed by our AI agents.',
      });
    },
    onError: (error: Error) => {
      toast.error('Submission failed', {
        description: error.message,
      });
    },
  });
}

// Reviews hook
export function useReviews() {
  return useQuery({
    queryKey: ['reviews'],
    queryFn: api.getReviews,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Certificates hook
export function useCertificates() {
  return useQuery({
    queryKey: ['certificates'],
    queryFn: api.getCertificates,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}
