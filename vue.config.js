const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: "src/preload.js",
      builderOptions: {
        appId: "com.willpakpoy.houseleaderboard",
        productName: "HouseLeaderboard",
      },
    },
  },
});
