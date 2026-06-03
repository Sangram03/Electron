import { ipcMain, WebContents } from "electron";

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

// Generic IPC handler
export function ipcHandler<
  Key extends keyof EventPayloadMapping
>(
  key: Key,
  handler: () => EventPayloadMapping[Key] | Promise<EventPayloadMapping[Key]>
): void {
  ipcMain.handle(key, async () => {
    return await handler();
  });
}