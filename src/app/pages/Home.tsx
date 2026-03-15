import { Link } from "react-router";
import { Search, Users, MapPin, Clock, ArrowRight, Zap } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { motion } from "motion/react";

export function Home() {
  const nextRide = {
    driver: "Sarah M.",
    time: "08:30 AM",
    date: "Tomorrow",
    hub: "North Campus Hub",
    seats: 2,
  };

  const nearbyHubs = [
    { id: 1, name: "North Campus Hub", distance: "0.5 km", connections: ["Train", "Flexline"] },
    { id: 2, name: "Central Station", distance: "1.2 km", connections: ["Train", "Bus"] },
    { id: 3, name: "South Plaza", distance: "2.1 km", connections: ["Flexline", "Bus"] },
  ];

  const quickActions = [
    {
      title: "Find a Ride",
      description: "Join a carpool to campus",
      icon: Search,
      link: "/carpool",
      color: "bg-primary",
      textColor: "text-white",
    },
    {
      title: "Create Carpool",
      description: "Offer seats to others",
      icon: Users,
      link: "/create-ride",
      color: "bg-accent",
      textColor: "text-gray-900",
    },
    {
      title: "Find Hub",
      description: "Locate mobility hubs",
      icon: MapPin,
      link: "/map",
      color: "bg-purple-500",
      textColor: "text-white",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back! 👋</h1>
        <p className="text-gray-600">Let's get you to campus efficiently.</p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
      >
        {quickActions.map((action, index) => (
          <Link key={index} to={action.link}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className={`${action.color} ${action.textColor} p-6 border-0 cursor-pointer shadow-sm hover:shadow-md transition-shadow`}>
                <action.icon className="w-8 h-8 mb-3" />
                <h3 className="font-semibold mb-1">{action.title}</h3>
                <p className={`text-sm ${action.textColor} opacity-90`}>
                  {action.description}
                </p>
              </Card>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      {/* Next Scheduled Ride */}
      {nextRide && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Next Scheduled Ride</h2>
          <Card className="p-6 border border-gray-200 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {nextRide.driver.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{nextRide.driver}</p>
                  <p className="text-sm text-gray-600">Driver</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">{nextRide.date}</p>
                <p className="font-semibold text-primary">{nextRide.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{nextRide.hub}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{nextRide.seats} seats available</span>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Nearby Hubs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Nearby Hubs</h2>
          <Link to="/map">
            <Button variant="ghost" size="sm" className="text-primary">
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {nearbyHubs.map((hub) => (
            <Link key={hub.id} to={`/hub/${hub.id}`}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="p-5 border border-gray-200 cursor-pointer hover:border-primary hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{hub.name}</h3>
                    <span className="text-xs bg-blue-50 text-primary px-2 py-1 rounded-full">
                      {hub.distance}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {hub.connections.map((connection, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full flex items-center gap-1"
                      >
                        <Zap className="w-3 h-3" />
                        {connection}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 bg-gradient-to-br from-primary to-blue-600 rounded-2xl p-6 text-white"
      >
        <h3 className="text-lg font-semibold mb-4">Your Impact</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold mb-1">24</p>
            <p className="text-sm opacity-90">Rides Shared</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold mb-1">186</p>
            <p className="text-sm opacity-90">kg CO₂ Saved</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold mb-1">€52</p>
            <p className="text-sm opacity-90">Saved</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
