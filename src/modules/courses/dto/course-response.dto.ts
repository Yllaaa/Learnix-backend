export class CourseResponseDto {
  id: number;
  title: string;
  description: string | null;
  startDate: string | null;
  price: number | null;
  countryId: number | null;
  cityId: number | null;
  country: {
    id: number;
    name: string;
    nameEr: string;
  } | null;
  city: {
    id: number;
    name: string;
    nameEr: string;
  } | null;
}
