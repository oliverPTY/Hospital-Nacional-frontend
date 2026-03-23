export interface RoomGroup {
  id: string;
  name: string;
  rooms: string[];
}

export interface Patient {
  data: PacientItems[];
  total: number;
  page: number;
  totalPages: number;
}

export interface PacientItems {
  id: string;
  fullName: string;
  age: number;
  gender: 'M' | 'F';
  doctorId: string;
  diagnosis: string;
  instructions: string[];
  room: string;
  status: string;
  bed: string;
}