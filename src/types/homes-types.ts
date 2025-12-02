export interface CreateHomeData {
  homeName: string;
}
export interface Home {
  _id: string;
  homeName: string;
  rooms: string[];
}