const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: "com.willpakpoy.houseleaderboard",
        productName: "HouseLeaderboard",
      },
    },
  },
});
