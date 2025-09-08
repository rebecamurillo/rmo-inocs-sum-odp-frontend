import { useState } from "react";
import { Field, Select } from "../../react-catalyst-ui-kit";
import { Badge } from "../ui";
import {
  EnumTransportModeStatus,
  type ITransportModeLivingLab,
} from "../../../types";
import {
  PencilSquareIcon,
  CheckCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";

interface Props {
  value?: ITransportModeLivingLab;
  transportModeId: number;
  livingLabId: number;
  onCancel?: () => void;
  onChange?: (data: ITransportModeLivingLab) => void;
  onDelete?: (id: number) => void;
}

export function LivingLabTransportModeForm({
  value,
  transportModeId,
  livingLabId,
  onChange,
  onCancel,
}: Props) {
  const [editing, setEditing] = useState(false);

  const [status, setStatus] = useState<EnumTransportModeStatus>(
    value?.status ?? EnumTransportModeStatus.NOT_AVAILABLE
  );
  const [id, setId] = useState<number | undefined>(value?.id);

  const badgeConfig = {
    [EnumTransportModeStatus.NOT_AVAILABLE]: {
      color: "light",
      shortLabel: "Not Available",
    },
    [EnumTransportModeStatus.IN_SERVICE]: {
      color: "info",
      shortLabel: "In Service",
    },
    [EnumTransportModeStatus.NEW]: {
      color: "success",
      shortLabel: "New",
    },
    [EnumTransportModeStatus.OPTIMIZATION_SCHEDULED]: {
      color: "warning",
      shortLabel: "To optimize",
    },
  };

  const onFieldUpdate = (value: EnumTransportModeStatus) => {
    setStatus(value);
  };

  const handleSave = () => {
    if (id) {
      //TODO call update PUT /api/living-labs/${livingLabId}/transport-modes/${transportModeId}/${id}
    } else {
      //TODO call create POST /api/living-labs/${livingLabId}/transport-modes/${transportModeId}
      const id = Math.floor(Math.random() * 1000000); // temporary id until backend is ready
      setId(id);
    }
    //wait for previous api calls, then
    if (id && status) {
      onChange?.({
        id,
        status,
        transport_mode_id: transportModeId,
        living_lab_id: livingLabId,
      });
      setEditing(false);
    }
  };

  const handleClose = () => {
    // revert local changes and notify parent
    setStatus(value?.status ?? EnumTransportModeStatus.NOT_AVAILABLE);
    onCancel?.();
    setEditing(false);
  };

  if (!editing) {
    return (
      <div className="flex justify-end items-end gap-1 w-40">
        <Badge
          size="sm"
          color={badgeConfig[status]?.color}
          className=""
          aria-label={`${status} status in living lab`}
        >
          {badgeConfig[status]?.shortLabel}
        </Badge>
        <button
          type="button"
          aria-label="Edit"
          onClick={() => setEditing(true)}
          className="inline-flex items-center"
        >
          <PencilSquareIcon className="h-5 w-5 text-[--color-primary]" />
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSave}
      className="flex flex-col items-start space-x-3 gap-2 w-40"
    >
      <Field className="w-36">
        <Select
          name="status"
          value={status}
          onChange={(e) =>
            onFieldUpdate(e.target.value as EnumTransportModeStatus)
          }
        >
          {Object.values(EnumTransportModeStatus).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </Field>
      <div className="flex flex-row justify-end items-end w-full space-x-2">
        <button
          type="submit"
          aria-label="Save"
          onClick={handleSave}
          className="inline-flex items-center"
        >
          <CheckCircleIcon className="h-5 w-5 text-success" />
        </button>
        <button
          type="button"
          aria-label="Cancel"
          onClick={handleClose}
          className="inline-flex items-center"
        >
          <XMarkIcon className="h-5 w-5 text-dark" />
        </button>
      </div>
    </form>
  );
}
