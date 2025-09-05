import React, { useEffect, useState } from "react";
import { Input } from "../../react-catalyst-ui-kit/typescript/input";
import { Label } from "../../react-catalyst-ui-kit/typescript/fieldset";
import { RButton } from "../ui/RButton";
import { getUrl } from "../../../lib/helpers";
import { MapViewer, type MarkerData } from "../MapViewer";

export default function LivingLabForm() {
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [radius, setRadius] = useState("");
  const [area, setArea] = useState("");
  const [population, setPopulation] = useState("");

  const [mapMarker, setMapMarker] = useState<MarkerData | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([50, 10]);
  const [mapZoom, setMapZoom] = useState<number>(4);

  // derive a key from center so MapViewer remounts whenever center changes
  const mapKey = mapCenter ? `${mapCenter[0]},${mapCenter[1]}` : "no-center";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      name,
      latitude: parseFloat(latitude || "0"),
      longitude: parseFloat(longitude || "0"),
      radius: parseFloat(radius || "0"),
      area: area || undefined,
      population: population ? parseInt(population, 10) : undefined,
    };

    // For now we just log the captured values. Replace with real API call later.
    // Keep output minimal so it's easy to replace with fetch/axios when needed.
    // eslint-disable-next-line no-console
    window.location.href = getUrl("/lab");
  }

  useEffect(() => {
    if (latitude && longitude) {
      setMapMarker({
        id: "lab-marker",
        name,
        coordinates: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
        radius: radius ? parseFloat(radius) * 1000 : undefined, // convert km to meters
      });
      setMapCenter([parseFloat(latitude), parseFloat(longitude)]);
      setMapZoom(8);
    }
  }, [latitude, longitude, radius]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">
          Living Lab or city Name
        </label>
        <Input
          value={name}
          onChange={(e: any) => setName(e.target.value)}
          placeholder="e.g. Geneva Living Lab"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Latitude</label>
          <Input
            type="number"
            step="any"
            value={latitude}
            onChange={(e: any) => setLatitude(e.target.value)}
            placeholder="50.05"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Longitude</label>
          <Input
            type="number"
            step="any"
            value={longitude}
            onChange={(e: any) => setLongitude(e.target.value)}
            placeholder="19.94"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Activity radius (km)
          </label>
          <Input
            type="number"
            value={radius}
            onChange={(e: any) => setRadius(e.target.value)}
            placeholder="100"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Area</label>
          <Input
            value={area}
            onChange={(e: any) => setArea(e.target.value)}
            placeholder="e.g. 120 km²"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Population</label>
          <Input
            type="number"
            value={population}
            onChange={(e: any) => setPopulation(e.target.value)}
            placeholder="e.g. 500000"
          />
        </div>
      </div>

      <div className="h-[400px] rounded shadow ">
        <MapViewer
          key={mapKey}
          markers={mapMarker ? [mapMarker] : []}
          center={mapCenter}
          zoom={mapZoom ?? 8}
          className="h-full w-full z-0"
        />
      </div>

      <div className="flex gap-4">
        <RButton
          type="submit"
          variant="primary"
          text="Save Living Lab"
          href={getUrl("/lab")}
        />
        <RButton
          type="button"
          variant="secondary"
          text="Cancel"
          onClick={() => {
            setName("");
            setLatitude("");
            setLongitude("");
            setRadius("");
            setArea("");
            setPopulation("");
          }}
        />
      </div>
    </form>
  );
}
