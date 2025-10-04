import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layouts/adminlayouts";
import Dashboard from "../pages/Dashboard";
import Register from "../pages/Register";
import Login from "../pages/Login";
import CandidateManage from "../pages/candidates/candidatemanage";  
import CandidateRegister from "../pages/candidates/candidateregister";
// import Candidates from "../pages/Candidates";
// import Voters from "../pages/Voters";
// import ElectionSetup from "../pages/ElectionSetup";
// import Tally from "../pages/Tally";
// import Logs from "../pages/Logs";
// import Settings from "../pages/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />, // Sidebar + Header
    children: [
      { index: true, element: <Dashboard /> },
      { path: "candidates/manage", element: <CandidateManage /> },
      { path: "candidates/register", element: <CandidateRegister /> },
      // { path: "setup", element: <ElectionSetup /> },
      // { path: "tally", element: <Tally /> },
      // { path: "logs", element: <Logs /> },
      // { path: "settings", element: <Settings /> },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
    {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
