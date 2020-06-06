import { Type } from './enums/Type';

export interface Goal {
  id: string;
  date: string;
  achieved: boolean;
  duration: number;
  intensity: number;
  type: Type;
  uid: string;
}