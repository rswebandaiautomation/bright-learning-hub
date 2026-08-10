// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    plugins: [
      VitePWA({
        registerType: "autoUpdate",
        outDir: "dist/client",
        injectRegister: null,
        filename: "sw.js",
        devOptions: { enabled: false },
        manifest: {
          name: "BELIGHT TECH E-Learning Platform",
          short_name: "BELIGHT TECH",
          description:
            "Practical technology education with structured lessons, quizzes, assessments, projects and certificates.",
          id: "/",
          start_url: "/",
          scope: "/",
          display: "standalone",
          orientation: "any",
          background_color: "#ffffff",
          theme_color: "#3da5f5",
          icons: [
            { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
            { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
            {
              src: "/icon-maskable-512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable",
            },
          ],
        },
        workbox: {
          navigateFallbackDenylist: [/^\/~oauth/, /^\/api\//],
          globPatterns: ["**/*.{js,css,html,svg,png,ico,webp,woff2}"],
          runtimeCaching: [
            {
              urlPattern: ({ request }) => request.mode === "navigate",
              handler: "NetworkFirst",
              options: {
                cacheName: "belight-pages",
                networkTimeoutSeconds: 5,
                expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 },
              },
            },
            {
              urlPattern: ({ request, sameOrigin }) =>
                sameOrigin && ["style", "script", "worker", "image", "font"].includes(request.destination),
              handler: "CacheFirst",
              options: {
                cacheName: "belight-assets",
                expiration: { maxEntries: 120, maxAgeSeconds: 60 * 60 * 24 * 30 },
              },
            },
          ],
        },
      }),
    ],
  },
});
