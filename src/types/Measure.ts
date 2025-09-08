import type { ILivingLab } from "./LivingLab";

export enum MeasureType {
  PUSH = "PUSH",
  PULL = "PULL",
}

export interface IMeasure {
  id: number;
  name: string;
  type: string | MeasureType;
  description?: string;
  image_url?: string;
  // allow additional unknown fields if present in future
  [key: string]: unknown;
}

export interface ILivingLabMeasure {
  id: number;
  living_lab_id: number;
  living_lab?: ILivingLab;
  project_id: number;
  project?: IMeasure;
}
