import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  root: 'src', // Set the root directory to 'src'
 build: {
    lib: {
      entry: ['src/main.js'],
      fileName: (format, entryName) => `${entryName}.${format}.js`,
      cssFileName: 'index',
    },
  },
  server: {
    port: 3000, // Development server port
    open: true, // Automatically open the browser
  },
  resolve: {
    alias: {
      '@': '/src', // Alias '@' to the 'src' directory for easier imports
    },
  },
});
