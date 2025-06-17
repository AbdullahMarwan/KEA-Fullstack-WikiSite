import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./", // ✅ ADD THIS
  plugins: [react()],
  server: {
    port: 3000,
    host: "0.0.0.0",
    cors: {
      origin: [
        "http://localhost:3000",
        "https://tmdb-client-qoa6.onrender.com",
        "https://fullstack-client-mcdp.onrender.com", // ✅ Add this
      ],
      credentials: true,
    },
    allowedHosts: [
      "tmdb-client-qoa6.onrender.com",
      "fullstack-client-mcdp.onrender.com", // ✅ Add this
    ],
  },
});
