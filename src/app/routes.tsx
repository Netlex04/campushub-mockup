import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { Home } from "./pages/Home";
import { MapView } from "./pages/MapView";
import { CarpoolMatching } from "./pages/CarpoolMatching";
import { CreateRide } from "./pages/CreateRide";
import { HubDetail } from "./pages/HubDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "map", Component: MapView },
      { path: "carpool", Component: CarpoolMatching },
      { path: "create-ride", Component: CreateRide },
      { path: "hub/:id", Component: HubDetail },
    ],
  },
]);
