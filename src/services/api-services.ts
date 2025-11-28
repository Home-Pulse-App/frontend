// Paste your JWT token here (from login response or browser dev tools)
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MjczYTM2NDAxMDAzNGUwNjY3Y2I0NiIsImVtYWlsIjoidXNlckBtYWlsLmNvbSIsImlhdCI6MTc2NDMyNTkzMiwiZXhwIjoxNzY0NDEyMzMyfQ.zv_wEVEikZbiuTAT_Ec2NNAZ5rlL6mWbG23akbt59Gk'; // ← CHANGE THIS!


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

export  async function postSensorData(value:string) {

  const deviceName = 'iot1'; // ← Change to your real device name
  let postValue: String;
  console.log(value);

  if (value == '1'){
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
            "sensor": "switch1",
            "value": `${postValue}`,
          }
        ) 
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