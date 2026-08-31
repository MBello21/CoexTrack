export const getBatteryPercent = (voltage: number | null): number => {
    if (voltage == null) return 0;
    if (voltage >= 12.7) return 100;
    if (voltage <= 11.9) return 0;
    return Math.round(((voltage - 11.9) / (12.7 - 11.9)) * 100);
};