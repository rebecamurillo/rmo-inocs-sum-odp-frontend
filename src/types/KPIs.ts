//Kpi interface is a compilation of tables KPIRESULT, and KPIDEFINITIONS
export interface IKpi {
  //KPIDEFINITIONS
  id: number;
  kpi_number: string;
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
}

export enum EnumKpiMetricType {
  PERCENTAGE = "percentage",
  ABSOLUTE = "absolute",
  CUSTOM_UNIT = "custom_unit",
  SCORE = "score",
}

export enum EnumKpiType {
  GLOBAL = "GLOBAL",
  LOCAL = "LOCAL",
}
