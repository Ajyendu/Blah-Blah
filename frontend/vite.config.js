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
    server: {
      https: command === "serve",
      host: true,
      port: 8080,
    },
  };
});
