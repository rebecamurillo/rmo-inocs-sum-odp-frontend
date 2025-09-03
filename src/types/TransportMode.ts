import type { IIKpiResultBeforeAfter } from "./KPIs";
import type { ILivingLab } from "./LivingLab";

export interface ITransportMode {
  id: number;
  name: string;
  description?: string;
  type: EnumTransportModeType;
}

export interface ITransportModeSplit extends ITransportMode {
  kpi_results?: IIKpiResultBeforeAfter[];
}

export interface ITransportModeLivingLab {
  id: number;
  transport_mode_id: number;
  transport_mode?: ITransportMode;
  living_lab_id: number;
  living_lab?: ILivingLab;
  status: EnumTransportModeStatus;
}

export type ITransportModeLivingLabForm = Pick<
  ITransportModeLivingLab,
  "status" | "transport_mode_id" | "living_lab_id"
> & {
  id?: number;
};

export enum EnumTransportModeType {
  NSM = "NSM",
  PUBLIC_TRANSPORT = "PUBLIC_TRANSPORT",
  PRIVATE = "PRIVATE",
}

export const TransportModeTypeLabels: Record<EnumTransportModeType, string> = {
  [EnumTransportModeType.NSM]: "New Mobility Service",
  [EnumTransportModeType.PUBLIC_TRANSPORT]: "Public Transport",
  [EnumTransportModeType.PRIVATE]: "Private Transport",
};

export enum EnumTransportModeStatus {
  IN_SERVICE = "IN_SERVICE",
  NEW = "NEW",
  OPTIMIZATION_SCHEDULED = "OPTIMIZATION_SCHEDULED",
  NOT_AVAILABLE = "NOT_AVAILABLE",
}

export const TransportModeStatusLabels: Record<
  EnumTransportModeStatus,
  string
> = {
  [EnumTransportModeStatus.IN_SERVICE]: "In Service",
  [EnumTransportModeStatus.NEW]: "New",
  [EnumTransportModeStatus.OPTIMIZATION_SCHEDULED]: "Optimization Scheduled",
  [EnumTransportModeStatus.NOT_AVAILABLE]: "Not Available",
};
