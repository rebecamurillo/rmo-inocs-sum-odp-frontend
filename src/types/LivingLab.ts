import type { IIKpiResultBeforeAfter } from "./KPIs";
import type { ILivingLabMeasure } from "./Measure";
import type { ILivingLabTransportMode } from "./TransportMode";

export interface ILivingLab {
  /**
   * Unique living lab id (e.g. "lab_munich")
   */
  id: number;
  /**
   * Human readable name (e.g. "Munich")
   */
  name: string;
  description?: string;
  lat?: string;
  lng?: string;
  radius?: number;
  area?: number;
  population?: number;
}
export interface ILivingLabPopulated extends ILivingLab {
  kpi_results: IIKpiResultBeforeAfter[];
  /**
   * Measures list — may be empty
   */
  measures: ILivingLabMeasure[];
  /**
   * Transport modes list — may be empty
   */
  transport_modes: ILivingLabTransportMode[];
  // allow additional unknown fields if present in future
  [key: string]: unknown;
}
