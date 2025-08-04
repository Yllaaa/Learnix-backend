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
