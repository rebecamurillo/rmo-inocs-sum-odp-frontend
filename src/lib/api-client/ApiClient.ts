import livinglabs from "./mock-data/living_labs_data.json";
import kpis from "./mock-data/kpis.json";
import measures from "./mock-data/measures.json";
import transportModes from "./mock-data/transport_modes.json";
import type {
  IKpi,
  IIKpiResultBeforeAfter,
  ILivingLab,
  Measure,
  ITransportMode,
  ITransportModeLivingLab,
} from "../../types";

export default class ApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  constructor(baseUrl: string = "http://localhost:8080") {
    this.baseUrl = baseUrl.replace(/\/+$/, ""); // strip trailing slashes
  }

  private async get<T = any>(path: string): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const res = await fetch(url, {
      method: "GET",
      headers: this.defaultHeaders,
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(
        `Request failed: ${res.status} ${res.statusText} ${
          text ? `- ${text}` : ""
        }`
      );
    }
    return (await res.json()) as T;
  }

  async getLivingLabAndData(id: number): Promise<ILivingLab> {
    //return this.get(`/livinglabs/${encodeURIComponent(id)}`);

    const lab = livinglabs.find((lab) => lab.id === id);
    const populatedKpis = lab?.kpi_results?.map((kpi) => {
      const kpiData = kpis.find((k) => k.id === kpi.id) as IKpi;
      return {
        ...kpiData,
        result_before: {
          value: kpi.value_before,
          date: "01/01/2024",
          id: Math.random(),
        },
        result_after: {
          value: kpi.value_after,
          date: "08/01/2026",
          id: Math.random(),
        },
      } as IIKpiResultBeforeAfter;
    });
    const populatedMeasures = lab?.measures?.map((measure) => {
      const measureData = measures.find((m) => m.id === measure.id) as Measure;
      return { ...measure, ...measureData };
    });

    const populatedTransportModes = lab?.transport_modes?.map((mode) => {
      const modeData = transportModes.find((m) => m.id === mode.id);
      return {
        ...mode,
        ...modeData,
        transport_mode_id: modeData?.id,
        living_lab_id: lab.id,
        id: Math.random(), // mock unique id
      } as ITransportModeLivingLab;
    });

    return {
      ...lab,
      transport_modes: populatedTransportModes ?? [],
      kpi_results: populatedKpis ?? [],
      measures: populatedMeasures ?? [],
    } as ILivingLab;
  }

  async getMeasures(): Promise<Measure[]> {
    //return this.get(`/measures`);

    return measures;
  }

  async getKPIs({ kpi_number }: { kpi_number?: string }): Promise<IKpi[]> {
    //return this.get(`/kpis`);

    if (kpi_number) {
      const parentKpi = kpis.filter(
        (kpi) => kpi.kpi_number === kpi_number
      ) as IKpi[];
      const childrenKpis = kpis.filter(
        (kpi) => kpi.parent_kpi_id === parentKpi[0]?.id
      ) as IKpi[];

      return [...parentKpi, ...childrenKpis];
    }

    return kpis as IKpi[];
  }

  async getTransportModes(): Promise<ITransportMode[]> {
    //return this.get(`/transport_modes`);

    return transportModes as ITransportMode[];
  }
}
