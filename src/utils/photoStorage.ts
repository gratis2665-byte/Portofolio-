// Utility to manage user-uploaded authentic training photos
// Supports both static files placed in /images/ and images uploaded directly in browser IndexedDB

const DB_NAME = 'AlfiPortfolioPhotos';
const STORE_NAME = 'photos';
const DB_VERSION = 1;

let dbPromise: Promise<IDBDatabase> | null = null;

function getDB(): Promise<IDBDatabase> {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !('indexedDB' in window)) {
        return reject(new Error('IndexedDB not supported'));
      }
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  return dbPromise;
}

// In-memory cache for fast synchronous access
const memoryCache = new Map<string, string>();
const listeners = new Set<() => void>();

export async function initPhotoStorage(): Promise<void> {
  try {
    const db = await getDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.openCursor();

    request.onsuccess = () => {
      const cursor = request.result;
      if (cursor) {
        memoryCache.set(String(cursor.key), String(cursor.value));
        cursor.continue();
      } else {
        notifyListeners();
      }
    };
  } catch (err) {
    console.warn('Failed to load photos from IndexedDB:', err);
  }
}

export function getCustomPhotoUrl(pathOrFilename: string): string | null {
  if (!pathOrFilename) return null;
  const filename = pathOrFilename.split('/').pop() || pathOrFilename;
  return memoryCache.get(filename) || memoryCache.get(pathOrFilename) || null;
}

export async function saveCustomPhoto(filename: string, dataUrl: string): Promise<void> {
  const cleanName = filename.split('/').pop() || filename;
  memoryCache.set(cleanName, dataUrl);
  try {
    const db = await getDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put(dataUrl, cleanName);
    await new Promise<void>((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    notifyListeners();
  } catch (err) {
    console.error('Failed to save photo to IndexedDB:', err);
    notifyListeners();
  }
}

export async function saveMultiplePhotos(files: FileList | File[]): Promise<number> {
  let count = 0;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    try {
      const dataUrl = await readFileAsDataUrl(file);
      await saveCustomPhoto(file.name, dataUrl);
      count++;
    } catch (e) {
      console.error(`Error saving ${file.name}:`, e);
    }
  }
  return count;
}

export function subscribePhotoUpdates(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function notifyListeners() {
  listeners.forEach((l) => {
    try {
      l();
    } catch {
      // ignore
    }
  });
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
