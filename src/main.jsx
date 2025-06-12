import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";
import Footer from "./components/global/Footer";
import Navbar from "./components/global/Navbar";
import "./index.css";
import Admin from "./pages/Backoffice/Admin";
import Articles from "./pages/Articles/Articles";
import Contact from "./pages/Contact/Contact";
import Donation from "./pages/Donation/Donation";
import Home from "./pages/Home/Home";
import Testimonials from "./pages/Testimonials/Testimonials";
import Videos from "./pages/Videos/Videos";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <Navbar/>
                <Outlet/>
                <Footer/>
            </>
        ),
        children: [
            {index: true, element: <Home/>},
            {path: "videos", element: <Videos/>},
            {path: "articles", element: <Articles/>},
            {path: "testimonials", element: <Testimonials/>},
            {path: "donation", element: <Donation/>},
            {path: "contact", element: <Contact/>},
            {
                path: "admin",
                element: <Admin/>,

            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>
);