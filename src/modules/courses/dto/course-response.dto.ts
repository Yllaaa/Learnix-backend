export class LocalizedCourseResponseDto {
  id: number;
  title: string;
  description: string | null;
  startDate: string | null;
  price: number | null;
  category: {
    id: number;
    name: string;
  };
  country: {
    id: number;
    name: string;
  } | null;
  city: {
    id: number;
    name: string;
  } | null;
}

export interface LocalizedCourseDetailResponseDto {
  id: number;
  title: string;
  description: string;
  startDate: Date;
  price: number;
  category?: {
    id: number;
    name: string;
  } | null;
  trainers: Array<{
    id: number;
    name: string;
    title: string;
    linkedIn?: string;
  }>;
  curriculums: Array<{
    id: number;
    name: string;
    description: string;
  }>;
}
