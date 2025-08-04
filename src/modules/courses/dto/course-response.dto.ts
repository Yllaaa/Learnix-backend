export class CourseResponseDto {
  id: number;
  titleAr: string;
  titleEn: string;
  descriptionAr: string | null;
  descriptionEn: string | null;
  startDate: string | null;
  price: number | null;
  category: {
    id: number;
    nameAr: string;
    nameEn: string;
  };
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
