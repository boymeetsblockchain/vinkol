export interface IStore {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  avatar?: {
    imageUrl: string;
    cloudinaryId?: string;
  };
  state: string;
  address: string;
  lat: string;
  lng: string;
  lga: string;
  bio?: string;
  isEmailVerified: boolean;
}
