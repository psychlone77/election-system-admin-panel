import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layouts/adminlayouts";
import RequireAuth from "../components/RequireAuth";
import Dashboard from "../pages/dashboard";
import Register from "../pages/register";
import Login from "../pages/login";
import CandidateManage from "../pages/candidates/candidatemanage";  
import CandidateRegister from "../pages/candidates/candidateregister";
import VoterDisable from "../pages/voters/voterdisable";
import VoterMange from "../pages/voters/votermanage";
import Home from "../pages/home";
import Vote from "../pages/vote";
// import Candidates from "../pages/Candidates";
// import Voters from "../pages/Voters";
// import ElectionSetup from "../pages/ElectionSetup";
import Tally from "../pages/Tally";
// import Logs from "../pages/Logs";
// import Settings from "../pages/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/tally",
    element: <Tally />,
  },
  {
    path: "/admin",
    element: (
      <RequireAuth>
        <AdminLayout />
      </RequireAuth>
    ), // Sidebar + Header (protected)
    children: [
      { index: true, element: <Dashboard /> },
      { path: "candidates/manage", element: <CandidateManage /> },
      { path: "candidates/register", element: <CandidateRegister /> },
      { path: "voters/disable", element: <VoterDisable /> },
      { path: "voters/manage", element: <VoterMange /> },
      // { path: "setup", element: <ElectionSetup /> },
      { path: "tally", element: <Tally /> },
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
  {
    path: "/vote",
    element: <Vote />,
  }
]);

export default router;


