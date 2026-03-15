import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Calendar, Clock } from "lucide-react";

interface TimeSelectionScreenProps {
  onNext: (selectedTime: { date: string; time: string }) => void;
  onBack: () => void;
  initialSelection?: { date: string; time: string };
}

const timeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

const dates = [
  { date: "2026-04-05", label: "Április 5", day: "Vasárnap" },
  { date: "2026-04-06", label: "Április 6", day: "Hétfő" },
  { date: "2026-04-07", label: "Április 7", day: "Kedd" },
  { date: "2026-04-08", label: "Április 8", day: "Szerda" },
  { date: "2026-04-09", label: "Április 9", day: "Csütörtök" },
  { date: "2026-04-10", label: "Április 10", day: "Péntek" },
  { date: "2026-04-11", label: "Április 11", day: "Szombat" },
  {
    date: "2026-04-12",
    label: "Április 12",
    day: "VÁLASZTÁS NAP",
    featured: true,
  },
];

export function TimeSelectionScreen({
  onNext,
  onBack,
  initialSelection,
}: TimeSelectionScreenProps) {
  const [selectedDate, setSelectedDate] = useState(
    initialSelection?.date || "",
  );
  const [selectedTime, setSelectedTime] = useState(
    initialSelection?.time || "",
  );

  const handleSubmit = () => {
    if (selectedDate && selectedTime) {
      onNext({ date: selectedDate, time: selectedTime });
    }
  };

  const canProceed = selectedDate && selectedTime;

  // Animációs variációk a rácshoz
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col bg-white"
    >
      <div className="flex-1 flex flex-col p-6 max-w-4xl mx-auto w-full">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-900 mb-6 text-left transition-transform hover:-translate-x-1"
        >
          ← Vissza
        </button>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="space-y-6 mb-8"
        >
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8 text-[#CE2939]" />
            <h2 className="text-3xl font-bold text-gray-900">
              Mikor fogod őket emlékeztetni?
            </h2>
          </div>
          <p className="text-lg text-gray-600">
            Válaszd ki a napot és az időpontot, amikor kapcsolatba lépsz velük
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Date Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Válassz napot
            </h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 md:grid-cols-4 gap-3"
            >
              {dates.map((dateOption) => (
                <motion.button
                  key={dateOption.date}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDate(dateOption.date)}
                  className={`p-4 rounded-lg border-2 transition-colors relative overflow-hidden ${
                    selectedDate === dateOption.date
                      ? "border-[#CE2939] bg-[#CE2939] text-white"
                      : dateOption.featured
                        ? "border-[#477050] hover:border-[#477050] hover:bg-[#477050]/10"
                        : "border-gray-200 hover:border-gray-300 shadow-sm"
                  } ${dateOption.featured ? "font-bold" : ""}`}
                >
                  <div className="text-xs uppercase opacity-80">
                    {dateOption.day}
                  </div>
                  <div
                    className={`text-base ${dateOption.featured ? "text-lg" : ""}`}
                  >
                    {dateOption.label}
                  </div>
                  {selectedDate === dateOption.date && (
                    <motion.div
                      layoutId="outlineDate"
                      className="absolute inset-0 border-2 border-white rounded-lg"
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* Time Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Válassz időpontot
            </h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-3 md:grid-cols-6 gap-3"
            >
              {timeSlots.map((time) => (
                <motion.button
                  key={time}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    selectedTime === time
                      ? "border-[#477050] bg-[#477050] text-white"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {time}
                </motion.button>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              onClick={handleSubmit}
              className={`w-full h-14 text-lg mt-8 transition-all duration-300 ${
                canProceed
                  ? "bg-[#477050] hover:bg-[#3A5A40] text-white shadow-lg shadow-green-100"
                  : "bg-gray-100 text-gray-400"
              }`}
              disabled={!canProceed}
            >
              {canProceed
                ? "Tovább a megosztáshoz"
                : "Válassz napot és időpontot"}
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
