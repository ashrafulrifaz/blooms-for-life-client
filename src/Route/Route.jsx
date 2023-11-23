import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";

const Route = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement: <></>,
        
    }
])

export default Route;