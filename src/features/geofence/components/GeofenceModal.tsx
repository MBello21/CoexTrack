import { GeofencesMap } from "./GeofencesMap";

interface GeofenceModal {
    isOpen: boolean;
    onClose: () => void
}



export const GeofenceModal = ({ isOpen, onClose }: GeofenceModal) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-[80%] w-full mx-4 h-[85%]">
                <button onClick={onClose}>cerrar</button>
                <div className="h-full overflow-hidden flex">

                    <GeofencesMap />

                    <div className="h-full bg-white w-[30%]">
                        Añadir un geofences
                    </div>
                </div>
            </div>
        </div>
    )
}
