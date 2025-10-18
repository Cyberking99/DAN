const BACKEND_URL = import.meta.env.VITE_API_URL;

// Types
export interface User {
  id: string;
  address: string;
}

export interface Submission {
  id: number;
  title: string;
  author: string;
  abstract: string;
  ipfs_cid: string;
  status: string;
  score?: number;
  dateSubmitted: string;
  userId: string;
}

export interface Review {
  id: number;
  submissionId: number;
  ai_agent: string;
  abstract: string;
  score: number;
  methodology?: number;
  novelty?: number;
  clarity?: number;
  reproducibility?: number;
  feedback: string;
  dateReviewed: string;
  submission?: {
    title: string;
  };
}

export interface Certificate {
  id: number;
  submissionId: number;
  txHash: string;
  tokenUri: string;
  dateMinted: string;
  userId: string;
  submission?: {
    title: string;
  };
}

export interface DashboardStats {
  totalSubmissions: number;
  underReview: number;
  completed: number;
  certificates: number;
}

export interface ReviewStats {
  averageScore: number;
  reviewsCompleted: number;
  highQuality: number;
}

// API Helper
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('uploadjwt');
  
  const response = await fetch(`${BACKEND_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// API Functions
export const api = {
  // Dashboard
  async getDashboardData() {
    return apiRequest<{
      stats: DashboardStats;
      recentSubmissions: Submission[];
      recentReviews: Review[];
    }>('/dashboard');
  },

  // Submissions
  async getSubmissions(): Promise<Submission[]> {
    return apiRequest<Submission[]>('/submissions');
  },

  async submitPaper(formData: FormData) {
    const token = localStorage.getItem('uploadjwt');
    
    const response = await fetch(`${BACKEND_URL}/upload/upload`, {
      method: 'POST',
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  },

  // Reviews
  async getReviews(): Promise<{
    stats: ReviewStats;
    reviews: Review[];
  }> {
    return apiRequest<{
      stats: ReviewStats;
      reviews: Review[];
    }>('/reviews');
  },

  // Certificates
  async getCertificates(): Promise<Certificate[]> {
    return apiRequest<Certificate[]>('/certificates');
  },
};
