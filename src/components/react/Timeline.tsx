// ...existing code...
import React from "react";
import { Badge } from "../react-catalyst-ui-kit";

type Step = {
  stepLabel: string;
  title: string;
  description: string;
  footnote?: string;
};

type TimelineProps = {
  title?: string;
  subtitle?: string;
  steps?: Step[];
  className?: string;
};

const defaultSteps: Step[] = [
  {
    stepLabel: "Before",
    title: "Baseline Survey",
    description:
      "We start by collecting baseline mobility KPIs in each Living Lab before any interventions are applied. This includes modal share, user preferences, and transport accessibility data.",
    footnote: "Output: 🗂️ Initial KPI dataset",
  },
  {
    stepLabel: "During",
    title: "Measures Implementation",
    description:
      "Each Living Lab implements push and pull measures. During this period, the ODP continuously gathers data on shared mobility usage and mobility infrastructure.",
    footnote: "Output: 📊 Intervention logs, updated KPIs",
  },
  {
    stepLabel: "After",
    title: "Follow-up Survey",
    description:
      "A second round of data collection measures changes in KPIs after interventions, assessing shifts in mobility behaviors and user feedback.",
    footnote: "Output: 🗂️ Post-intervention KPI dataset",
  },
  {
    stepLabel: "Reporting",
    title: "Insights and impact",
    description:
      "The ODP compares results across cities and KPIs, visualizes outcomes, and offers impact models and decision tools for planners and stakeholders.",
    footnote: "Output: 📈 Dashboards, Decision Tools",
  },
];

export function Timeline({
  title = "Monitoring measures around New Shared Mobility",
  subtitle = "From pre-implementation surveys to real-world impact analysis, here's how data flows through the SUM project.",
  steps = defaultSteps,
  className = "",
}: TimelineProps) {
  return (
    <section className={`bg-white py-16 px-4 sm:px-8 lg:px-20 ${className}`}>
      <div className="mx-auto flex flex-col gap-4">
        <ol className="items-start sm:flex">
          {steps.map((step, idx) => (
            <li key={`${step.title}-${idx}`} className="relative mb-6 sm:mb-0">
              <div className="flex items-center">
                <Badge color="orange">{step.stepLabel}</Badge>
                <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700" />
              </div>

              <div className="mt-3">
                <h5>{step.title}</h5>
                <small>{step.description}</small>
                <br></br>
                {step.footnote && <small>{step.footnote}</small>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default Timeline;
