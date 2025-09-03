export enum MeasureType {
  PUSH = "PUSH",
  PULL = "PULL",
}

export interface Measure {
  id: number;
  name: string;
  type: string | MeasureType;
  // allow additional unknown fields if present in future
  [key: string]: unknown;
}
