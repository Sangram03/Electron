import { app, BrowserWindow } from "electron";
import path from "path";

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
  });

  win.loadFile("dist-react/index.html");
}

app.whenReady().then(() => {
  createWindow();
});