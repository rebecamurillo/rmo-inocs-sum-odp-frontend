import React, { useState, useEffect } from "react";
import { RButton } from "./ui";

type LivingLab = {
  id: string;
  name: string;
  coordinates: { lat: number; lng: number };
  radius: number;
  status: "complete" | "incomplete" | "in-progress";
  totalMeasures: number;
  kpisBefore: number;
  kpisAfter: number;
  transportModes: number;
  sustainablePercentage: number;
};

type Props = {
  labs: LivingLab[];
};

export function LivingLabsMapSection({ labs }: Props) {
  const [selectedLab, setSelectedLab] = useState<LivingLab | null>(null);

  // state to hold dynamically imported components
  const [leafletComponents, setLeafletComponents] = useState<any | null>(null);

  useEffect(() => {
    let mounted = true;
    // load react-leaflet components and CSS on the client only
    async function loadLeaflet() {
      if (typeof window === "undefined") return;
      try {
        const comps = await import("react-leaflet");
        // dynamically load css so server doesn't try to process it at build time
        await import("leaflet/dist/leaflet.css");
        if (mounted) setLeafletComponents(comps);
      } catch (e) {
        // optional: handle or log load failure
        if (mounted) setLeafletComponents(null);
      }
    }
    loadLeaflet();
    return () => {
      mounted = false;
    };
  }, []);

  const getStatusColor = (status: LivingLab["status"]) => {
    switch (status) {
      case "complete":
        return "bg-success";
      case "incomplete":
        return "bg-danger";
      case "in-progress":
        return "bg-warning";
    }
  };

  return (
    <section className="bg-light py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-dark mb-2">
            Living Labs Across Europe
          </h2>
          <p className="text-dark text-lg">
            Explore where shared mobility innovation is happening with the SUM
            project. Click on a city or map marker to view details.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2 h-[600px] rounded shadow overflow-hidden">
            {/* <div className=""> */}
            {!leafletComponents && (
              <div className="flex items-center justify-center h-full w-full bg-gray-100 text-gray-600">
                Loading map...
              </div>
            )}

            {leafletComponents &&
              (() => {
                const { MapContainer, TileLayer, Marker, Popup, Circle } =
                  leafletComponents as any;
                return (
                  <MapContainer
                    center={[48.85, 2.35]}
                    zoom={5}
                    scrollWheelZoom={false}
                    className="h-full w-full z-0"
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://osm.org">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {labs.map((lab) => (
                      <>
                        <Marker
                          key={lab.id}
                          position={[lab.coordinates.lat, lab.coordinates.lng]}
                          eventHandlers={{
                            click: () => setSelectedLab(lab),
                          }}
                        />
                        <Circle
                          center={[lab.coordinates.lat, lab.coordinates.lng]}
                          radius={lab.radius}
                          pathOptions={{ color: "#2563eb", fillOpacity: 0.2 }}
                        />
                      </>
                    ))}
                  </MapContainer>
                );
              })()}
            {/* </div> */}
            {/* Slide-up Detail Panel */}
            {selectedLab && (
              <div className=" lg:mr-80 bg-white rounded-lg p-3 shadow border border-primary sticky bottom-0 left-0 z-50">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-primary">
                    {selectedLab.name} – Living Lab Overview
                  </h4>
                  <button
                    onClick={() => setSelectedLab(null)}
                    className="text-sm text-danger hover:underline"
                  >
                    Close
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-1 text-sm">
                  <div>
                    <div className="text-dark font-semibold">
                      Total Measures
                    </div>
                    <div className="text-gray-700">
                      {selectedLab.totalMeasures}
                    </div>
                  </div>
                  <div>
                    <div className="text-dark font-semibold">
                      Transport Modes
                    </div>
                    <div className="text-gray-700">
                      {selectedLab.transportModes}
                    </div>
                  </div>
                  <div>
                    <div className="text-dark font-semibold">KPIs (Before)</div>
                    <div className="text-gray-700">
                      {selectedLab.kpisBefore}
                    </div>
                  </div>
                  <div>
                    <div className="text-dark font-semibold">KPIs (After)</div>
                    <div className="text-gray-700">{selectedLab.kpisAfter}</div>
                  </div>
                  <div>
                    <div className="text-dark font-semibold">
                      Sustainable Modal Split
                    </div>
                    <div className="text-success font-medium">
                      {selectedLab.sustainablePercentage * 100}%
                    </div>
                  </div>
                </div>

                <div className="mt-2 flex flex-wrap gap-1 justify-center">
                  <RButton
                    variant="primary"
                    href={`/lab-dashboard/${selectedLab.id}`}
                  >
                    🔍 Explore {selectedLab.name} Living Lab
                  </RButton>
                  {/* <button className="bg-secondary text-white px-4 py-2 rounded hover:bg-dark transition">
                    ➕ More About This Lab
                  </button> */}
                </div>
              </div>
            )}
          </div>

          {/* City List */}
          <div className="grid grid-cols-2 gap-4">
            {labs.map((lab) => (
              <div
                key={lab.id}
                onClick={() => setSelectedLab(lab)}
                className={`cursor-pointer p-4 rounded shadow bg-white hover:bg-primary-light transition border-l-4 ${getStatusColor(
                  lab.status
                )}`}
              >
                <h5 className="font-semibold text-primary">{lab.name}</h5>
                <p>
                  {lab.totalMeasures} Measures <br />
                  {lab.transportModes} Modes
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
