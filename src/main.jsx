import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Correction ici
import Footer from "./components/global/Footer";
import Navbar from "./components/global/Navbar"; // Assurez-vous que la casse correspond
import "./index.css";
import Admin from "./pages/Admin/Admin";
import Articles from "./pages/Articles/Articles";
import Contact from "./pages/Contact/Contact"; // Vérifiez que ce fichier existe
import Donation from "./pages/Donation/Donation"; // Correction de l'orthographe
import Home from "./pages/Home/Home";
import Videos from "./pages/Videos/Videos";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/videos", element: <Videos /> },
  { path: "/articles", element: <Articles /> },
  { path: "/donation", element: <Donation /> }, // Orthographe corrigée
  { path: "/contact", element: <Contact /> },
  { path: "/admin", element: <Admin /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Navbar />
    <div className="container">
      <div className="container__content">
        <RouterProvider router={router} />
      </div>
    </div>
    <Footer />
  </StrictMode>
);
