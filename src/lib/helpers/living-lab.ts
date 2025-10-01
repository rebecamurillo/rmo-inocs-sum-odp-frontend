import type {
  ILivingLabPopulated,
  ITransportMode,
  IMeasure,
  IIKpiResultBeforeAfter,
} from "../../types";
import type { SplitItem } from "../../components/react/KpiCards/ModalSplitChart";
import type { MarkerData } from "../../components/react/MapViewer";

/**
 * Filter transport modes that are of type "NSM" (New Mobility Service)
 */
export function getNSMTransportModes(
  livingLab: ILivingLabPopulated,
  allTransportModes: ITransportMode[]
): ITransportMode[] {
  if (!livingLab.transport_modes || !allTransportModes) return [];

  // Get the transport mode IDs from the living lab
  const labTransportModeIds = livingLab.transport_modes.map(
    (tm) => tm.transport_mode_id
  );

  // Filter transport modes that are in the living lab and are NSM type
  return allTransportModes.filter(
    (mode) => mode.type === "NSM" && labTransportModeIds.includes(mode.id)
  );
}

/**
 * Separate measures into push and pull categories
 */
export function separateMeasures(measures: IMeasure[]): {
  pushMeasures: IMeasure[];
  pullMeasures: IMeasure[];
} {
  if (!measures) return { pushMeasures: [], pullMeasures: [] };

  return {
    pushMeasures: measures.filter((m) => m.type === "PUSH"),
    pullMeasures: measures.filter((m) => m.type === "PULL"),
  };
}

/**
 * Prepare modal split chart data from KPI results
 * KPI 15.a represents modal split per transport mode
 */
export function prepareModalSplitData(
  livingLab: ILivingLabPopulated,
  allTransportModes: ITransportMode[]
): { beforeData: SplitItem[]; afterData: SplitItem[] } {
  if (
    !livingLab.kpi_results ||
    !allTransportModes ||
    allTransportModes.length === 0
  ) {
    return { beforeData: [], afterData: [] };
  }

  // Find KPI 15.a results (modal split)
  const modalSplitKpis = livingLab.kpi_results.filter(
    (kpi) => kpi.kpi_number === "15.a"
  );

  if (modalSplitKpis.length === 0) {
    return { beforeData: [], afterData: [] };
  }

  const beforeData: SplitItem[] = [];
  const afterData: SplitItem[] = [];

  modalSplitKpis.forEach((kpi) => {
    // Find the transport mode for this KPI result
    const transportMode = allTransportModes.find(
      (tm) => tm.id === kpi.result_before?.transport_mode_id
    );

    if (transportMode) {
      if (kpi.result_before?.value) {
        beforeData.push({
          label: transportMode.name,
          value: kpi.result_before.value,
          color: transportMode.color || "#cccccc",
        });
      }

      if (kpi.result_after?.value) {
        afterData.push({
          label: transportMode.name,
          value: kpi.result_after.value,
          color: transportMode.color || "#cccccc",
        });
      }
    }
  });

  return { beforeData, afterData };
}

/**
 * Create map marker data from living lab
 */
export function createMapMarker(livingLab: ILivingLabPopulated): MarkerData {
  return {
    id: String(livingLab.id),
    name: livingLab.name,
    coordinates: {
      lat: parseFloat(livingLab.lat || "0"),
      lng: parseFloat(livingLab.lng || "0"),
    },
    radius: livingLab.radius ? livingLab.radius * 1000 : undefined, // Convert km to meters
  };
}
