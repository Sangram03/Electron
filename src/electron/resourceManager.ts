import os from "node:os";
import osUtils from "os-utils";

const POLLING_INTERVAL = 500;

interface StorageData {
  total: number;
  usage: number;
}

interface StaticData {
  totalStorage: number;
  cpuModel: string;
  totalMemoryGB: number;
}

export function pollResources(): void {
  setInterval(async () => {
    const cpuUsage = await getCpuUsage();
    const ramUsage = getRamUsage();
    const storageData = getStorageData();

    console.log({
      cpuUsage: `${(cpuUsage * 100).toFixed(2)}%`,
      ramUsage: `${(ramUsage * 100).toFixed(2)}%`,
      storageUsage: `${(storageData.usage * 100).toFixed(2)}%`,
      totalStorage: `${storageData.total} GB`,
    });
  }, POLLING_INTERVAL);
}

export function getStaticData(): StaticData {
  const totalStorage = getStorageData().total;

  const cpuModel =
    os.cpus().length > 0
      ? os.cpus()[0].model
      : "Unknown Processor";

  const totalMemoryGB = Math.floor(os.totalmem() / 1024 / 1024 / 1024);

  return {
    totalStorage,
    cpuModel,
    totalMemoryGB,
  };
}

function getCpuUsage(): Promise<number> {
  return new Promise((resolve) => {
    osUtils.cpuUsage((usage: number) => {
      resolve(usage);
    });
  });
}

function getRamUsage(): number {
  return 1 - osUtils.freememPercentage();
}

function getStorageData(): StorageData {
  // Placeholder implementation
  // Replace with node-disk-info or another package
  return {
    total: 0,
    usage: 0,
  };
}