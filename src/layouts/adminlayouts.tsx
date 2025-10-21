import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  UserPlus,
  Users,
  BarChart2,
  Settings,
  ChevronDown,
  ChevronRight,
  LogOut,
} from "lucide-react";

export default function AdminLayout() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 shadow-lg">
        <div className="h-16 flex items-center justify-center border-b">
          <h2 className="text-2xl font-bold text-indigo-600">Election Admin</h2>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          <NavItem to="/admin" icon={<LayoutDashboard size={18} />} label="Dashboard" />

          {/* Dropdown for Candidates */}
          <div>
            <button
              onClick={() => toggleDropdown("candidates")}
              className={`flex w-full items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-indigo-600 transition-colors ${
                openDropdown === "candidates" ? "bg-indigo-100 text-indigo-700" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <UserPlus size={18} />
                <span>Candidates</span>
              </div>
              {openDropdown === "candidates" ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>

            {openDropdown === "candidates" && (
              <div className="ml-8 mt-1 space-y-1 animate-fadeIn">
                <SubNav to="/admin/candidates/register" label="Candidate Register" />
                <SubNav to="/admin/candidates/manage" label="Candidate Manage" />
              </div>
            )}
          </div>
          
          {/* Dropdown for Voters */}
          <div>
            <button
              onClick={() => toggleDropdown("voters")}
              className={`flex w-full items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-indigo-600 transition-colors ${
                openDropdown === "voters" ? "bg-indigo-100 text-indigo-700" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <Users size={18} />
                <span>Voters</span>
              </div>
              {openDropdown === "voters" ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>

            {openDropdown === "voters" && (
              <div className="ml-8 mt-1 space-y-1 animate-fadeIn">
                <SubNav to="/admin/voters/manage" label="Voters manage" />
                <SubNav to="/admin/voters/disable" label="Voters Disable" />
              </div>
            )}
          </div>

          <NavItem to="/admin/tally" icon={<BarChart2 size={18} />} label="Tally" />
          {/* <NavItem to="/settings" icon={<Settings size={18} />} label="Settings" /> */}
        </nav>

        {/* Logout Section */}
        <div className="border-t p-4">
          <button
            onClick={() => alert("Logging out...")}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600"
          >
            <LogOut size={18} />
            Logout
          </button>  
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="flex items-center justify-between bg-white h-16 px-6 border-b shadow-sm">
          <h1 className="text-xl font-semibold text-gray-700">Election Control Panel</h1>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

/* 🔹 Reusable NavItem */
function NavItem({
  to,
  icon,
  label,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          isActive
            ? "bg-indigo-100 text-indigo-700"
            : "text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}

/* 🔹 Sub-navigation links (inside dropdowns) */
function SubNav({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-2 py-1 rounded-md text-sm transition ${
          isActive
            ? "text-indigo-700 font-medium bg-indigo-50"
            : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
        }`
      }
    >
      {label}
    </NavLink>
  );
}
