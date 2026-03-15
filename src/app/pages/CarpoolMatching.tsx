import { useState } from "react";
import { MapPin, Users, Clock, Star, ArrowRight } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { motion } from "motion/react";

interface Ride {
  id: number;
  driver: {
    name: string;
    rating: number;
    reviews: number;
    verified: boolean;
  };
  departure: string;
  time: string;
  hub: string;
  seats: number;
  price: string;
  distance: string;
}

export function CarpoolMatching() {
  const [searchQuery, setSearchQuery] = useState("");

  const rides: Ride[] = [
    {
      id: 1,
      driver: {
        name: "Sarah Martinez",
        rating: 4.9,
        reviews: 127,
        verified: true,
      },
      departure: "Tomorrow",
      time: "08:30 AM",
      hub: "North Campus Hub",
      seats: 3,
      price: "€3.50",
      distance: "0.5 km away",
    },
    {
      id: 2,
      driver: {
        name: "David Chen",
        rating: 4.8,
        reviews: 89,
        verified: true,
      },
      departure: "Tomorrow",
      time: "08:45 AM",
      hub: "Central Station",
      seats: 2,
      price: "€4.00",
      distance: "1.2 km away",
    },
    {
      id: 3,
      driver: {
        name: "Emma Wilson",
        rating: 5.0,
        reviews: 45,
        verified: true,
      },
      departure: "Tomorrow",
      time: "09:00 AM",
      hub: "South Plaza",
      seats: 1,
      price: "€3.00",
      distance: "2.1 km away",
    },
    {
      id: 4,
      driver: {
        name: "Alex Thompson",
        rating: 4.7,
        reviews: 156,
        verified: false,
      },
      departure: "Tomorrow",
      time: "07:45 AM",
      hub: "East Hub",
      seats: 4,
      price: "€3.50",
      distance: "1.8 km away",
    },
    {
      id: 5,
      driver: {
        name: "Maria Garcia",
        rating: 4.9,
        reviews: 203,
        verified: true,
      },
      departure: "Tomorrow",
      time: "08:15 AM",
      hub: "West Station",
      seats: 2,
      price: "€4.50",
      distance: "0.9 km away",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find a Ride</h1>
        <p className="text-gray-600">Join a carpool to campus and save money</p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <Input
          type="text"
          placeholder="Search by hub or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border-gray-300"
        />
      </motion.div>

      {/* Results Count */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-4"
      >
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">{rides.length}</span> rides available
        </p>
      </motion.div>

      {/* Rides List */}
      <div className="space-y-4">
        {rides.map((ride, index) => (
          <motion.div
            key={ride.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card className="p-5 border border-gray-200 hover:border-primary hover:shadow-lg transition-all cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                {/* Driver Info */}
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    {ride.driver.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-gray-900">{ride.driver.name}</p>
                      {ride.driver.verified && (
                        <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-gray-900">{ride.driver.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({ride.driver.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">{ride.price}</p>
                  <p className="text-xs text-gray-500">per seat</p>
                </div>
              </div>

              {/* Ride Details */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>{ride.departure} • {ride.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span>{ride.seats} {ride.seats === 1 ? "seat" : "seats"} left</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 col-span-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{ride.hub} • {ride.distance}</span>
                </div>
              </div>

              {/* Action Button */}
              <Button className="w-full bg-primary hover:bg-blue-700 text-white">
                Request to Join
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
