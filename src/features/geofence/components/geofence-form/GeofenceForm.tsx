import { ModalHeader } from "./ModalHeader"

interface Props {
    onClose: () => void
}


export const GeofenceForm = ({ onClose }: Props) => {
    return (
        <aside className="h-full bg-white w-[30%]">
            <ModalHeader />
            <div>
                Alerta
            </div>
            <div>
                Buscar localizaación
                Mostrar geofences existentes
            </div>
            <div>
                Añadir detalles
                <div>
                    <label htmlFor="name">Nombre</label>
                    <input type="text" name="" id="name" className="border" />
                </div>
            </div>
            <button
                onClick={onClose}
            >Cerrar</button>
        </aside>
    )
}
