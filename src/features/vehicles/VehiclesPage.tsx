import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeader } from "../../shared/components/SectionHeader"
import { BadgeStatus } from "../../shared/components/ui/BadgeStatus";
import { VehicleIcon } from "../../shared/components/ui/VehicleIcon";
import { useVehicleContext } from "../../shared/context/VehiclesContext";
import { VehiclesToolbar } from "./components/VehiclesToolbar";
import { useState } from "react";


export const VehiclesPage = () => {
  const vehicles = useVehicleContext()
  const [page, setPage] = useState(0)
  const perPage = 8
  const paginated = vehicles.slice(page * perPage, (page + 1) * perPage)
  const total = Math.ceil(vehicles.length / perPage)


  const handleClickNext = () => {
    if (page === total - 1) return
    setPage((prev) => prev + 1)
  }
  const handleClickPrev = () => {
    if (page === total) return
    setPage((prev) => prev - 1)
  }



  const border = 'rounded-md'
  return (
    <section className="bg-neutral-300 h-full p-4 font-body  text-xs ">
      <SectionHeader />
      <div className="border border-gray-300 bg-white rounded-lg mt-5 shadow-md overflow-hidden">
        <VehiclesToolbar vehicles={vehicles} />
        <div className="  overflow-x-auto w-auto h-[calc(100vh-300px)] overflow-y-auto">
          <table className="w-full border-collapse bg-gray-100 table-auto">
            <thead className="sticky top-0 z-10 bg-gray-100">
              <tr>
                <th className="p-3 font-body text-[13px] uppercase whitespace-nowrap ">

                  <input type="checkbox" />
                </th>
                <th className="p-3 font-body text-[13px] uppercase whitespace-nowrap ">Código</th>
                <th className="p-3 font-body text-[13px] uppercase whitespace-nowrap ">Matrícula</th>
                <th className="p-3 font-body text-[13px] uppercase whitespace-nowrap ">Grupos</th>
                <th className="p-3 font-body text-[13px] uppercase whitespace-nowrap ">Estado</th>
                <th className="p-3 font-body text-[13px] uppercase whitespace-nowrap ">Tipo Motor</th>
                <th className="p-3 font-body text-[13px] uppercase whitespace-nowrap ">Velocidad</th>
                <th className="p-3 font-body text-[13px] uppercase whitespace-nowrap ">Geofences Actual</th>
                <th className="p-3 font-body text-[13px] uppercase whitespace-nowrap ">Localización</th>
              </tr>
            </thead>
            <tbody className="bg-white font-body">
              {
                vehicles.map(vehicle => (
                  <tr
                    className="border-b border-gray-100 hover:gray-50 transition-colors bg-white text-center"
                    key={vehicle.device_id}>
                    <td className="px-4 py-2 text-[13px] font-display whitespace-nowrap">
                      <input type="checkbox" />
                    </td>
                    <td className="px-3 py-2 text-[13px] whitespace-nowrap">
                      <span className="flex gap-2 items-center justify-center">
                        <VehicleIcon vehicle_type={vehicle.vehicle_type ?? ""} state={vehicle.status} border={border} />
                        {vehicle.device_id}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-[13px] whitespace-nowrap  ">
                      {vehicle.plate}
                    </td>
                    <td className="px-3 py-2 text-[13px]  whitespace-nowrap ">
                      1
                    </td>
                    <td className="px-3 py-2 text-[13px]  whitespace-nowrap ">
                      <BadgeStatus state={vehicle.status} />
                    </td>
                    <td className="px-3 py-2 text-[13px]  whitespace-nowrap ">
                      {vehicle.engine_type}
                    </td>
                    <td className="px-3 py-2 text-[13px]  whitespace-nowrap ">
                      {vehicle.speed ?? 0} km/h
                    </td>
                    <td className="px-3 py-2 text-[13px]  whitespace-nowrap ">
                      Geofences
                    </td>
                    <td className="px-3 py-5 text-[13px] whitespace-nowrap ">
                      {vehicle.last_address}
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <div className=" flex items-center justify-end bg-white border-t border-gray-300 py-5 px-3 w-full">
          <div>
            Filas por página:
            <select name="" id="" className="mx-2">
              <option value="">25</option>
              <option value="">50</option>
              <option value="">100</option>
            </select>
            1-8 de {vehicles.length}
          </div>
          <div className="flex items-center justify-end mx-2">
            <button>
              <ChevronFirst className="h-5 w-5" />
            </button>
            <button>
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button>
              <ChevronRight className="h-5 w-5" />
            </button>
            <button>
              <ChevronLast className="h-5 w-5" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
