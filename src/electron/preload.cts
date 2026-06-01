import { contextBridge, ipcRenderer } from "electron";

/* ---------- Types ---------- */

interface Statistics {
  cpuUsage: number;
  ramUsage: number;
  storageUsage: number;
  totalStorage: number;
}

interface StaticData {
  totalStorage: number;
  cpuModel: string;
  totalMemoryGB: number;
}

interface EventPayloadMapping {
  statistics: Statistics;
  getStaticData: StaticData;
}

interface ElectronAPI {
  subscribeStatistics: (
    callback: (statistics: Statistics) => void
  ) => void;

  getStaticData: () => Promise<StaticData>;
}