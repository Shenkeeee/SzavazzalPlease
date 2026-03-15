import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { UserPlus, Check } from "lucide-react";

interface CommitmentScreenProps {
  userName: string;
  onNext: (friends: string[]) => void;
  onBack: () => void;
  initialFriends?: string[];
}

export function CommitmentScreen({
  userName,
  onNext,
  onBack,
  initialFriends = ["", "", ""],
}: CommitmentScreenProps) {
  const [friends, setFriends] = useState<string[]>(initialFriends);

  const handleFriendChange = (index: number, value: string) => {
    const newFriends = [...friends];
    newFriends[index] = value;
    setFriends(newFriends);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validFriends = friends.filter((f) => f.trim());
    if (validFriends.length > 0) {
      onNext(friends);
    }
  };

  const filledCount = friends.filter((f) => f.trim()).length;
  const canProceed = filledCount > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen flex flex-col bg-white"
    >
      <div className="flex-1 flex flex-col p-6 max-w-2xl mx-auto w-full">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-900 mb-6 text-left transition-transform hover:-translate-x-1"
        >
          ← Vissza
        </button>

        <div className="flex-1 flex flex-col justify-center space-y-8">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-bold text-gray-900 leading-tight">
              Üdv, <span className="text-[#CE2939]">{userName}</span>! 👋
            </h2>
            <p className="text-xl text-gray-600 font-medium">
              Kit fogsz emlékeztetni a választásra?
            </p>
            <p className="text-base text-gray-500">
              Add meg 3 ismerősöd nevét, akiket mozgósítani szeretnél. Ez a te
              személyes vállalásod.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <Label
                  htmlFor={`friend-${index}`}
                  className="text-lg flex items-center gap-2"
                >
                  <UserPlus
                    className={`w-5 h-5 ${friends[index]?.trim() ? "text-[#477050]" : "text-[#CE2939]"} transition-colors`}
                  />
                  <span className="font-bold">{index + 1}. személy</span>

                  <AnimatePresence>
                    {friends[index]?.trim() && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="ml-auto"
                      >
                        <Check className="w-6 h-6 text-[#477050]" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Label>
                <Input
                  id={`friend-${index}`}
                  type="text"
                  value={friends[index]}
                  onChange={(e) => handleFriendChange(index, e.target.value)}
                  placeholder={`pl. ${index === 0 ? "Kovács Anna" : index === 1 ? "Nagy Péter" : "Szabó Eszter"}`}
                  className={`h-14 text-lg border-2 transition-all ${
                    friends[index]?.trim()
                      ? "border-[#477050]/30 bg-green-50/10"
                      : "border-gray-200"
                  }`}
                />
              </motion.div>
            ))}

            <div className="pt-4">
              <motion.div
                key={filledCount}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-4 text-sm font-bold uppercase tracking-wider ${filledCount === 3 ? "text-[#477050]" : "text-gray-500"}`}
              >
                {filledCount === 0 && "Adj meg legalább 1 személyt"}
                {filledCount === 1 && "Remek! Még 2 embert javaslunk."}
                {filledCount === 2 && "Szuper! Még egy utolsó név."}
                {filledCount === 3 && "✨ Készen állsz a mozgósításra!"}
              </motion.div>

              <Button
                type="submit"
                className={`w-full h-16 text-xl font-black transition-all duration-300 shadow-lg ${
                  canProceed
                    ? "bg-[#477050] hover:bg-[#3A5A40] text-white shadow-green-100 scale-100"
                    : "bg-gray-100 text-gray-400 scale-[0.98]"
                }`}
                disabled={!canProceed}
              >
                Tovább a tervezéshez
              </Button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
