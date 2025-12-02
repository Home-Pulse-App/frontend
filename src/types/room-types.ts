export interface CreateRoomData {
  roomName: string;
}
export interface Room {
  _id: string;
  roomName: string;
  homeId: string;
  devices: string[];
}