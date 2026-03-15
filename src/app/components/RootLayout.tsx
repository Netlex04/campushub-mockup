import { Outlet, Link, useLocation } from "react-router";
import { Home, Map, Users, Plus } from "lucide-react";
import { motion } from "motion/react";

export function RootLayout() {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/map", icon: Map, label: "Map" },
    { path: "/carpool", icon: Users, label: "Carpool" },
    { path: "/create-ride", icon: Plus, label: "Create" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Map className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">CampusHub</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? "text-primary bg-blue-50"
                      : "text-gray-600 hover:text-primary hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex items-center justify-around px-2 py-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center gap-1 px-4 py-1 relative"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-blue-50 rounded-lg"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <item.icon
                  className={`w-6 h-6 relative z-10 ${
                    isActive ? "text-primary" : "text-gray-500"
                  }`}
                />
                <span
                  className={`text-xs relative z-10 ${
                    isActive ? "text-primary" : "text-gray-500"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
