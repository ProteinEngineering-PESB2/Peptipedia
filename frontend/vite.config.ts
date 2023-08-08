import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000,
  },
  plugins: [
    react(),
    viteCompression({ algorithm: "gzip", ext: ".gz" }),
    splitVendorChunkPlugin(),
  ],
  server: {
    host: true,
    port: 3001,
  },
});
