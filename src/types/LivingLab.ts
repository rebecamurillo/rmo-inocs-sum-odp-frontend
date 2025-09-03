import type { IIKpiResultBeforeAfter, IKpi, IKpiResult } from "./KPIs";
import type { Measure } from "./Measure";
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
  kpi_results: IIKpiResultBeforeAfter[];
  /**
   * Measures list — may be empty
   */
  measures: Measure[];
  /**
   * Transport modes list — may be empty
   */
  transport_modes: ITransportModeLivingLab[];
  // allow additional unknown fields if present in future
  [key: string]: unknown;
}
