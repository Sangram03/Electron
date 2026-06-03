import { ipcMain, WebContents, WebFrameMain } from "electron";
import { pathToFileURL } from "node:url";
import { getUIPath } from "./pathResolver.js";

export function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}

export function ipcMainHandle<
  Key extends keyof EventPayloadMapping
>(
  key: Key,
  handler: () =>
    | EventPayloadMapping[Key]
    | Promise<EventPayloadMapping[Key]>
): void {
  ipcMain.handle(key, async () => {
    return await handler();
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

export function ipcHandler<
  Key extends keyof EventPayloadMapping
>(
  key: Key,
  handler: () =>
    | EventPayloadMapping[Key]
    | Promise<EventPayloadMapping[Key]>
): void {
  ipcMain.handle(key, async () => {
    return await handler();
  });
}

export function validateEventFrame(
  frame: WebFrameMain
): void {
  // Development mode
  if (
    isDev() &&
    new URL(frame.url).host === "localhost:5173"
  ) {
    return;
  }

  // Production mode
  const uiUrl = pathToFileURL(getUIPath()).toString();

  if (frame.url !== uiUrl) {
    throw new Error("Malicious event");
  }
}