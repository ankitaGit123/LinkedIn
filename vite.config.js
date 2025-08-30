// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// import tailwindcss from '@tailwindcss/vite'
// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


// export default {
//   optimizeDeps: {
//     disabled: true
//   }
// }


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
