"use strict";

import { app, protocol, BrowserWindow } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS3_DEVTOOLS } from "electron-devtools-installer";
const isDevelopment = process.env.NODE_ENV !== "production";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

async function createWindow(context, width, height) {
  const win = new BrowserWindow({
    width,
    height,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await win.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}}/#/${context}`);
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL(`app://./index.html/#/${context}`);
  }

  // win.on("close", async (e) => e.preventDefault()); // Prevent accidentally Cmd+W'ing the l/b
}

app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      await installExtension(VUEJS3_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow("leaderboard", 1920, 1080);
  createWindow("missioncontrol", 480, 270);
});
