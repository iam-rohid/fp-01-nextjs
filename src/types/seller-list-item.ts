export type SellerListItem = {
  id: number;
  name: string;
  estimate_sales: number;
  geo_location: {
    lng: number;
    lat: number;
  };
};
