const API_URL = import.meta.env.VITE_API_URL;

export const getAddress = async (lat: number, lon: number): Promise<string> => {
  const res = await fetch(`${API_URL}/geocode?lat=${lat}&lon=${lon}`);
  const data = await res.json();
  return data.address;
};
