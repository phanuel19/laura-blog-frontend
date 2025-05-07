import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Footer from "./components/global/Footer";
import Navbar from "./components/global/navbar";
import Admin from "./pages/Admin/Admin";
import Articles from "./pages/Articles/Articles";
import Contact from "./pages/Contact/Contact";
import Dontation from "./pages/Donation/Donation";
import Home from "./pages/Home/Home";
import Videos from "./pages/Videos/Videos";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/videos", element: <Videos /> },
  { path: "/articles", element: <Articles /> },
  { path: "/donation", element: <Dontation /> },
  { path: "/contact", element: <Contact /> },
  { path: "/admin", element: <Admin /> },
]);

const Routes = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="container__content">
          <RouterProvider router={router} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Routes;
