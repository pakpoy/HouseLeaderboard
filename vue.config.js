const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      builderOptions: {
        appId: "com.willpakpoy.houseleaderboard",
        productName: "HouseLeaderboard",
      },
    },
  },
});
