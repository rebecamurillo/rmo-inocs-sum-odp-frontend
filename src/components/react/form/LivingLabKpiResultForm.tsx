import React, { useState } from "react";
import {
  PencilSquareIcon,
  CheckCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import type { IKpiResult } from "../../../types/KPIs";
import { Field, Input, Label } from "../../react-catalyst-ui-kit";
import { formatDate } from "../../../lib/mappers";

type Props = {
  livingLabId: number;
  kpiId: number;
  initial?: IKpiResult | null;
  onChange?: (result: Pick<IKpiResult, "id" | "value" | "date">) => void;
};

export function LivingLabKpiResultForm({
  livingLabId,
  kpiId,
  initial,
  onChange,
}: Props) {
  const _setValue = (value?: number | undefined) => {
    return initial?.value !== undefined && initial?.value !== null
      ? Math.round(Number(initial.value) * 100) / 100
      : undefined;
  };
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState<number | undefined>(
    _setValue(initial?.value)
  );
  const [date, setDate] = useState<string>(formatDate(initial?.date));

  const openEdit = () => setEditing(true);

  const handleSave = (e?: React.FormEvent) => {
    e?.preventDefault();

    let id = initial?.id;
    if (id) {
      //TODO update with id PUT /api/living-lab/${livingLabId}/kpi/${kpiId}/result/${id}
    } else {
      //TODO create POST /api/living-lab/${livingLabId}/kpi/${kpiId}/result
      id = Date.now();
    }

    onChange?.({
      id,
      value: Number(value),
      date: date,
    });
    setEditing(false);
  };

  const handleClose = () => {
    setValue(_setValue(initial?.value));
    initial?.date ? setDate(initial?.date) : setDate("");
    setEditing(false);
  };

  if (!editing) {
    return (
      <div className="flex items-start gap-1  w-34">
        <div className="flex flex-col flex-1">
          <p>{value ?? "-"}</p>
          <small>{date}</small>
        </div>
        <button
          type="button"
          aria-label="Edit"
          onClick={openEdit}
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
      className="flex flex-col items-start space-x-3 gap-2 w-34"
    >
      <Field className="w-32">
        <Label>Value</Label>
        <Input
          type="number"
          name="value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="mt-0 m-O"
        />
      </Field>

      <Field className="w-32">
        <Label>Date</Label>
        <Input
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
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

export default LivingLabKpiResultForm;
