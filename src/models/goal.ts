import { Type } from './enums/type';

export interface Goal {
  id: string;
  date: string;
  achieved: boolean;
  duration: number;
  intensity: number;
  type: Type;
  uid: string;
}