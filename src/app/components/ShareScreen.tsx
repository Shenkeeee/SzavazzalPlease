import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Copy, Check, Share2, MessageCircle, Mail, Trophy } from "lucide-react";

interface ShareScreenProps {
  userName: string;
  friendsCount: number;
  onNext: () => void;
  onLeaderboard: () => void;
  onBack: () => void;
}

export function ShareScreen({
  userName,
  friendsCount,
  onNext,
  onLeaderboard,
  onBack,
}: ShareScreenProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = `https://valasztas2026.hu/mozgositas/${userName.toLowerCase().replace(/\s+/g, "-")}`;
  const shareText = `Szia! 👋\n\nÉn már elköteleződtem, hogy szavazok április 12-én! 🇭🇺\n\nSzámítok rád is - gyere el te is szavazni!\n\nCsatlakozz hozzám: ${shareUrl}`;

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
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

        <div className="flex-1 flex flex-col justify-center space-y-8">
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
              >
                <Share2 className="w-8 h-8 text-[#CE2939]" />
              </motion.div>
              <h2 className="text-3xl font-bold text-gray-900 leading-tight">
                Oszd meg másokkal is!
              </h2>
            </div>
            <p className="text-lg text-gray-600">
              Minél többen vagyunk, annál erősebb a mozgalom
            </p>
          </motion.div>

          {/* Share Card Preview - Finom pulzálással és árnyékkal */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="border-4 border-[#CE2939] rounded-2xl p-6 md:p-8 bg-gradient-to-br from-white to-gray-50 shadow-xl relative"
          >
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-4 italic">
              {userName} elkötelezte magát
            </h3>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white rounded-lg p-6 border-2 border-gray-100 mb-6 shadow-inner"
            >
              <div className="text-center space-y-3">
                <div className="text-6xl font-black text-[#CE2939]">
                  {friendsCount}
                </div>
                <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                  Embert mozgósít
                </div>
                <div className="h-px bg-gray-100 w-full my-2" />
                <div className="text-2xl font-black text-gray-900 uppercase">
                  Április 12
                </div>
                <div className="text-sm text-gray-500 font-medium">
                  Választás napja 🇭🇺
                </div>
              </div>
            </motion.div>

            <p className="text-center text-gray-700 font-medium">
              Csatlakozz te is a mozgalomhoz!
            </p>
          </motion.div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <motion.div variants={itemVariants} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={() => handleCopy(shareUrl)}
                className={`w-full h-14 text-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                  copied ? "bg-green-600" : "bg-[#477050] hover:bg-[#3A5A40]"
                } text-white shadow-md`}
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Check className="w-5 h-5" /> Másolva!
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2"
                    >
                      <Copy className="w-5 h-5" /> Link másolása
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={() => handleCopy(shareText)}
                variant="outline"
                className="w-full h-14 text-lg border-2 border-[#CE2939] text-[#CE2939] hover:bg-[#CE2939] hover:text-white flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                Üzenet másolása
              </Button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-3 pt-2"
            >
              <Button
                variant="outline"
                className="h-12 border-gray-200 hover:bg-gray-50"
                onClick={() =>
                  window.open(
                    `mailto:?subject=Választás 2026&body=${encodeURIComponent(shareText)}`,
                    "_blank",
                  )
                }
              >
                <Mail className="w-5 h-5 mr-2" /> Email
              </Button>
              <Button
                variant="outline"
                className="h-12 border-gray-200 hover:bg-gray-50"
                onClick={() =>
                  window.open(
                    `https://wa.me/?text=${encodeURIComponent(shareText)}`,
                    "_blank",
                  )
                }
              >
                <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp
              </Button>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="space-y-3 pt-4">
            <Button
              onClick={onNext}
              className="w-full h-16 text-xl bg-[#CE2939] hover:bg-[#B02030] text-white font-black shadow-lg shadow-red-100 uppercase tracking-tight"
            >
              Tovább a feladataimhoz
            </Button>

            <Button
              onClick={onLeaderboard}
              variant="ghost"
              className="w-full h-12 text-[#477050] hover:bg-green-50 flex items-center justify-center gap-2 font-bold"
            >
              <Trophy className="w-5 h-5" />
              Nézd meg, hányan vagyunk már!
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
