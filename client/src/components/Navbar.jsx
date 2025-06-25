import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  LayoutDashboard,
  CheckSquare,
  Users,
  LogOut,
  User,
  Menu,
  X,
} from "lucide-react";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
  };

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      roles: ["user", "manager"],
    },
    {
      name: "Tasks",
      href: "/tasks",
      icon: CheckSquare,
      roles: ["user", "manager"],
    },
    {
      name: "Team",
      href: "/team",
      icon: Users,
      roles: ["manager"],
    },
  ];

  const filteredNavItems = navItems.filter((item) =>
    item.roles.includes(user?.role)
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-gray-600" />
        ) : (
          <Menu className="w-6 h-6 text-gray-600" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          bg-white shadow-lg border-r border-gray-200 h-screen w-64 fixed left-0 top-0 flex flex-col z-40 
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="p-4 lg:p-6 border-b border-gray-200">
          <h1 className="text-xl lg:text-2xl font-bold text-blue-600 tracking-tight">
            TeamTask
          </h1>
          <p className="text-xs lg:text-sm text-gray-500 mt-1">
            Task Management
          </p>
        </div>

        {/* User Info */}
        <div className="p-3 lg:p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.name || "Guest User"}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {user?.role || "user"}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 lg:px-4 py-4 lg:py-6 space-y-1 lg:space-y-2">
          {filteredNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;

            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)} // Close menu on navigation
                className={`
                  flex items-center px-3 lg:px-4 py-2 lg:py-3 text-sm font-medium rounded-lg 
                  transition-all duration-200 group relative
                  ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
              >
                {/* Active indicator line */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-700 rounded-r"></div>
                )}

                <Icon
                  className={`
                    w-4 h-4 lg:w-5 lg:h-5 mr-2 lg:mr-3 transition-colors duration-200
                    ${
                      isActive
                        ? "text-blue-700"
                        : "text-gray-400 group-hover:text-gray-600"
                    }
                  `}
                />
                <span className="truncate">{item.name}</span>

                {/* Active dot indicator */}
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-blue-700 rounded-full"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-3 lg:p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 lg:px-4 py-2 lg:py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 hover:text-red-700 transition-all duration-200 group"
          >
            <LogOut className="w-4 h-4 lg:w-5 lg:h-5 mr-2 lg:mr-3 group-hover:text-red-700" />
            <span>Sign out</span>
          </button>
        </div>
      </div>

      <div className="hidden lg:block lg:w-64"></div>
    </>
  );
};

export default Navbar;
