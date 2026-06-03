import { app, BrowserWindow, WebContents } from "electron";
import path from "node:path";
import { ipcHandler, isDev } from "./util.js";
import { getStaticData, pollResources } from "./resourceManager.js";
import { getPreloadPath } from "./pathReslover.js";

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: getPreloadPath(),
    },
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5173");
  } else {
    mainWindow.loadFile(
      path.join(app.getAppPath(), "dist-react", "index.html")
    );
  }

  pollResources(mainWindow);

  ipcHandler("getStaticData", () => {
    return getStaticData();
  });
}

export function ipcWebContentsSend<
  Key extends keyof EventPayloadMapping
>(
  key: Key,
  webContents: WebContents,
  payload: EventPayloadMapping[Key]
): void {
  webContents.send(key, payload);
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});