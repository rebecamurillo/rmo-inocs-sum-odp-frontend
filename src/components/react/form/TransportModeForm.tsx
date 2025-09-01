import React, { useState, useEffect } from "react";
import { Input, Select } from "../../react-catalyst-ui-kit";
import { RButton } from "../ui";
import { type TransportMode } from "../../../types";

interface Props {
  value: TransportMode;
  onUpdate?: (data: TransportMode) => void;
  onCancel?: () => void;
  onCreate?: (data: TransportMode) => void;
}

const DEFAULT_MODE_OPTIONS = [
  "Bike",
  "Car",
  "Bus",
  "E-Scooter",
  "Train",
  "Tram",
];

export function TransportModeForm({
  value,
  onUpdate,
  onCreate,
  onCancel,
}: Props) {
  const [formValues, setFormValues] = useState<TransportMode>(value);

  // keep local form in sync if parent provides a new value
  useEffect(() => {
    setFormValues(value);
  }, [value]);

  const onFieldUpdate = (
    field: keyof TransportMode,
    value: string | number
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const onSave = () => {
    if (formValues.id) {
      onUpdate?.(formValues);
    } else {
      onCreate?.(formValues);
    }
  };

  const handleCancel = () => {
    // revert local changes and notify parent
    setFormValues(value);
    onCancel?.();
  };

  return (
    <div
      key={formValues.id}
      className="p-4 border rounded-lg bg-white shadow-sm space-y-4"
    >
      <div className="flex flex-wrap gap-4">
        {/* Mode Name */}
        <div className="flex-1 min-w-[180px]">
          <label className="block text-sm font-medium text-gray-700">
            Mode
          </label>

          <Select
            className="mt-1 w-full"
            value={formValues.name}
            onChange={(e: any) => onFieldUpdate("name", e.target.value)}
          >
            <option value="">Select...</option>
            {DEFAULT_MODE_OPTIONS.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
            <option value="Other">Other (Add new)</option>
          </Select>

          {formValues.name === "Other" && (
            <Input
              placeholder="Custom mode name"
              className="mt-2 w-full"
              value={formValues.description || ""}
              onChange={(e: any) =>
                onFieldUpdate("description", e.target.value)
              }
            />
          )}
        </div>

        {/* Type */}
        <div className="flex-1 min-w-[160px]">
          <label className="block text-sm font-medium text-gray-700">
            Type
          </label>

          <Select
            className="mt-1 w-full"
            value={formValues.type}
            onChange={(e: any) =>
              onFieldUpdate("type", e.target.value as TransportMode["type"])
            }
          >
            <option value="NSM">NSM</option>
            <option value="Public Transport">Public Transport</option>
            <option value="Private">Private</option>
          </Select>
        </div>

        {/* Status */}
        <div className="flex-1 min-w-[180px]">
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>

          <Select
            className="mt-1 w-full"
            value={formValues.status}
            onChange={(e: any) =>
              onFieldUpdate("status", e.target.value as TransportMode["status"])
            }
          >
            <option value="In Service">In Service</option>
            <option value="New">New</option>
            <option value="Optimization Scheduled">
              Optimization Scheduled
            </option>
          </Select>
        </div>
      </div>

      {/* Modal Split Data */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[140px]">
          <label className="block text-sm font-medium text-gray-700">
            Trips Count
          </label>
          <Input
            type="number"
            min={0}
            className="mt-1 w-full"
            value={formValues.trips ?? ""}
            onChange={(e: any) =>
              onFieldUpdate("trips", Number(e.target.value))
            }
          />
        </div>

        <div className="flex-1 min-w-[140px]">
          <label className="block text-sm font-medium text-gray-700">
            Passenger Km
          </label>
          <Input
            type="number"
            min={0}
            className="mt-1 w-full"
            value={formValues.passengerKm ?? ""}
            onChange={(e: any) =>
              onFieldUpdate("passengerKm", Number(e.target.value))
            }
          />
        </div>

        <div className="flex-1 min-w-[140px]">
          <label className="block text-sm font-medium text-gray-700">
            Vehicle Km
          </label>
          <Input
            type="number"
            min={0}
            className="mt-1 w-full"
            value={formValues.vehicleKm ?? ""}
            onChange={(e: any) =>
              onFieldUpdate("vehicleKm", Number(e.target.value))
            }
          />
        </div>
      </div>

      {/* Actions: Cancel + Save (bottom-right) */}
      <div className="pt-2 flex justify-end gap-2">
        <RButton variant="link" onClick={handleCancel} className="text-sm">
          Cancel
        </RButton>
        <RButton onClick={onSave} className="text-sm">
          Save
        </RButton>
      </div>
    </div>
  );
}
