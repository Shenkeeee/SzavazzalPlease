import { useState } from "react";
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

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 flex flex-col p-6 max-w-4xl mx-auto w-full">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-900 mb-6 text-left"
        >
          ← Vissza
        </button>

        <div className="space-y-6 mb-8">
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8 text-[#CE2939]" />
            <h2 className="text-3xl font-bold text-gray-900">
              Mikor fogod őket emlékeztetni?
            </h2>
          </div>
          <p className="text-lg text-gray-600">
            Válaszd ki a napot és az időpontot, amikor kapcsolatba lépsz velük
          </p>
        </div>

        <div className="space-y-8">
          {/* Date Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Válassz napot
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {dates.map((dateOption) => (
                <button
                  key={dateOption.date}
                  onClick={() => setSelectedDate(dateOption.date)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedDate === dateOption.date
                      ? "border-[#CE2939] bg-[#CE2939] text-white"
                      : dateOption.featured
                        ? "border-[#477050] hover:border-[#477050] hover:bg-[#477050]/10"
                        : "border-gray-200 hover:border-gray-300"
                  } ${dateOption.featured ? "font-bold" : ""}`}
                >
                  <div className="text-sm">{dateOption.day}</div>
                  <div
                    className={`text-base ${dateOption.featured ? "text-lg" : ""}`}
                  >
                    {dateOption.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Válassz időpontot
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedTime === time
                      ? "border-[#477050] bg-[#477050] text-white"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full h-14 text-lg bg-[#477050] hover:bg-[#3A5A40] text-white mt-8"
            disabled={!canProceed}
          >
            {canProceed
              ? "Tovább a megosztáshoz"
              : "Válassz napot és időpontot"}
          </Button>
        </div>
      </div>
    </div>
  );
}
