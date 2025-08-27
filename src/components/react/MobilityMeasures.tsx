import { InfoCard } from "./InfoCard";

type Measure = {
  title: string;
  description?: string;
  imageUrl?: string;
  href?: string;
  className?: string;
};

type MobilityMeasuresProps = {
  pushMeasures?: Measure[];
  pullMeasures?: Measure[];
  className?: string;
};

const defaultPush: Measure[] = [
  {
    title: "Congestion Charges",
    description:
      "Fees imposed on vehicles entering designated city areas to reduce traffic congestion.",
    imageUrl: "/icons/ticket.svg",
  },
  {
    title: "Parking Charges",
    description:
      "Increased parking fees to discourage long-term car use and promote modal shift.",
    imageUrl: "/icons/parking_sign.svg",
  },
  {
    title: "Restricted Parking",
    description:
      "Reductions in available public parking to limit car access, especially in central zones.",
    imageUrl: "/icons/no_cars.svg",
  },
  {
    title: "Limited Traffic Zone / Pedestrianisation",
    description:
      "Car-free or low-emission zones that prioritize pedestrians, cyclists, and shared mobility.",
    imageUrl: "/icons/pedestrian.svg",
  },
  {
    title: "Parking Supply Management",
    description:
      "Policies that reduce or restructure parking supply to manage demand and encourage alternatives.",
    imageUrl: "/icons/parking_sign.svg",
  },
  {
    title: "Speed Limits",
    description:
      "Lowering vehicle speed limits to improve safety and promote non-motorized travel.",
    imageUrl: "/icons/30sign.svg",
  },
];

const defaultPull: Measure[] = [
  {
    title: "Mobility Hubs",
    description:
      "Centralized locations where multiple transport modes (e.g., bikes, buses, taxis) are integrated.",
    imageUrl: "/icons/cityz_zones.svg",
  },
  {
    title: "Scheduling Integration in MaaS",
    description:
      "Coordinated schedules across transport services to streamline connections.",
    imageUrl: "/icons/time_table.svg",
  },
  {
    title: "Ticketing Integration in MaaS",
    description:
      "Unified or digital ticketing across services to simplify travel.",
    imageUrl: "/icons/mobile.svg",
  },
  {
    title: "Improved NSM Infrastructure",
    description:
      "New infrastructure like bike lanes, “park & ride” stations to support non-car travel.",
    imageUrl: "/icons/bike_lane.svg",
  },
  {
    title: "On-Demand Vehicle Sharing",
    description:
      "Access to shared vehicles (cars, bikes, e-scooters) on demand via apps or stations.",
    imageUrl: "/icons/mobile.svg",
  },
  {
    title: "Nudging / Gamification",
    description:
      "Use of rewards or games to encourage use of shared or sustainable transport.",
    imageUrl: "/icons/kid1.svg",
  },
  {
    title: "Dynamic Pricing of NSM",
    description:
      "Flexible pricing (e.g., cheaper off-peak rides) to balance demand and promote use.",
    imageUrl: "/icons/ticket.svg",
  },
  {
    title: "Improved Information Availability",
    description:
      "Real-time data on vehicle availability and travel options via digital platforms.",
    imageUrl: "/icons/mobile.svg",
  },
  {
    title: "New NSM Services Introduced",
    description:
      "Launch of bike-sharing, scooter-sharing, or other new transport options.",
    imageUrl: "/icons/e-scooter.svg",
  },
  {
    title: "New PT Infrastructure / Lines",
    description:
      "Deployment of new public transport lines like electric buses or tram extensions.",
    imageUrl: "/icons/metro_tunnel.svg",
  },
  {
    title: "Streets Retrofitting / Priority Lanes",
    description:
      "Street redesign for better walking/cycling and priority lanes for buses or shared modes.",
    imageUrl: "/icons/cityz_zones.svg",
  },
  {
    title: "Dedicated Parking for Carsharing / Micromobility",
    description:
      "Reserved spaces to support the use of shared cars or micromobility vehicles.",
    imageUrl: "/icons/bycicle_parking.svg",
  },
  {
    title: "Widening PT Geographical Area",
    description:
      "Extending public transport coverage to reach underserved zones.",
    imageUrl: "/icons/metro_map.svg",
  },
  {
    title: "Central PT Planning Program",
    description:
      "Comprehensive public transport network planning to enhance coordination and efficiency.",
    imageUrl: "/icons/cityz_zones.svg",
  },
];

export function MobilityMeasures({
  pushMeasures = defaultPush,
  pullMeasures = defaultPull,
  className = "",
}: MobilityMeasuresProps) {
  return (
    <div className={`flex flex-col md:flex-row gap-4 items-start ${className}`}>
      <div className="flex-1 grid grid-cols-1 gap-4">
        <h3 className="text-center">🔴 Push measures</h3>
        <small className="text-center italic min-h-10 lg:min-h-0">
          aim to “push” users away from unsustainable travel modes like private
          vehicles.
        </small>
        <p className="text-center">
          Push measures are restrictions designed to discourage private car use
          and reduce car dominance in urban environments.
        </p>
        <div className="grid grid-cols-2 mx-1 lg:mx-4 gap-4">
          {pushMeasures.map((m) => (
            <InfoCard
              key={m.title}
              title={m.title}
              description={m.description}
              imageUrl={m.imageUrl}
              href={m.href}
              className={m.className}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 gap-4">
        <h3 className="text-center min-h-10 lg:min-h-0">🟢 Pull measures</h3>
        <small className="text-center italic min-h-10 lg:min-h-0">
          aim to “pull” people toward sustainable options by improving the
          experience.
        </small>
        <p className="text-center">
          Pull measures are incentives and improvements that make shared
          mobility and public transport more attractive and accessible.
        </p>
        <div className="grid grid-cols-2 mx-1 lg:mx-4 gap-4">
          {pullMeasures.map((m) => (
            <InfoCard
              key={m.title}
              title={m.title}
              description={m.description}
              imageUrl={m.imageUrl}
              href={m.href}
              className={m.className}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MobilityMeasures;
