import {
  EnumKpiMetricType,
  EnumKpiType,
  type IIKpiResultBeforeAfter,
} from "../../../types";
import { Badge } from "../ui";
import KpiPercentage from "./KpiPercentage";
import KpiRatio from "./KpiRatio";

type Props = {
  kpiResults: IIKpiResultBeforeAfter;
};

export function KpiCard({ kpiResults }: Props) {
  const getKpiComponent = (type: EnumKpiMetricType) => {
    switch (type) {
      case EnumKpiMetricType.PERCENTAGE:
        return <KpiPercentage kpiResults={kpiResults} />;
      case EnumKpiMetricType.RATIO:
        return <KpiRatio kpiResults={kpiResults} />;
      default:
        return (
          <p>
            Value before: {kpiResults?.result_before?.value ?? "—"}
            <br></br> Value after: {kpiResults?.result_after?.value ?? "—"}
          </p>
        );
    }
  };

  return (
    <div className="relative rounded-2xl border-primary-light border p-3">
      <div className="absolute -top-1 right-0">
        <Badge size="sm" color="light" className="rounded-2xl">
          KPI {kpiResults.kpi_number}
        </Badge>
      </div>

      <div className="text-center mt-1">
        <p>{kpiResults?.name ?? "KPI"}</p>
        {kpiResults?.description ? (
          <div className="text-sm text-muted mt-2 max-w-xl mx-auto">
            {kpiResults.description}
          </div>
        ) : null}
      </div>

      {getKpiComponent(kpiResults?.metric)}
    </div>
  );
}
