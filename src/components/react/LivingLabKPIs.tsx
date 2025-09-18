import { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../react-catalyst-ui-kit";
import type { IKpi, IIKpiResultBeforeAfter } from "../../types";
import { BeforeAndAfterDates, LivingLabKpiResultsForm } from "./form";
import { KpiTypeBadge } from "./KpiTypeBadge";
import { KpiMetricTypeBadge } from "./KpiMetricTypeBadge";
import { Badge } from "./ui";

type Props = {
  kpis: IKpi[];
  livingLabId: number;
  kpiResults: IIKpiResultBeforeAfter[];
};

export function LivingLabKPIs({
  kpis = [],
  livingLabId,
  kpiResults: livingLabKpis = [],
}: Props) {
  if (!kpis || kpis.length === 0) {
    return <div>No KPIs available.</div>;
  }

  const livingLabKpiMap = new Map(livingLabKpis.map((kpi) => [kpi.id, kpi]));
  // Data collection date input state (YYYY-MM-DD)
  const today = new Date().toISOString().slice(0, 10);
  const [beforeDate, setBeforeDate] = useState<string>(today);
  const [afterDate, setAfterDate] = useState<string>(today);

  return (
    <div className="flex flex-col gap-8 mx-auto">
      <BeforeAndAfterDates
        onChangeBeforeDate={setBeforeDate}
        onChangeAfterDate={setAfterDate}
      />
      <Table dense striped className="lg:min-w-3xl max-w-5xl">
        <TableHead>
          <TableRow>
            <TableHeader>KPI Number</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Metric unit</TableHeader>
            <TableHeader>Value Before vs After</TableHeader>
          </TableRow>
        </TableHead>

        <TableBody>
          {kpis.map((kpi, idx) => (
            <TableRow key={kpi.kpi_number ?? idx}>
              <TableCell className="flex flex-col w-22">
                {kpi.kpi_number}
                <KpiTypeBadge type={kpi.type} />
              </TableCell>
              <TableCell className="whitespace-pre-line break-words">
                {kpi.name}
                <Badge tooltip={kpi.description} size="sm" color="info" />
              </TableCell>
              <TableCell>
                <div className="flex flex-col text-xs">
                  <KpiMetricTypeBadge type={kpi.metric} />
                  {kpi.metric_description?.length &&
                    kpi.metric_description?.length > 0 && (
                      <strong>{kpi.metric_description}</strong>
                    )}
                  {typeof kpi.min_value === "number" && (
                    <span>Min: {kpi.min_value} </span>
                  )}
                  {typeof kpi.max_value === "number" && (
                    <span>Max: {kpi.max_value}</span>
                  )}
                </div>
              </TableCell>
              <TableCell className="w-20">
                <LivingLabKpiResultsForm
                  livingLabId={livingLabId}
                  kpiId={kpi.id}
                  kpiMetric={kpi.metric}
                  initialBefore={livingLabKpiMap.get(kpi.id)?.result_before}
                  initialAfter={livingLabKpiMap.get(kpi.id)?.result_after}
                  defaultBeforeDate={beforeDate}
                  defaultAfterDate={afterDate}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default LivingLabKPIs;
