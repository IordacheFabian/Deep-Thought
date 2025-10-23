import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import JobForm from "../../features/form/JobForm";
import JobDashboard from "../../features/dashboard/JobDashboard";

export const router = createBrowserRouter([
    {
    path: "/",
    element: <App />,
    children: [
        {path: "/", element: <JobDashboard/>},
        {path: "ask", element: <JobForm/>}
    ],
}
])