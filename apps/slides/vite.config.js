import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    // Optimize chunk size
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: {
          reveal: ["reveal.js"],
        },
      },
    },
    // Improve build performance
    target: "esnext",
    minify: "terser",
  },
});
