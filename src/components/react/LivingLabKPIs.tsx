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
import { BeforeAndAfterDates, LivingLabKpiResultForm } from "./form";
import { KpiTypeBadge } from "./KpiTypeBadge";

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
    <div className="flex flex-col gap-8">
      <BeforeAndAfterDates
        onChangeBeforeDate={setBeforeDate}
        onChangeAfterDate={setAfterDate}
      />
      <Table
        dense
        striped
        className="[--gutter:--spacing(6)] sm:[--gutter:--spacing(8)]"
      >
        <TableHead>
          <TableRow>
            <TableHeader>KPI Number</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Value Before</TableHeader>
            <TableHeader>Value After</TableHeader>
          </TableRow>
        </TableHead>

        <TableBody>
          {kpis.map((kpi, idx) => (
            <TableRow key={kpi.kpi_number ?? idx}>
              <TableCell className="flex flex-col w-22">
                {kpi.kpi_number}
                <KpiTypeBadge type={kpi.type} />
              </TableCell>
              <TableCell className="max-w-48 whitespace-pre-line break-words">
                {kpi.name}
              </TableCell>
              <TableCell className="">
                <LivingLabKpiResultForm
                  livingLabId={livingLabId}
                  kpiId={kpi.id}
                  initial={livingLabKpiMap.get(kpi.id)?.result_before}
                  defaultDate={beforeDate}
                  placeholder="Before value"
                />
              </TableCell>
              <TableCell className="w-34">
                <LivingLabKpiResultForm
                  livingLabId={livingLabId}
                  kpiId={kpi.id}
                  initial={livingLabKpiMap.get(kpi.id)?.result_after}
                  defaultDate={afterDate}
                  placeholder="After value"
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
