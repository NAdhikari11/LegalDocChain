import "./App.css";
import Home from "./pages/Home";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { UploadDocComponent } from "./pages/UploadDoc";
import Navbar from "./components/Navbar";
import MainLayout from "./layouts/MainLayout";
import ViewDocComponent from "./pages/ViewDoc";
import User from "./pages/User";
import ViewByCaseIdComponent from "./pages/ViewDocCaseId";
import ViewByWalletAddressComponent from "./pages/ViewDocWalletAddress";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="upload" element={<UploadDocComponent />} />
      <Route path="view" element={<ViewDocComponent />} />
      <Route path="user" element={<User />} />
      <Route path="/viewCase" element={<ViewByCaseIdComponent />} />
      <Route path="/viewWalletAddress" element={<ViewByWalletAddressComponent />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
