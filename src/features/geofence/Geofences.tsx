// const fmt = new Intl.DateTimeFormat("es-ES", { dateStyle: "short", timeStyle: "short" });


import { useState } from "react";
import { SectionHeader } from "../../shared/components/SectionHeader";
import { GeofenceModal } from "./components/GeofenceModal";


export function Geofences() {
    const [openModal, setOpenModal] = useState(false)

    const handleAdd = () => { setOpenModal(true) }

    return (
        <section className="bg-neutral-300 h-full p-4 font-body">
            <SectionHeader title="Geofences" subtitle="Geofences registrados" onAdd={() => handleAdd()} />
            <div className="border border-gray-300 bg-white rounded-lg mt-5 shadow-md overflow-hidden">

            </div>
            <GeofenceModal isOpen={openModal} onClose={() => setOpenModal(false)} />
        </section>
    );
}