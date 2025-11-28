// Paste your JWT token here (from login response or browser dev tools)
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5Mjg2OWE3NjQwOThkMWEwYzk5MDAzOSIsImVtYWlsIjoiYWxmcmVkb0BleGFtcGxlLmNvbSIsImlhdCI6MTc2NDMyNzkyMSwiZXhwIjoxNzY0NDE0MzIxfQ.-UYJWmP4w6GJaeG3GOfE51rhrxZeuStCe1a1BbSsZ5c'; // ← CHANGE THIS!

export default async function fetchDeviceData() {

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
      },
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
  } catch (err: Error | unknown) {
    console.error('Fetch failed:', err);
    throw err;
  }
}

export async function postSensorData(value:string) {

  const deviceName = 'iot1'; // ← Change to your real device name
  let postValue: string;
  console.log(value);

  if (value == '1') {
    postValue = '1';
  } else {
    postValue = '0';
  }

  try {
    const response = await fetch(
      `http://localhost:3000/api/device-data/${deviceName}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TOKEN}`, // ← JWT sent here
        },
        body:JSON.stringify(
          {
            'sensor': 'switch1',
            'value': `${postValue}`,
          },
        ),
      },
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized - Token expired or invalid');
      }
      throw new Error(`HTTP ${response.status}`);
    }

    const json = await response.json();
    console.log('Post Success! your post:', json.data.topic, json.data.value);
    return json.data;
  } catch (err: Error | unknown) {
    console.error('Fetch failed:', err);
    throw err;
  }
}