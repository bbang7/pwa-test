const CACHE_NAME = "PWA_TEST";
const DB_NAME = "PWAtest";
const DB_VERSION = 1;
const DB_STORE_NAME = "PWAtestStore";

async function cacheCoreAssets() {
  const cache = await caches.open(CACHE_NAME);
  return await cache.addAll([
    "/",
    "/imdb-logo.svg",
    "/rotten-tomatoes-logo.svg",
  ]);
}

self.addEventListener("install", (event) => {
  event.waitUntil(cacheCoreAssets());
  self.skipWaiting();
});

async function clearOldCaches() {
  const cacheNames = await caches.keys();
  return await Promise.all(
    cacheNames
      .filter((name) => name !== CACHE_NAME)
      .map((name) => caches.delete(name))
  );
}

self.addEventListener("activate", (event) => {
  event.waitUntil(clearOldCaches());
  self.clients.claim();
});

// IndexedDB 관련 함수들 (openDb, addData, getData) 그대로 유지
function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore(DB_STORE_NAME, { keyPath: "url" });
    };
  });
}

// 요청에 대해 네트워크 우선 처리하고 캐시로부터 응답을 반환하는 간단한 전략
async function handleRequest(request) {
  // 요청의 URL이 유효한지 검사
  if (!request.url) {
    console.error("Invalid request: No URL provided.");
    return new Response("Invalid request: No URL provided.", { status: 400 });
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const responseClone = networkResponse.clone();
      const contentType = networkResponse.headers.get("Content-Type");
      console.log('request.url is ',request.url);
      
      if (contentType && contentType.includes("application/json")) {
        const data = await responseClone.json();
        await addData(request.url, data);
      }
      return networkResponse;
    }
  } catch (error) {
    console.error("Network request failed:", error);
  }

  // 네트워크 요청 실패 시 캐시에서 반환
  const cachedResponse = await caches.match(request);
  return cachedResponse || new Response("[]", { status: 200 });
}


self.addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
