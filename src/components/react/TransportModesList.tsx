import React, { useState } from "react";
import { LivingLabTransportModeForm } from "./form/LivingLabTransportModeForm";
import {
  type ITransportMode,
  type IIKpiResultBeforeAfter,
  type IKpi,
  type ITransportModeLivingLab,
} from "../../types";
import { BeforeAndAfterDates, LivingLabKpiResultForm } from "./form";
import { TransportTypeBadge } from "./TransportTypeBadge";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../react-catalyst-ui-kit";

interface Props {
  modes: ITransportMode[];
  kpis: IKpi[];
  livingLabId: number;
  livingLabTransportModes: ITransportModeLivingLab[];
  kpiResults: IIKpiResultBeforeAfter[];
}

export function TransportModesList({
  modes = [],
  kpis = [],
  livingLabId,
  livingLabTransportModes = [],
  kpiResults = [],
}: Props) {
  const today = new Date().toISOString().slice(0, 10);
  const [beforeDate, setBeforeDate] = useState<string>(today);
  const [afterDate, setAfterDate] = useState<string>(today);

  const livingLabTransportModesMap = new Map(
    livingLabTransportModes.map((mode) => [mode.transport_mode_id, mode])
  );

  const [livingLabKpiMap, setLivingLabKpiMap] = useState<
    Map<number, IIKpiResultBeforeAfter>
  >(new Map(kpiResults.map((result) => [result.id, result])));

  return (
    <div className="bg-white shadow rounded-md">
      <BeforeAndAfterDates
        onChangeBeforeDate={setBeforeDate}
        onChangeAfterDate={setAfterDate}
      />

      <div className="p-4 overflow-x-auto">
        <Table
          dense
          striped
          className="[--gutter:--spacing(6)] sm:[--gutter:--spacing(8)]"
        >
          <TableHead>
            <TableRow>
              <TableHeader className="whitespace-normal break-words">
                Name
              </TableHeader>
              <TableHeader className="whitespace-normal break-words">
                Status
              </TableHeader>
              {kpis.map((kpi) => (
                <TableHeader
                  key={kpi.id}
                  className="font-extrabold whitespace-normal break-words text-primary"
                >
                  {kpi.name}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <tbody className="bg-white divide-y divide-gray-100">
            {modes.map((m) => (
              <TableRow key={m.id}>
                <TableCell className="max-w-52 flex flex-col break-words">
                  <TransportTypeBadge type={m.type} />
                  <label className="whitespace-normal break-words">
                    {m.name}
                  </label>
                  {m.description && (
                    <small className="italic w-48 whitespace-normal break-words">
                      {m.description}
                    </small>
                  )}
                </TableCell>
                <TableCell>
                  <LivingLabTransportModeForm
                    value={livingLabTransportModesMap.get(m.id)}
                    transportModeId={m.id}
                    livingLabId={livingLabId}
                  />
                </TableCell>
                {kpis.map((kpi) => (
                  <TableCell key={kpi.id} className="">
                    {livingLabKpiMap.get(kpi.id)?.result_before
                      ?.transport_mode_id === m.id && (
                      <small>Value before</small>
                    )}
                    <LivingLabKpiResultForm
                      livingLabId={livingLabId}
                      kpiId={kpi.id}
                      initial={livingLabKpiMap.get(kpi.id)?.result_before}
                      transportModeId={m.id}
                      defaultDate={beforeDate}
                      onChange={(result) => {
                        setLivingLabKpiMap((prev) => {
                          const newMap = new Map(prev);
                          const prevValue = prev.get(kpi.id);
                          newMap.set(kpi.id, {
                            ...prevValue,
                            result_before: {
                              // ...kpi,
                              ...prevValue?.result_before,
                              ...result,
                              // kpidefinition_id: kpi.id,
                              // living_lab_id: livingLabId,
                              // kpi_number: kpi.kpi_number,
                              // name: kpi.name,
                              // type: kpi.type,
                              // progression_target: kpi.progression_target,
                            },
                          });
                          return newMap;
                        });
                      }}
                    />
                    {livingLabKpiMap.get(kpi.id)?.result_before
                      ?.transport_mode_id === m.id && (
                      <>
                        <hr />
                        <small>Value after</small>
                        <LivingLabKpiResultForm
                          transportModeId={m.id}
                          livingLabId={livingLabId}
                          kpiId={kpi.id}
                          initial={livingLabKpiMap.get(kpi.id)?.result_after}
                          defaultDate={afterDate}
                        />
                      </>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
