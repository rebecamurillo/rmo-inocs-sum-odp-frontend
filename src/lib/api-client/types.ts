// Type definitions for living labs mock data

export type KPIValueType =
  | "percentage"
  | "custom_unit"
  | "ratio"
  | "score"
  | string;

export interface KPI {
  /**
   * Unique KPI id (e.g. "kpi_1", "kpi_10.1.1")
   */
  id: string;
  /**
   * Human readable name
   */
  name: string;
  type: string;
  /**
   * Progression target (in the JSON it's numeric 0/1)
   */
  progression_target: number;
  /**
   * Value type string (use KPIValueType union for common values)
   */
  value_type: KPIValueType;
  /**
   * Minimum valid value (may be null or absent)
   */
  value_min?: number | null;
  /**
   * Maximum valid value (may be null or absent)
   */
  value_max?: number | null;
  /**
   * Value before intervention / baseline
   */
  value_before?: number;
  /**
   * Value after intervention / modeled result
   */
  value_after?: number;
  // allow additional unknown fields if present in future
  [key: string]: unknown;
}

export interface Measure {
  /**
   * Unique measure id (e.g. "measure_001")
   */
  id: string;
  /**
   * Human readable name
   */
  name: string;
  // allow additional unknown fields if present in future
  type: string;
  imageUrl?: string;
  [key: string]: unknown;
}

export interface LivingLab {
  /**
   * Unique living lab id (e.g. "lab_munich")
   */
  id: string;
  /**
   * Human readable name (e.g. "Munich")
   */
  name: string;
  /**
   * KPI list — may be empty or omitted
   */
  kpis?: KPI[];
  /**
   * Measures list — may be empty
   */
  measures?: Measure[];
  /**
   * Transport modes list — may be empty
   */
  transport_modes?: TransportMode[];
  // allow additional unknown fields if present in future
  [key: string]: unknown;
}

export interface TransportMode {
  /**
   * Human readable name (e.g. "Motorcycle / Scooter")
   */
  name: string;
  /**
   * Description of the transport mode
   */
  description: string;
  /**
   * Type of transport mode (e.g. "PRIVATE")
   */
  type: string;
  // allow additional unknown fields if present in future
  [key: string]: unknown;
}
