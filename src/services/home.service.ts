import type { Home } from '../types';

const API_URL = '/api/homes';

export const fetchHomes = async (): Promise<Home[]> => {
  const res = await fetch(API_URL);
  const data = await res.json();
  return data.homes;
};

export const createHome = async (homeData: { homeName: string }): Promise<Home> => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(homeData),
  });
  const data = await res.json();
  return data.home;
};

export const getSingleHome = async (homeId: string): Promise<Home> => {
  const res = await fetch(`${API_URL}/${homeId}`);
  const data = await res.json();
  return data.home;
};

export const deleteHome = async (homeId: string): Promise<void> => {
  const res = await fetch(`${API_URL}/${homeId}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete home');
};
