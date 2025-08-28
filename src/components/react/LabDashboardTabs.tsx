import { InfoAlert } from "./ui/InfoAlert";
import { Tabs } from "./ui/Tabs";
import { BellAlertIcon, DocumentCheckIcon } from "@heroicons/react/20/solid";
import { Badge, ItemCard } from "./ui";

export function LabDashboardTabs() {
  return (
    <Tabs
      align="right"
      tabs={[
        {
          id: "progress",
          label: (
            <Badge
              icon={<DocumentCheckIcon />}
              size="md"
              color="transparent"
              className="text-info"
              aria-label={`progress`}
            >
              Progress
            </Badge>
          ),
          content: (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <ItemCard
                title="KPIs before"
                subtitle="15/29 entries"
                info1="5 local"
                info2="10 global"
                className="border-info bg-info/60"
              />
              <ItemCard
                title="KPIs after"
                subtitle="15/29 entries"
                info1="5 local"
                info2="10 global"
                className="border-info/60 bg-info/20"
              />
              <ItemCard
                title="Measures"
                subtitle="10 entries"
                info1="5 push"
                info2="10 pull"
                className="border-dark/60 bg-light/20"
              />
              <ItemCard
                title="Transport"
                subtitle="10 in modal split"
                info1="5 NSM"
                info2="5 other"
                className="border-dark bg-light/50"
              />
            </div>
          ),
        },
        {
          id: "alerts",
          label: (
            <Badge
              icon={<BellAlertIcon />}
              size="md"
              color="transparent"
              className="text-warning"
              aria-label={`alerts`}
            >
              Alerts
            </Badge>
          ),
          content: (
            <InfoAlert title="Alers" variant="warning" actionText="Learn more">
              alerts
            </InfoAlert>
          ),
        },
      ]}
    />
  );
}
