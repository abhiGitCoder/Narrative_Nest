import react from "@vitejs/plugin-react";
import reactRefresh from "@vitejs/plugin-react-refresh";
import laravel from "laravel-vite-plugin";
import { defineConfig } from "vite";

export default defineConfig({
    server: {
        hmr: {
            host: "localhost",
        },
    },
    plugins: [
        react(),
        reactRefresh(),
        laravel({
            input: ["resources/css/app.css", "resources/react/app.tsx"],
            refresh: true,
        }),
    ],
    optimizeDeps: {
        include: ['pdfjs-dist/build/pdf.worker.min.js']
      },
      build: {
        rollupOptions: {
          output: {
            manualChunks: {
              pdfworker: ['pdfjs-dist/build/pdf.worker.min.js'],
            },
          },
        }
    }
});
