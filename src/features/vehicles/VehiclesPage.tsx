import { SectionHeader } from "../../shared/components/SectionHeader"
import { BadgeStatus } from "../../shared/components/ui/BadgeStatus";
import { VehicleIcon } from "../../shared/components/ui/VehicleIcon";
import { useVehicleContext } from "../../shared/context/VehiclesContext";


export const VehiclesPage = () => {
  const vehicles = useVehicleContext()
  const border = 'rounded-md'
  return (
    <section className="bg-neutral-300 h-full p-4 font-body ">
      <SectionHeader />
      <div className="border border-gray-300 rounded-lg mt-5 shadow-md overflow-x-auto w-auto max-h-[calc(100vh-200px)] overflow-y-auto">
        <div className="bg-white py-5 px-3 flex gap-3 sticky top-0 z-10 ">
          <button className="uppercase">Todos</button>
          <button className="uppercase">Grupo</button>
        </div>
        <table className="w-full border-collapse bg-gray-100 table-auto">
          <thead className="sticky top-0 z-10 bg-gray-100">
            <tr>
              <th className="p-3 font-body text-sm uppercase whitespace-nowrap ">
                <input type="checkbox" />
              </th>
              <th className="p-3 font-body text-sm uppercase whitespace-nowrap ">Código</th>
              <th className="p-3 font-body text-sm uppercase whitespace-nowrap ">Matrícula</th>
              <th className="p-3 font-body text-sm uppercase whitespace-nowrap ">Grupos</th>
              <th className="p-3 font-body text-sm uppercase whitespace-nowrap ">Estado</th>
              <th className="p-3 font-body text-sm uppercase whitespace-nowrap ">Tipo Motor</th>
              <th className="p-3 font-body text-sm uppercase whitespace-nowrap ">Velocidad</th>
              <th className="p-3 font-body text-sm uppercase whitespace-nowrap ">Geofences Actual</th>
              <th className="p-3 font-body text-sm uppercase whitespace-nowrap ">Localización</th>
            </tr>
          </thead>
          <tbody>
            {
              vehicles.map(vehicle => (
                <tr
                  className="border-b border-gray-100 hover:gray-50 transition-colors bg-white text-center"
                  key={vehicle.vehicle_id}>
                  <td className="px-4 py-5 text-sm font-display whitespace-nowrap">
                    <input type="checkbox" />
                  </td>
                  <td className="px-3 py-5 text-sm font-display whitespace-nowrap">
                    <span className="flex gap-2 items-center justify-center">
                      <VehicleIcon vehicle_type={vehicle.vehicle_type ?? ""} state={vehicle.status} border={border} />
                      {vehicle.vehicle_id}
                    </span>
                  </td>
                  <td className="px-3 py-5 text-sm font-display whitespace-nowrap  ">
                    {vehicle.plate}
                  </td>
                  <td className="px-3 py-5 text-sm font-display whitespace-nowrap ">
                    1
                  </td>
                  <td className="px-3 py-5 text-sm font-display whitespace-nowrap ">
                    <BadgeStatus state={vehicle.status} />
                  </td>
                  <td className="px-3 py-5 text-sm font-display whitespace-nowrap ">
                    {vehicle.engine_type}
                  </td>
                  <td className="px-3 py-5 text-sm font-display whitespace-nowrap ">
                    {vehicle.speed ?? 0} km/h
                  </td>
                  <td className="px-3 py-5 text-sm font-display whitespace-nowrap ">
                    Geofences
                  </td>
                  <td className="px-3 py-5 text-sm font-display whitespace-nowrap ">
                    {vehicle.last_address}
                  </td>



                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </section>
  );
};
