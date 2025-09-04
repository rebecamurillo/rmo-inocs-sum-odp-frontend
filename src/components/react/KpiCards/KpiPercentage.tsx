import type { IIKpiResultBeforeAfter } from "../../../types/KPIs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  COLOR_DANGER,
  COLOR_DANGER_OPACITY_50,
  COLOR_SUCCESS,
  COLOR_SUCCESS_OPACITY_50,
} from "../../../types";
import {
  formatMonthYear,
  getChangePercent,
  getFormattedPercent,
} from "../../../lib/mappers";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

type Props = {
  kpiResults: IIKpiResultBeforeAfter;
};

function fmtNumber(v?: number | null, digits = 2) {
  if (v === undefined || v === null || Number.isNaN(v)) return "—";
  return v.toFixed(digits);
}

export function KpiPercentage({ kpiResults }: Props) {
  const before = kpiResults?.result_before ?? null;
  const after = kpiResults?.result_after ?? null;

  const displayValue = getFormattedPercent(
    after?.value ?? before?.value ?? null
  );
  const displayDate = formatMonthYear(after?.date ?? before?.date);

  const change = getChangePercent(
    before?.value ?? null,
    after?.value ?? null,
    kpiResults.progression_target
  );

  //Chartjs data
  const chartDatasets: number[] = [];
  const chartLabels: string[] = [];
  if (before?.value !== undefined && before?.value !== null) {
    chartDatasets.push(before.value * 100);
    chartLabels.push(before.date ? formatMonthYear(before.date) : "1970");
  }
  if (after?.value !== undefined && after?.value !== null) {
    chartDatasets.push(after.value * 100);
    chartLabels.push(after.date ? formatMonthYear(after.date) : "1980");
  }
  const backgroundColor = change?.startsWith("+")
    ? COLOR_SUCCESS_OPACITY_50
    : COLOR_DANGER_OPACITY_50;
  const borderColor = change?.startsWith("+") ? COLOR_SUCCESS : COLOR_DANGER;
  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "",
        data: chartDatasets,
        fill: true,
        backgroundColor,
        borderColor,
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    // scales: {
    //   y: {
    //     min: 0,
    //     max: 100,
    //   },
    // },
  };

  return (
    <div className="flex flex-col gap-3 md:gap-6">
      <div className="mt-6 flex flex-col md:flex-row md:items-end md:justify-between gap-1 md:gap-4">
        <div className="flex flex-col items-start justify-end">
          <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white leading-none">
            {displayValue}
          </h3>
          <p className="mt-2 text-lg text-muted">{displayDate}</p>
        </div>

        <div className="flex flex-col items-end justify-end mb-1">
          <div
            className={`text-lg font-semibold ${
              change?.startsWith("+") ? "text-success" : "text-danger"
            }`}
          >
            {change === null ? "" : `${change}`}
          </div>
          <span className="text-xs text-muted">
            {before?.date ? `since ${new Date(before.date).getFullYear()}` : ""}
          </span>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <Line options={chartOptions} data={chartData} className="w-full" />
      </div>
    </div>
  );
}

export default KpiPercentage;
