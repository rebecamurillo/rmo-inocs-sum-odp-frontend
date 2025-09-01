export type TransportMode = {
  id?: number;
  name: string;
  description?: string;
  type: TransportModeType;
  status: TransportModeStatus;
  trips?: number;
  passengerKm?: number;
  vehicleKm?: number;
};

export enum TransportModeType {
  NSM = "NSM",
  PUBLIC_TRANSPORT = "PUBLIC_TRANSPORT",
  PRIVATE = "PRIVATE",
}

export const TransportModeTypeLabels: Record<TransportModeType, string> = {
  [TransportModeType.NSM]: "New Mobility Service",
  [TransportModeType.PUBLIC_TRANSPORT]: "Public Transport",
  [TransportModeType.PRIVATE]: "Private Transport",
};

export enum TransportModeStatus {
  IN_SERVICE = "in_service",
  NEW = "new",
  OPTIMIZATION_SCHEDULED = "optimization_scheduled",
}

export const TransportModeStatusLabels: Record<TransportModeStatus, string> = {
  [TransportModeStatus.IN_SERVICE]: "In Service",
  [TransportModeStatus.NEW]: "New",
  [TransportModeStatus.OPTIMIZATION_SCHEDULED]: "Optimization Scheduled",
};
