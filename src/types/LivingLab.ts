import type { IIKpiResultBeforeAfter, IKpi, IKpiResult } from "./KPIs";
import type { IMeasure } from "./Measure";
import type { ITransportMode, ITransportModeLivingLab } from "./TransportMode";

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
  measures: IMeasure[];
  /**
   * Transport modes list — may be empty
   */
  transport_modes: ITransportModeLivingLab[];
  // allow additional unknown fields if present in future
  [key: string]: unknown;
}
