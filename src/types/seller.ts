export type Seller = {
  id: number;
  created_at: string;
  updated_at?: string;
  name: string;
  estimate_sales: number;
  geo_location: {
    lng: number;
    lat: number;
  };
};
