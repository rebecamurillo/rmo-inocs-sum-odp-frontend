import { getUrl } from "../../lib/helpers";
import type { IMeasure } from "../../types";
import { InfoCard } from "./ui/InfoCard";

type MobilityMeasuresProps = {
  pushMeasures?: IMeasure[];
  pullMeasures?: IMeasure[];
  className?: string;
  hideDescription?: boolean;
  cols?: 2 | 4;
};

type MeasuresSectionProps = {
  heading: string;
  smallText: string;
  paragraph: string;
  measures: IMeasure[];
  hideDescription?: boolean;
  cols?: 2 | 4;
};

function MeasuresSection({
  heading,
  smallText,
  paragraph,
  measures,
  hideDescription = false,
  cols = 2,
}: MeasuresSectionProps) {
  const GRID_CLASS = {
    2: "grid grid-cols-2 lg:grid-cols-2 mx-1 lg:mx-4 gap-4",
    4: "grid grid-cols-2 lg:grid-cols-4 mx-1 lg:mx-4 gap-4",
  };

  return (
    <div className="flex-1 grid grid-cols-1 gap-4">
      <h3 className="text-center">{heading}</h3>
      <small className="text-center italic min-h-10 lg:min-h-0">
        {smallText}
      </small>
      <p className="text-center">{paragraph}</p>
      <div className={GRID_CLASS[cols]}>
        {measures.map((m) => (
          <InfoCard
            key={m.name}
            title={m.name}
            description={hideDescription ? "" : m.description}
            imageUrl={getUrl(m.image_url)}
            href="#"
          />
        ))}
      </div>
    </div>
  );
}

export function MobilityMeasures({
  pushMeasures = [],
  pullMeasures = [],
  className = "",
  hideDescription = false,
  cols = 2,
}: MobilityMeasuresProps) {
  return (
    <div
      className={`flex flex-col gap-4 items-start my-4 mx-auto ${className}`}
    >
      <MeasuresSection
        heading="🔴 Push measures"
        smallText={`Push measures are restrictions designed to discourage private car use and reduce car dominance in urban environments.`}
        paragraph={``}
        measures={pushMeasures}
        hideDescription={hideDescription}
        cols={cols}
      />

      <MeasuresSection
        heading="🟢 Pull measures"
        smallText={`Pull measures are incentives and improvements that make shared mobility and public transport more attractive and accessible.`}
        paragraph={``}
        measures={pullMeasures}
        hideDescription={hideDescription}
        cols={cols}
      />
    </div>
  );
}
