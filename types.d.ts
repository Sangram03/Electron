export {};

declare global {
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
}