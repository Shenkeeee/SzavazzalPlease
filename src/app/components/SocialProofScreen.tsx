import { motion } from "framer-motion";
import { Users, Zap, Calendar, Award } from "lucide-react";
import { useEffect, useState } from "react";

function CountingNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1.5; // másodperc
    const increment = end / (duration * 60);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{displayValue.toLocaleString()}</span>;
}

interface SocialProofScreenProps {
  onBack: () => void;
  onForward: () => void;
}

export function SocialProofScreen({
  onBack,
  onForward,
}: SocialProofScreenProps) {
  const stats = {
    todayJoined: 13,
    weeklyJoined: 158,
    allTimeJoined: 2453,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen flex flex-col bg-white"
    >
      <div className="flex-1 flex flex-col p-6 max-w-2xl mx-auto w-full">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-900 mb-6 text-left transition-transform hover:-translate-x-1"
        >
          ← Vissza
        </button>

        <div className="flex-1 flex flex-col items-center justify-center space-y-8">
          {/* Header */}
          <motion.div variants={cardVariants} className="text-center space-y-2">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-tight">
              EGYÜTT <span className="text-[#CE2939]">ERŐSEBBEK</span> VAGYUNK
            </h1>
            <p className="text-gray-600 text-lg font-medium">
              Már ennyien tettünk szavazási vállalást:
            </p>
          </motion.div>

          {/* 1. ALL TIME - Nagy kártya */}
          <motion.div
            variants={cardVariants}
            className="w-full bg-white border-b-8 border-[#477050] rounded-3xl p-8 shadow-2xl text-center relative overflow-hidden"
          >
            <motion.div
              initial={{ rotate: -10, opacity: 0 }}
              animate={{ rotate: 0, opacity: 0.1 }}
              transition={{ duration: 1 }}
              className="absolute top-0 right-0 p-4"
            >
              <Award className="w-24 h-24 text-[#477050]" />
            </motion.div>

            <div className="flex justify-center mb-2">
              <Users className="w-10 h-10 text-[#477050]" />
            </div>
            <div className="text-7xl font-black text-gray-900 mb-2 tracking-tighter">
              <CountingNumber value={stats.allTimeJoined} />
            </div>
            <div className="text-xl font-bold text-gray-500 uppercase tracking-[0.2em]">
              Összes csatlakozó
            </div>
          </motion.div>

          {/* 2. GRID - Kisebb kártyák */}
          <div className="grid grid-cols-2 gap-4 w-full">
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-[#CE2939] flex flex-col items-center text-center"
            >
              <Zap className="w-8 h-8 text-[#CE2939] mb-3" />
              <div className="text-3xl font-black text-gray-900">
                +<CountingNumber value={stats.todayJoined} />
              </div>
              <div className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                Ma érkeztek
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-blue-500 flex flex-col items-center text-center"
            >
              <Calendar className="w-8 h-8 text-blue-500 mb-3" />
              <div className="text-3xl font-black text-gray-900">
                +<CountingNumber value={stats.weeklyJoined} />
              </div>
              <div className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                Ezen a héten
              </div>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div variants={cardVariants} className="w-full pt-4 pb-12">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#CE2939] text-white font-black py-5 rounded-2xl text-xl shadow-lg hover:bg-red-700 transition-colors uppercase tracking-tight"
              onClick={onForward}
            >
              Én is szeretnék segíteni
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
