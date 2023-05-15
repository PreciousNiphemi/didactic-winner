export interface RootState {
  savedCities: CityType[];
}

export type CityType = {
  id: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
};
