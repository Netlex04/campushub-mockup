import { useParams, Link, useNavigate } from "react-router";
import { MapPin, Navigation, Users, Clock, Train, Zap, Bus, ArrowLeft, Star } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { motion } from "motion/react";

export function HubDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app, this would be fetched based on id
  const hub = {
    id,
    name: "North Campus Hub",
    address: "123 University Avenue, Campus District",
    distance: "0.5 km from you",
    description: "Main mobility hub with direct connections to campus facilities. Features covered waiting area and bike parking.",
    connections: [
      { type: "train", name: "Metro Line 3", frequency: "Every 10 min" },
      { type: "flex", name: "Flexline Campus", frequency: "On demand" },
      { type: "bus", name: "Bus 42, 58", frequency: "Every 15 min" },
    ],
    amenities: ["Bike Parking", "Covered Shelter", "Real-time Display", "WiFi"],
  };

  const availableRides = [
    {
      id: 1,
      driver: "Sarah M.",
      time: "08:30 AM",
      date: "Tomorrow",
      seats: 3,
      price: "€3.50",
      rating: 4.9,
    },
    {
      id: 2,
      driver: "David C.",
      time: "08:45 AM",
      date: "Tomorrow",
      seats: 2,
      price: "€4.00",
      rating: 4.8,
    },
    {
      id: 3,
      driver: "Emma W.",
      time: "09:00 AM",
      date: "Tomorrow",
      seats: 1,
      price: "€3.00",
      rating: 5.0,
    },
  ];

  const getConnectionIcon = (type: string) => {
    switch (type) {
      case "train":
        return Train;
      case "flex":
        return Zap;
      case "bus":
        return Bus;
      default:
        return MapPin;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-6">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-4"
      >
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{hub.name}</h1>
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <MapPin className="w-4 h-4" />
              <span>{hub.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium">{hub.distance}</span>
            </div>
          </div>
          <Button className="bg-primary hover:bg-blue-700 text-white">
            Get Directions
          </Button>
        </div>
        <p className="text-gray-600">{hub.description}</p>
      </motion.div>

      {/* Transport Connections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Transport Connections</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {hub.connections.map((connection, index) => {
            const Icon = getConnectionIcon(connection.type);
            return (
              <Card key={index} className="p-4 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    connection.type === "train" ? "bg-blue-100" :
                    connection.type === "flex" ? "bg-green-100" :
                    "bg-purple-100"
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      connection.type === "train" ? "text-blue-600" :
                      connection.type === "flex" ? "text-green-600" :
                      "text-purple-600"
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{connection.name}</p>
                    <p className="text-sm text-gray-600">{connection.frequency}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </motion.div>

      {/* Amenities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h2>
        <div className="flex flex-wrap gap-2">
          {hub.amenities.map((amenity, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              {amenity}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Available Rides */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Available Rides</h2>
          <Link to="/carpool">
            <Button variant="ghost" size="sm" className="text-primary">
              View All
            </Button>
          </Link>
        </div>
        <div className="space-y-3">
          {availableRides.map((ride) => (
            <Card key={ride.id} className="p-4 border border-gray-200 hover:border-primary hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {ride.driver.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{ride.driver}</p>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{ride.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{ride.seats} seats</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{ride.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary text-lg">{ride.price}</p>
                  <Button size="sm" className="mt-1 bg-primary hover:bg-blue-700">
                    Join
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Map Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Location</h2>
        <Card className="overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 h-64 flex items-center justify-center relative">
            <MapPin className="w-16 h-16 text-primary" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/30 to-transparent p-4">
              <Link to="/map">
                <Button className="w-full bg-white text-primary hover:bg-gray-100">
                  View on Map
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
