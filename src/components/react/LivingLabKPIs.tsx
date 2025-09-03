import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../react-catalyst-ui-kit";
import type { IKpi, ILivingLabKpiResult } from "../../types";
import { LivingLabKpiResultForm } from "./form";
import { KpiTypeBadge } from "./KpiTypeBadge";

type Props = {
  kpis: IKpi[];
  livingLabId: number;
  livingLabKpis: ILivingLabKpiResult[];
};

export function LivingLabKPIs({
  kpis = [],
  livingLabId,
  livingLabKpis = [],
}: Props) {
  if (!kpis || kpis.length === 0) {
    return <div>No KPIs available.</div>;
  }

  const livingLabKpiMap = new Map(livingLabKpis.map((kpi) => [kpi.id, kpi]));

  return (
    <div>
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
                />
              </TableCell>
              <TableCell className="w-34">
                <LivingLabKpiResultForm
                  livingLabId={livingLabId}
                  kpiId={kpi.id}
                  initial={livingLabKpiMap.get(kpi.id)?.result_after}
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
