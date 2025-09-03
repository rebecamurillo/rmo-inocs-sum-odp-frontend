import type { IKpi, IKpiResult } from "./KPIs";
import type { Measure } from "./Measure";
import type { TransportMode } from "./TransportMode";

export interface LivingLab {
  /**
   * Unique living lab id (e.g. "lab_munich")
   */
  id: number;
  /**
   * Human readable name (e.g. "Munich")
   */
  name: string;
  kpi_results: ILivingLabKpiResult[];
  /**
   * Measures list — may be empty
   */
  measures: Measure[];
  /**
   * Transport modes list — may be empty
   */
  transport_modes: TransportMode[];
  // allow additional unknown fields if present in future
  [key: string]: unknown;
}

export interface ILivingLabKpiResult extends IKpi {
  result_before?: IKpiResult | null;
  result_after?: IKpiResult | null;
}
