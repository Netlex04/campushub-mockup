import { useState } from "react";
import { MapPin, Train, Zap, Users, Navigation } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Link } from "react-router";
import { motion } from "motion/react";

// Custom interactive map view without external map libraries
export function MapView() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedHub, setSelectedHub] = useState<number | null>(null);

  const hubs = [
    {
      id: 1,
      name: "North Campus Hub",
      position: { x: 35, y: 25 },
      type: "hub",
      connections: ["Train", "Flexline"],
      rides: 5,
    },
    {
      id: 2,
      name: "Central Station",
      position: { x: 50, y: 45 },
      type: "train",
      connections: ["Train", "Bus"],
      rides: 8,
    },
    {
      id: 3,
      name: "South Plaza",
      position: { x: 60, y: 70 },
      type: "flex",
      connections: ["Flexline", "Bus"],
      rides: 3,
    },
    {
      id: 4,
      name: "East Hub",
      position: { x: 75, y: 50 },
      type: "hub",
      connections: ["Flexline", "Carpool"],
      rides: 6,
    },
    {
      id: 5,
      name: "West Station",
      position: { x: 20, y: 55 },
      type: "train",
      connections: ["Train"],
      rides: 12,
    },
  ];

  const filters = [
    { id: "all", label: "All", icon: MapPin },
    { id: "carpool", label: "Carpool", icon: Users },
    { id: "train", label: "Train", icon: Train },
    { id: "flex", label: "Flex Shuttle", icon: Zap },
  ];

  const filteredHubs = activeFilter === "all" 
    ? hubs 
    : hubs.filter((hub) => {
        if (activeFilter === "carpool") return hub.type === "hub";
        if (activeFilter === "train") return hub.type === "train";
        if (activeFilter === "flex") return hub.type === "flex";
        return true;
      });

  const getHubColor = (type: string) => {
    switch (type) {
      case "train": return "bg-blue-500";
      case "flex": return "bg-green-500";
      case "hub": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="h-[calc(100vh-73px)] md:h-[calc(100vh-73px)] relative bg-gray-100">
      {/* Filter Tabs */}
      <div className="absolute top-4 left-4 right-4 z-[1000] flex gap-2 overflow-x-auto pb-2">
        {filters.map((filter) => (
          <Button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            variant={activeFilter === filter.id ? "default" : "secondary"}
            size="sm"
            className={`flex items-center gap-2 whitespace-nowrap ${
              activeFilter === filter.id
                ? "bg-primary text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <filter.icon className="w-4 h-4" />
            {filter.label}
          </Button>
        ))}
      </div>

      {/* Map Area */}
      <div className="w-full h-full relative overflow-hidden">
        {/* Map Background - Street Grid Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
          {/* Grid lines to simulate streets */}
          <svg className="w-full h-full opacity-20">
            <defs>
              <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="gray" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Route lines */}
          <svg className="absolute inset-0 w-full h-full">
            <line x1="35%" y1="25%" x2="50%" y2="45%" stroke="#2F5BFF" strokeWidth="2" strokeDasharray="5,5" opacity="0.4" />
            <line x1="50%" y1="45%" x2="60%" y2="70%" stroke="#3DDC97" strokeWidth="2" strokeDasharray="5,5" opacity="0.4" />
            <line x1="60%" y1="70%" x2="75%" y2="50%" stroke="#2F5BFF" strokeWidth="2" strokeDasharray="5,5" opacity="0.4" />
            <line x1="20%" y1="55%" x2="50%" y2="45%" stroke="#3DDC97" strokeWidth="2" strokeDasharray="5,5" opacity="0.4" />
          </svg>
        </div>

        {/* Hub Markers */}
        {filteredHubs.map((hub) => (
          <motion.div
            key={hub.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: hub.id * 0.1 }}
            style={{
              position: 'absolute',
              left: `${hub.position.x}%`,
              top: `${hub.position.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            className="z-10"
          >
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedHub(selectedHub === hub.id ? null : hub.id)}
              className={`relative cursor-pointer`}
            >
              {/* Pulse animation for selected hub */}
              {selectedHub === hub.id && (
                <motion.div
                  className={`absolute inset-0 ${getHubColor(hub.type)} rounded-full`}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              
              {/* Marker */}
              <div className={`relative w-10 h-10 ${getHubColor(hub.type)} rounded-full shadow-lg flex items-center justify-center border-4 border-white`}>
                {hub.type === "train" && <Train className="w-5 h-5 text-white" />}
                {hub.type === "flex" && <Zap className="w-5 h-5 text-white" />}
                {hub.type === "hub" && <MapPin className="w-5 h-5 text-white" />}
              </div>

              {/* Hub name label */}
              <div className="absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-2 py-1 rounded shadow-md text-xs font-medium">
                {hub.name}
              </div>
            </motion.button>

            {/* Popup when selected */}
            {selectedHub === hub.id && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-20 left-1/2 -translate-x-1/2 z-20"
              >
                <Card className="p-4 min-w-[250px] shadow-xl border-2 border-primary">
                  <h3 className="font-semibold text-gray-900 mb-2">{hub.name}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>Mobility Hub</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {hub.connections.map((connection, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-blue-50 text-primary px-2 py-1 rounded-full"
                        >
                          {connection}
                        </span>
                      ))}
                    </div>
                    <div className="text-gray-600">
                      <span className="font-medium">{hub.rides}</span> rides available
                    </div>
                    <Link to={`/hub/${hub.id}`}>
                      <Button size="sm" className="w-full mt-2 bg-primary hover:bg-blue-700">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            )}
          </motion.div>
        ))}

        {/* Current Location Marker */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          className="z-20"
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-primary rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="relative w-12 h-12 bg-primary rounded-full shadow-lg flex items-center justify-center border-4 border-white">
              <Navigation className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-primary text-white px-2 py-1 rounded shadow-md text-xs font-medium">
              You are here
            </div>
          </div>
        </motion.div>
      </div>

      {/* Hub Count */}
      <Card className="absolute bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-auto bg-white/95 backdrop-blur-sm p-4 z-[1000] border border-gray-200 shadow-lg">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-2xl font-bold text-gray-900">{filteredHubs.length}</p>
            <p className="text-sm text-gray-600">Hubs Found</p>
          </div>
          <MapPin className="w-8 h-8 text-primary" />
        </div>
      </Card>

      {/* Legend */}
      <Card className="absolute bottom-20 md:bottom-20 left-4 bg-white/95 backdrop-blur-sm p-3 z-[1000] border border-gray-200 shadow-lg hidden md:block">
        <h4 className="text-xs font-semibold text-gray-900 mb-2">Legend</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
            <span className="text-gray-700">Mobility Hub</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <span className="text-gray-700">Train Station</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">Flex Shuttle</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 bg-primary rounded-full"></div>
            <span className="text-gray-700">Your Location</span>
          </div>
        </div>
      </Card>
    </div>
  );
}