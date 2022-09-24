import { ServiceWorkerGlobalScope } from "@/types/service-worker";

declare let self: ServiceWorkerGlobalScope;

console.log("SW: Hello from service worker!");

self.addEventListener("activate", () => console.log("SW: activate"));

self.addEventListener("install", () => console.log("SW: install"));

self.addEventListener("fetch", (event) => {
  console.log("SW: fetch", event?.request.url);
  event?.respondWith(fetch(event?.request));
});
