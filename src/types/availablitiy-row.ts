export type AvailablitiyRow = {
  title: string;
  description: string;
  availablitiy: {
    basic: boolean | string;
    essentials: boolean | string;
    business: boolean | string;
  };
};
