export const formatDateTime = (timestamp: string | null): string => {
  if (!timestamp) return "Sin datos";
  const [date, rest] = timestamp.split("T");
  const time = rest?.replace("Z", "").split(".")[0].slice(0, 5);
  return `${time} - ${date.split("-").reverse().join("/")}`;
};
