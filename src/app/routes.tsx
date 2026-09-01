import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router";
import { Layout } from "./Layout";
import { NotFound } from "./NotFound";
import { TrackingPage } from "../features/tracking/TrackingPage";
import { VehiclesPage } from "../features/vehicles/VehiclesPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} errorElement={<NotFound />}>
        <Route index element={<Navigate to="/map/fleet" replace />} />
        <Route path="map/fleet" element={<TrackingPage />} />
        <Route path="/list/vehicles" element={<VehiclesPage />} />
      </Route>
    </>,
  ),
);
