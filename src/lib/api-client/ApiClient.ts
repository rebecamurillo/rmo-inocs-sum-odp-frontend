import livinglabs from "./mock-data/living_labs_data.json";
import kpis from "./mock-data/kpis.json";
import measures from "./mock-data/measures.json";
import transportModes from "./mock-data/transport_modes.json";
import type {
  IKpi,
  ILivingLabKpiResult,
  LivingLab,
  Measure,
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

  async getLivingLabWithKpisAndMeasures(id: number): Promise<LivingLab> {
    //return this.get(`/livinglabs/${encodeURIComponent(id)}`);

    const lab = livinglabs.find((lab) => lab.id === id);
    const populatedKpis = lab?.kpi_results?.map((kpi) => {
      const kpiData = kpis.find((k) => k.id === kpi.id) as IKpi;
      return {
        ...kpiData,
        result_before: { value: kpi.value_before, date: "01/01/2024" },
        result_after: { value: kpi.value_after, date: "08/01/2026" },
      } as ILivingLabKpiResult;
    });
    const populatedMeasures = lab?.measures?.map((measure) => {
      const measureData = measures.find((m) => m.id === measure.id) as Measure;
      return { ...measure, ...measureData };
    });

    const populatedTransportModes = lab?.transport_modes?.map((mode) => {
      const modeData = transportModes.find((m) => m.id === mode.id);
      return { ...mode, ...modeData };
    });

    return {
      ...lab,
      transport_modes: populatedTransportModes ?? [],
      kpi_results: populatedKpis ?? [],
      measures: populatedMeasures ?? [],
    } as LivingLab;
  }

  async getMeasures(): Promise<Measure[]> {
    //return this.get(`/measures`);

    return measures;
  }

  async getKPIs(): Promise<IKpi[]> {
    //return this.get(`/kpis`);

    return kpis as IKpi[];
  }
}
