import { defineConfig } from "vite";
export default defineConfig({
  base: "./",
  build: {
    rollupOptions: {
      input: [
        "index.html",
        "iso-norms.html",
        "Costs-budgets.html",
        "Software-Engineering.html",
        "Software-Architecture.html",
        "Verification-Validation.html",
        "login.html",
        "register.html",
      ],
    },
  },
});
