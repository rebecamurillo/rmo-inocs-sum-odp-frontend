import livinglabs from "./mock-data/living_labs_data.json";
import kpis from "./mock-data/kpis.json";
import measures from "./mock-data/measures.json";
import type { LivingLab, Measure, KPI } from "./types";

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

  async getLivingLab(id: string): Promise<LivingLab> {
    //return this.get(`/livinglabs/${encodeURIComponent(id)}`);

    const lab = livinglabs.find((lab) => lab.id === id);
    const populatedKpis = lab?.kpis?.map((kpi) => {
      const kpiData = kpis.find((k) => k.id === kpi.id) as KPI;
      return { ...kpi, ...kpiData };
    });
    const populatedMeasures = lab?.measures?.map((measure) => {
      const measureData = measures.find((m) => m.id === measure.id) as Measure;
      return { ...measure, ...measureData };
    });

    return {
      ...lab,
      kpis: populatedKpis,
      measures: populatedMeasures,
    } as LivingLab;
  }

  async getMeasures(): Promise<Measure[]> {
    //return this.get(`/measures`);

    return measures;
  }

  async getKPIs(): Promise<KPI[]> {
    //return this.get(`/kpis`);

    return kpis;
  }
}
