import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  Phone,
  MessageCircle,
  Check,
  Calendar,
  Users,
  Target,
  Trophy,
  Edit,
} from "lucide-react";
import { Progress } from "./ui/progress";

interface Friend {
  name: string;
  contacted: boolean;
  committed: boolean;
}

interface DashboardScreenProps {
  userName: string;
  friends: string[];
  scheduledTime: { date: string; time: string };
  onReset: () => void;
}

export function DashboardScreen({
  userName,
  friends: initialFriends,
  scheduledTime,
  onReset,
}: DashboardScreenProps) {
  const [friends, setFriends] = useState<Friend[]>(() => {
    const saved = localStorage.getItem("friends-status");
    if (saved) {
      return JSON.parse(saved);
    }
    return initialFriends
      .filter((f) => f.trim())
      .map((name) => ({
        name,
        contacted: false,
        committed: false,
      }));
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks-status");
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      { id: 1, text: "Tájékozódj a szavazóhelyedről", completed: false },
      {
        id: 2,
        text: "Ellenőrizd a személyi igazolványod érvényességét",
        completed: false,
      },
      {
        id: 3,
        text: "Tervezd meg az utadat a szavazóhelyedre",
        completed: false,
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem("friends-status", JSON.stringify(friends));
  }, [friends]);

  useEffect(() => {
    localStorage.setItem("tasks-status", JSON.stringify(tasks));
  }, [tasks]);

  const toggleFriendContacted = (index: number) => {
    const newFriends = [...friends];
    newFriends[index].contacted = !newFriends[index].contacted;
    setFriends(newFriends);
  };

  const toggleFriendCommitted = (index: number) => {
    const newFriends = [...friends];
    newFriends[index].committed = !newFriends[index].committed;
    setFriends(newFriends);
  };

  const toggleTask = (id: number) => {
    const newTasks = tasks.map((task: { id: number; completed: boolean }) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );
    setTasks(newTasks);
  };

  const contactedCount = friends.filter((friend) => friend.contacted).length;
  const committedCount = friends.filter((friend) => friend.committed).length;
  const tasksCompleted = tasks.filter((task) => task.completed).length;

  const totalItems = friends.length * 2 + tasks.length;
  const currentProgress = contactedCount + committedCount + tasksCompleted;
  const totalProgress = (currentProgress / totalItems) * 100;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const months = [
      "január",
      "február",
      "március",
      "április",
      "május",
      "június",
      "július",
      "augusztus",
      "szeptember",
      "október",
      "november",
      "december",
    ];
    return `${months[date.getMonth()]} ${date.getDate()}`;
  };
  // Animációs variációk
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-b from-white to-gray-50 pb-12"
    >
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header - Statikusabb, de finom belépéssel */}
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border-t-4 border-[#CE2939]"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-black text-gray-900 mb-2">
                Szia, {userName}! 👋
              </h1>
              <p className="text-gray-600 font-medium">
                Itt követheted a mozgósítási tervedet
              </p>
            </div>
            <motion.button
              whileHover={{ rotate: 90 }}
              onClick={onReset}
              className="text-gray-400 hover:text-[#CE2939] p-2 transition-colors"
            >
              <Edit className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Progress Bar - Animált szélességgel */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                Személyes vállalásod állapota
              </span>
              <motion.span
                key={currentProgress}
                initial={{ scale: 1.2, color: "#477050" }}
                animate={{ scale: 1, color: "#477050" }}
                className="text-lg font-black"
              >
                {Math.round(totalProgress)}%
              </motion.span>
            </div>
            <div className="relative h-4 w-full bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#477050] to-[#5ba36a]"
                initial={{ width: 0 }}
                animate={{ width: `${totalProgress}%` }}
                transition={{ duration: 1, ease: "circOut" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Reminder - Figyelemfelkeltő úszással */}
        <motion.div
          variants={cardVariants}
          whileHover={{ scale: 1.01 }}
          className="bg-gradient-to-r from-[#CE2939] to-[#B02030] rounded-2xl shadow-lg p-6 text-white shadow-red-200"
        >
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-6 h-6" />
            <h2 className="text-xl font-bold uppercase tracking-tight">
              Emlékeztető
            </h2>
          </div>
          <div className="text-2xl font-black">
            {formatDate(scheduledTime.date)} — {scheduledTime.time}
          </div>
        </motion.div>

        {/* Friends List */}
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <Users className="w-6 h-6 text-[#CE2939]" />
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
              Ismerőseid ({friends.length})
            </h2>
          </div>

          <div className="space-y-4">
            {friends.map((friend, index) => (
              <motion.div
                key={index}
                layout
                className={`border-2 rounded-2xl p-5 transition-colors ${
                  friend.contacted && friend.committed
                    ? "border-green-100 bg-green-50/30"
                    : "border-gray-100 bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3
                    className={`text-xl font-bold ${friend.contacted && friend.committed ? "text-green-800" : "text-gray-900"}`}
                  >
                    {friend.name}
                  </h3>
                  <AnimatePresence>
                    {friend.contacted && friend.committed && (
                      <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0 }}
                      >
                        <Trophy className="w-6 h-6 text-[#477050]" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 group cursor-pointer">
                      <div className="relative flex items-center">
                        <Checkbox
                          checked={friend.contacted}
                          onCheckedChange={() => toggleFriendContacted(index)}
                        />
                      </div>
                      <span
                        className={`font-medium transition-all ${friend.contacted ? "text-gray-400 line-through" : "text-gray-700"}`}
                      >
                        Kapcsolatba léptem
                      </span>
                    </label>

                    <label className="flex items-center gap-3 group cursor-pointer">
                      <Checkbox
                        checked={friend.committed}
                        onCheckedChange={() => toggleFriendCommitted(index)}
                      />
                      <span
                        className={`font-medium transition-all ${friend.committed ? "text-gray-400 line-through" : "text-gray-700"}`}
                      >
                        Visszaigazolta a részvételt
                      </span>
                    </label>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 rounded-xl border-green-200 text-[#477050] hover:bg-green-50"
                      onClick={() => window.open(`tel:${friend.name}`, "_self")}
                    >
                      <Phone className="w-4 h-4 mr-2" /> Hívás
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 rounded-xl border-red-100 text-[#CE2939] hover:bg-red-50"
                      onClick={() => window.open(`sms:${friend.name}`, "_self")}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" /> SMS
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tasks - Egyszerűbb checkmark animációval */}
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-[#477050]" />
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
              Saját tennivalók
            </h2>
          </div>

          <div className="space-y-3">
            {tasks.map((task) => (
              <motion.label
                key={task.id}
                layout
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  task.completed
                    ? "border-gray-100 bg-gray-50/50"
                    : "border-gray-100 hover:border-gray-200 shadow-sm"
                }`}
              >
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                />
                <span
                  className={`flex-1 font-medium ${task.completed ? "text-gray-400 line-through" : "text-gray-700"}`}
                >
                  {task.text}
                </span>
                {task.completed && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <Check className="w-5 h-5 text-[#477050]" />
                  </motion.div>
                )}
              </motion.label>
            ))}
          </div>
        </motion.div>

        {/* Election Day Card - Finom lüktetéssel */}
        <motion.div
          variants={cardVariants}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="bg-gray-900 rounded-3xl shadow-2xl p-10 text-white text-center"
        >
          <div className="text-6xl font-black mb-2 tracking-tighter">
            ÁPRILIS 12
          </div>
          <div className="text-xl font-bold text-[#CE2939] uppercase tracking-[0.3em] mb-4">
            Választás napja
          </div>
          <div className="text-gray-400 font-medium italic">
            "A szabadság ott kezdődik, ahol a félelem véget ér."
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
