export class CourseResponseDto {
  id: number;
  title: string;
  description: string | null;
  startDate: string | null;
  price: number | null;
  categories:
    | {
        id: number;
        name: string;
      }[]
    | null;
  country: {
    id: number;
    name: string;
    iso: string;
  } | null;
  city: {
    id: number;
    name: string;
  } | null;
}

export interface CourseOverviewResponseDto {
  id: number;
  title: string;
  description: string;
  startDate: Date;
  price: number;
  categories?: Array<{ id: number; name: string }>;
  trainers: Array<{
    id: number;
    name: string;
    title: string;
    linkedIn?: string;
    trainerPicture?: string;
  }>;
  curriculums: Array<{
    id: number;
    name: string;
    description: string;
  }>;
  outcomes: Array<{
    id: number;
    title: string;
    description: string;
  }>;
  city?: {
    id: number;
    name: string;
    country?: {
      id: number;
      name: string;
      iso: string;
    } | null;
  } | null;
}
