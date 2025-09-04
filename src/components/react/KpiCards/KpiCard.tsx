import {
  EnumKpiMetricType,
  EnumKpiType,
  type IIKpiResultBeforeAfter,
} from "../../../types";
import KpiPercentage from "./KpiPercentage";

type Props = {
  kpiResults: IIKpiResultBeforeAfter;
};

export function KpiCard({ kpiResults }: Props) {
  return (
    <div className="rounded-2xl  border-primary-light border  p-3">
      <div className="text-center">
        <div className="text-lg font-semibold text-muted">
          {kpiResults?.name ?? "KPI"}
        </div>
        {kpiResults?.description ? (
          <div className="text-sm text-muted mt-2 max-w-xl mx-auto">
            {kpiResults.description}
          </div>
        ) : null}
      </div>

      {kpiResults.metric === EnumKpiMetricType.PERCENTAGE ? (
        <KpiPercentage kpiResults={kpiResults} />
      ) : (
        <span>{kpiResults?.result_after?.value ?? "—"}</span>
      )}
    </div>
  );
}
