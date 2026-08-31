export const BatteryIcon = ({
  percent,
  voltage,
}: {
  percent: number;
  voltage: number | null;
}) => {
  const color = percent > 50 ? "#22C55E" : percent > 25 ? "#F59E0B" : "#EF4444";
  const fillWidth = Math.max(0, Math.min(100, percent));

  const getBatteryLabel = (percent: number): string => {
    if (percent > 50) return "Healthy";
    if (percent > 25) return "Bajo";
    return "Crítico";
  };

  return (
    <div className="flex items-center gap-2">
      <svg width="40" height="20" viewBox="0 0 40 20">
        <rect
          x="0"
          y="2"
          width="36"
          height="16"
          rx="2"
          fill="none"
          stroke={color}
          strokeWidth="2"
        />
        <rect x="36" y="6" width="4" height="8" rx="1" fill={color} />
        <rect
          x="2"
          y="4"
          width={fillWidth * 0.32}
          height="12"
          rx="1"
          fill={color}
        />
      </svg>
      <span className="text-xs font-mono text-neutral-500">
        {voltage != null ? getBatteryLabel(fillWidth) : "--"}
      </span>
    </div>
  );
};
