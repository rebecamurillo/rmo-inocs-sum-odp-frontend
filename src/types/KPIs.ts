import type { ITransportMode } from "./TransportMode";

//Kpi interface is a compilation of tables KPIRESULT, and KPIDEFINITIONS
export interface IKpi {
  //KPIDEFINITIONS
  id: number;
  kpi_number: string;
  parent_kpi_id?: number | null;
  name: string;
  description?: string;
  disclaimer?: string;
  type: EnumKpiType;
  progression_target: number;
  metric: EnumKpiMetricType;
  metric_description?: string;
}

export interface IKpiResult extends IKpi {
  //KPIRESULT
  id: number;
  kpidefinition_id: number;
  living_lab_id: number;
  value?: number;
  date?: string;
  transport_mode_id?: number;
  transport_mode?: ITransportMode;
}

export enum EnumKpiMetricType {
  PERCENTAGE = "percentage",
  RATIO = "ratio",
  ABSOLUTE = "absolute",
  CUSTOM_UNIT = "custom_unit",
  SCORE = "score",
  NONE = "none",
}

export enum EnumKpiType {
  GLOBAL = "GLOBAL",
  LOCAL = "LOCAL",
}

export interface IIKpiResultBeforeAfter extends IKpi {
  result_before?: IKpiResult | null;
  result_after?: IKpiResult | null;
}
