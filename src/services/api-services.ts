
export default async function fetchDeviceData() {

  // Paste your JWT token here (from login response or browser dev tools)
  const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5Mjg2OWE3NjQwOThkMWEwYzk5MDAzOSIsImVtYWlsIjoiYWxmcmVkb0BleGFtcGxlLmNvbSIsImlhdCI6MTc2NDI1NjIzNywiZXhwIjoxNzY0MjU5ODM3fQ.ZDJTfsZ2JecRJBlCOesD233pBgJFyjBwQWr0uRX5eOo'; // ← CHANGE THIS!

  const deviceName = 'iot1'; // ← Change to your real device name

  try {
    const response = await fetch(
      `http://localhost:3000/api/device-data/${deviceName}/latest`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TOKEN}`, // ← JWT sent here
        },
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized - Token expired or invalid');
      }
      throw new Error(`HTTP ${response.status}`);
    }

    const json = await response.json();
    console.log('Success! Latest reading:', json.data.latest.sensorsData);
    return json.data.latest.sensorsData;
  } catch (err: any) {
    console.error('Fetch failed:', err);
    throw err;
  }
}