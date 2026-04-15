import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(async ({ command }) => {
  const plugins = [react()];

  // ✅ Load mkcert ONLY in dev
  if (command === "serve") {
    const { default: mkcert } = await import("vite-plugin-mkcert");
    plugins.push(mkcert());
  }

  return {
    plugins,
    envDir: "src/lib",
    server: {
      https: command === "serve",
      host: true,
      port: 8080,
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (id.includes("react-dom") || id.includes("/react/")) {
                return "react-vendor";
              }
              if (id.includes("recharts")) return "charts";
              if (id.includes("socket.io-client")) return "socket";
            }
          },
        },
      },
    },
  };
});
