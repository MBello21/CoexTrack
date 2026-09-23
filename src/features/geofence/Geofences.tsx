// const fmt = new Intl.DateTimeFormat("es-ES", { dateStyle: "short", timeStyle: "short" });
//  const handleCreate = async () => {
//     // const name = window.prompt("Nombre de la geovalla");
//     // if (!name) return;
//     // const res = await fetch("/api/geofences", {
//     //   method: "POST",
//     //   headers: { "Content-Type": "application/json" },
//     //   body: JSON.stringify({ name, geometry }),
//     // });
//     // if (res.ok) await loadFences(); // tu función que hace el GET y actualiza el estado


import { GeofeceHeader } from "./components/GeofenceHeader";


//   };
export function Geofences() {
    return (
        <section className="bg-neutral-300 h-full p-4 font-body text-xs">
            <GeofeceHeader/>
            <div className="border border-gray-300 bg-white rounded-lg mt-5 shadow-md overflow-hidden">
                
            </div>
        </section>
    );
}