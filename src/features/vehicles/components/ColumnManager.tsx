import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface ColumnManagerProps {
  columnVisibility: Record<string, boolean>;
  onToggleColumn: (columnId: string) => void;
}

const COLUMN_LABELS: Record<string, string> = {
  device_id: 'Código',
  plate: 'Matrícula',
  groups: 'Grupos',
  status: 'Estado',
  engine_type: 'Tipo Motor',
  speed: 'Velocidad',
  geofences: 'Geofences Actual',
  last_address: 'Localización',
};

export const ColumnManager = ({ columnVisibility, onToggleColumn }: ColumnManagerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 py-2 px-3 border rounded-md hover:bg-neutral-100"
        title="Administrar columnas"
      >
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-50 w-48">
          <div className="p-3">
            <p className="text-xs font-semibold mb-2 text-gray-700">Mostrar/Ocultar Columnas</p>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {Object.entries(COLUMN_LABELS).map(([id, label]) => (
                <label
                  key={id}
                  className="flex items-center gap-2 cursor-pointer text-xs hover:bg-gray-50 p-1 rounded"
                >
                  <input
                    type="checkbox"
                    checked={columnVisibility[id] !== false}
                    onChange={() => onToggleColumn(id)}
                    className="cursor-pointer"
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
