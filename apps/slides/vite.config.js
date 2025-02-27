import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  publicDir: "../public",
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    assetsDir: "assets",
    outDir: "../dist",
    emptyOutDir: true,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: {
          reveal: ["reveal.js"],
        },
      },
    },
    target: "esnext",
    minify: "terser",
  },
});
