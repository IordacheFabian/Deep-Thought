import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import JobForm from "../../features/form/JobForm";

export const router = createBrowserRouter([
    {
    path: "/",
    element: <App />,
    children: [
        {path: "asking", element: <JobForm/>}
    ],
}
])