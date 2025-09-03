import { useState } from "react";
import { Field, Input, Label } from "../../react-catalyst-ui-kit";
interface Props {
  onChangeBeforeDate: (date: string) => void;
  onChangeAfterDate: (date: string) => void;
}

export function BeforeAndAfterDates({
  onChangeBeforeDate,
  onChangeAfterDate,
}: Props) {
  const today = new Date().toISOString().slice(0, 10);
  const [beforeDate, setBeforeDate] = useState<string>(today);
  const [afterDate, setAfterDate] = useState<string>(today);

  const handleBeforeDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setBeforeDate(newDate);
    onChangeBeforeDate(newDate);
  };

  const handleAfterDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setAfterDate(newDate);
    onChangeAfterDate(newDate);
  };

  return (
    <div className="mb-4 flex flex-col lg:flex-row items-center gap-8">
      <Field>
        <Label>Collection date BEFORE Implementation</Label>
        <small>This date will be set by default for all new KPIs.</small>

        <Input
          type="date"
          name="data-collection-date"
          value={beforeDate}
          onChange={handleBeforeDateChange}
          className="mt-0 m-O"
        />
      </Field>
      <Field>
        <Label>Collection date AFTER Implementation</Label>
        <small>This date will be set by default for all new KPIs.</small>
        <Input
          type="date"
          name="data-collection-date"
          value={afterDate}
          onChange={handleAfterDateChange}
          className="mt-0 m-O"
        />
      </Field>
    </div>
  );
}
