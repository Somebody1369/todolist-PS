const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/styles/main.scss";`,
      },
    },
  },
});
