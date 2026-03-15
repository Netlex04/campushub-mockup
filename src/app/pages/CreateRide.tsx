import { useState } from "react";
import { MapPin, Clock, Users, Calendar, DollarSign, Navigation } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { motion } from "motion/react";
import { useNavigate } from "react-router";

export function CreateRide() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    hub: "",
    date: "",
    time: "",
    seats: "",
    price: "",
  });

  const hubs = [
    "North Campus Hub",
    "Central Station",
    "South Plaza",
    "East Hub",
    "West Station",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Creating ride:", formData);
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create a Ride</h1>
        <p className="text-gray-600">Offer seats and help others get to campus</p>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Route Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Navigation className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-gray-900">Route Details</h3>
              </div>

              <div>
                <Label htmlFor="from" className="mb-2 block">Starting Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="from"
                    type="text"
                    placeholder="Enter your starting point"
                    value={formData.from}
                    onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                    className="pl-10 bg-white border-gray-300"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="to" className="mb-2 block">Destination</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="to"
                    type="text"
                    placeholder="Campus location"
                    value={formData.to}
                    onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                    className="pl-10 bg-white border-gray-300"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="hub" className="mb-2 block">Pickup Hub</Label>
                <Select
                  value={formData.hub}
                  onValueChange={(value) => setFormData({ ...formData, hub: value })}
                >
                  <SelectTrigger className="bg-white border-gray-300">
                    <SelectValue placeholder="Select a mobility hub" />
                  </SelectTrigger>
                  <SelectContent>
                    {hubs.map((hub) => (
                      <SelectItem key={hub} value={hub}>
                        {hub}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Time Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-gray-900">Schedule</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date" className="mb-2 block">Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="pl-10 bg-white border-gray-300"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="time" className="mb-2 block">Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="pl-10 bg-white border-gray-300"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Ride Details Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-gray-900">Ride Details</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="seats" className="mb-2 block">Available Seats</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="seats"
                      type="number"
                      min="1"
                      max="7"
                      placeholder="e.g., 3"
                      value={formData.seats}
                      onChange={(e) => setFormData({ ...formData, seats: e.target.value })}
                      className="pl-10 bg-white border-gray-300"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="price" className="mb-2 block">Price per Seat</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="price"
                      type="number"
                      step="0.50"
                      min="0"
                      placeholder="e.g., 3.50"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="pl-10 bg-white border-gray-300"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                💡 <strong>Tip:</strong> Set a fair price to cover fuel costs. The recommended price is €3-5 per seat for trips under 20km.
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => navigate("/")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-primary hover:bg-blue-700 text-white"
              >
                Create Ride
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>

      {/* Benefits Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Card className="p-4 bg-gradient-to-br from-accent to-green-400 text-white border-0">
          <p className="text-2xl font-bold mb-1">🌱</p>
          <p className="text-sm font-semibold mb-1">Eco-Friendly</p>
          <p className="text-xs opacity-90">Reduce carbon emissions</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-primary to-blue-600 text-white border-0">
          <p className="text-2xl font-bold mb-1">💰</p>
          <p className="text-sm font-semibold mb-1">Save Money</p>
          <p className="text-xs opacity-90">Share fuel costs</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0">
          <p className="text-2xl font-bold mb-1">🤝</p>
          <p className="text-sm font-semibold mb-1">Build Community</p>
          <p className="text-xs opacity-90">Connect with students</p>
        </Card>
      </motion.div>
    </div>
  );
}
