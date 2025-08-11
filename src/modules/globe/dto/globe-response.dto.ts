export class CountryResponseDto {
  id: number;
  name: string;
  iso: string;
}

export class CityResponseDto {
  id: number;
  name: string;
  countryId: number;
  cityPicture: string | null;
}
