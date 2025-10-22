import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import "./index.css";


const clearTallyData = () => {
  localStorage.removeItem('tallyComplete');
  localStorage.removeItem('tallyResults');
  localStorage.removeItem('totalVotes');
};

clearTallyData();


ReactDOM.createRoot(document.getElementById("root")!).render(
  
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  
);
