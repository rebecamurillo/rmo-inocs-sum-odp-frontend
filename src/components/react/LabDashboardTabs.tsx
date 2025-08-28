import { InfoAlert } from "./ui/InfoAlert";
import { Tabs } from "./ui/Tabs";
import { BellAlertIcon, DocumentCheckIcon } from "@heroicons/react/20/solid";
import { Badge, ItemCard } from "./ui";
import type { ReactNode } from "react";

export interface ProgressItemProps {
  id?: string;
  title: string;
  subtitle?: string;
  info1?: string;
  info2?: string;
  className?: string;
  icon?: ReactNode;
  // allow extra fields if needed
  [key: string]: unknown;
}

export interface AlertItemProps {
  id?: string;
  title: string;
  variant?: "info" | "warning" | "error" | "success" | string;
  actionText?: string;
  children?: ReactNode;
  [key: string]: unknown;
}

export function LabDashboardTabs({
  progress = [],
  alerts = [],
}: {
  progress: ProgressItemProps[];
  alerts: AlertItemProps[];
}) {
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
              {progress.map((p) => (
                <ItemCard key={p.title} {...p} />
              ))}
              {/* <div className="hidden lg:block col-span-2 lg:col-span-4">
								<Timeline steps={steps} className="mx-auto" />
							</div> */}
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
            <div className="grid grid-cols-2 gap-4">
              {alerts.map((alert) => (
                <InfoAlert
                  key={alert.id}
                  title={alert.title}
                  variant={alert.variant}
                  actionText={alert.actionText}
                >
                  {alert.children}
                </InfoAlert>
              ))}
            </div>
          ),
        },
      ]}
    />
  );
}
