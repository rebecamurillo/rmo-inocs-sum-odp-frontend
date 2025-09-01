import React, { useState } from "react";
import { TransportModeForm } from "./form/TransportModeForm";
// using plain HTML table with Tailwind classes (react-catalyst-ui-kit does not export a Table here)
import { RButton } from "./ui";
import {
  TransportModeStatus,
  TransportModeType,
  type TransportMode,
} from "../../types";
import { TrashIcon, PencilIcon } from "@heroicons/react/20/solid";

interface Props {
  modes: TransportMode[];
}

/**
 * TransportModesList
 * - shows a table of transport modes and modal-split columns
 * - allows adding a new entry (opens form at top)
 * - allows editing a row (toggles form under the row)
 */
export function TransportModesList({ modes = [] }: Props) {
  const [rows, setRows] = useState<TransportMode[]>(modes || []);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const handleAddClick = () => setShowCreateForm(true);

  const handleCreate = (data: TransportMode) => {
    //temporarily add id for new rows, while data is mocked
    setRows((r) => [...r, { ...data, id: Date.now() }]);
  };

  const handleUpdate = (data: TransportMode) => {
    setRows((prev) => prev.map((r) => (r.id === data.id ? data : r)));
    setExpanded((e) => ({ ...e, [data.id!]: false }));
  };

  const handleDelete = (id: number) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
    setExpanded((e) => {
      const newExpanded = { ...e };
      delete newExpanded[id];
      return newExpanded;
    });
  };

  const handleCancel = (id?: number) => {
    if (id) {
      setExpanded((e) => ({ ...e, [id]: false }));
    }
    setShowCreateForm(false);
  };

  const toggleRow = (id: number) => {
    setExpanded((e) => ({ ...e, [id]: true }));
  };

  return (
    <div className="bg-white shadow rounded-md">
      <div className="p-4 flex items-center justify-between">
        <h3 className="text-lg font-medium">Transport modes</h3>
        <RButton variant="primary" onClick={handleAddClick}>
          + Add mode
        </RButton>
      </div>

      {showCreateForm && (
        <div className="p-4 border-t">
          <TransportModeForm
            value={{
              id: 0,
              name: "",
              description: "",
              type: TransportModeType.NSM,
              status: TransportModeStatus.IN_SERVICE,
              trips: 0,
              passengerKm: 0,
              vehicleKm: 0,
            }}
            onCreate={handleCreate}
            onUpdate={() => {}}
            onCancel={handleCancel}
          />
        </div>
      )}

      <div className="p-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Type
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Name / Description
              </th>
              <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700">
                Trips
              </th>
              <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700">
                Passenger Km
              </th>
              <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700">
                Vehicle Km
              </th>
              <th className="px-4 py-2 text-right text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {rows.map((m) => (
              <React.Fragment key={m.id}>
                <tr>
                  <td className="px-4 py-3 align-top text-sm">{m.type}</td>
                  <td className="px-4 py-3 align-top text-sm">
                    <div className="font-medium">{m.name}</div>
                    {m.description && (
                      <div className="text-sm text-gray-500">
                        {m.description}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 align-top text-sm text-right">
                    {m.trips ?? "-"}
                  </td>
                  <td className="px-4 py-3 align-top text-sm text-right">
                    {m.passengerKm ?? "-"}
                  </td>
                  <td className="px-4 py-3 align-top text-sm text-right">
                    {m.vehicleKm ?? "-"}
                  </td>
                  <td className="px-4 py-3 align-top text-sm text-right">
                    <div className="flex justify-end gap-4">
                      <RButton
                        variant="link"
                        className="text-primary"
                        onClick={() => m.id && toggleRow(m.id)}
                      >
                        <PencilIcon className="h-5 w-5" aria-hidden="true" />
                      </RButton>
                      <RButton
                        variant="link"
                        className="text-red-600 py-0 px-0"
                        onClick={() => m.id && handleDelete(m.id)}
                      >
                        <TrashIcon className="h-5 w-5" aria-hidden="true" />
                      </RButton>
                    </div>
                  </td>
                </tr>

                {m?.id !== undefined && expanded[m?.id] && (
                  <tr className="bg-gray-50">
                    <td colSpan={6} className="p-4">
                      <TransportModeForm
                        value={m}
                        onUpdate={handleUpdate}
                        onCreate={() => {}}
                        onCancel={handleCancel}
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
