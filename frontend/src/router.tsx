import { createBrowserRouter, createRoutesFromElements, Outlet, Route } from "react-router-dom";
import { Home } from "./components/home";
import { Navbar } from "./components/navbar";
import { NewFood } from "./components/new-food";
import { loader, UpdateFood } from "./components/update-food";

const AppLayout = () => (
    <>
        <Navbar />
        <Outlet />
    </>
);

export const router = createBrowserRouter(createRoutesFromElements(
    <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/newfood" element={<NewFood />} />
        <Route path="/updatefood/:id" element={<UpdateFood />} loader={loader} />
    </Route>
))