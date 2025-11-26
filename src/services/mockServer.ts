export interface DeviceData {
  id: string;
  model: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
}

interface UserData {
  splatData: string | null; // Base64 string
  devices: DeviceData[];
}

const STORAGE_KEY = 'home_pulse_mock_db';
const DB_NAME = 'HomePulseDB';
const STORE_NAME = 'splats';

// IndexedDB helper functions
const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
};

const getSplatFromIndexedDB = async (userId: string): Promise<string | null> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(userId);

    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
};

const saveSplatToIndexedDB = async (userId: string, data: string): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(data, userId);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

// localStorage for device data (smaller)
const getDevicesFromLocalStorage = (userId: string): DeviceData[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    const db = JSON.parse(stored);
    return db[userId]?.devices || [];
  }
  return [];
};

const saveDevicesToLocalStorage = (userId: string, devices: DeviceData[]) => {
  const stored = localStorage.getItem(STORAGE_KEY);
  const db = stored ? JSON.parse(stored) : {};
  if (!db[userId]) {
    db[userId] = { devices: [] };
  }
  db[userId].devices = devices;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
};

export const mockServer = {
  loadUserData: async (userId: string = 'default-user'): Promise<UserData> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const splatData = await getSplatFromIndexedDB(userId);
    const devices = getDevicesFromLocalStorage(userId);

    return { splatData, devices };
  },

  saveSplatData: async (userId: string = 'default-user', base64Data: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    await saveSplatToIndexedDB(userId, base64Data);
    console.log(`[MockServer] Saved splat data to IndexedDB for ${userId} (length: ${base64Data.length})`);
  },

  saveDevices: async (userId: string = 'default-user', devices: DeviceData[]): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    saveDevicesToLocalStorage(userId, devices);
    console.log(`[MockServer] Saved ${devices.length} devices for ${userId}`);
  },
};
