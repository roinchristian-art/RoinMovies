
export interface Movie {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  category: string;
  year: number;
  duration: string;
  rating: number;
  aiReview?: string;
}

export type Category = 'Action' | 'Drama' | 'Sci-Fi' | 'Thriller' | 'Comedy' | 'Horror';

export const CATEGORIES: Category[] = ['Action', 'Drama', 'Sci-Fi', 'Thriller', 'Comedy', 'Horror'];
