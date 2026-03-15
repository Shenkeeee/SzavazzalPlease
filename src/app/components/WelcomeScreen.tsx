import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface WelcomeScreenProps {
  onNext: (name: string) => void;
  initialName?: string;
}

export function WelcomeScreen({
  onNext,
  initialName = "",
}: WelcomeScreenProps) {
  const [name, setName] = useState(initialName);
  const [region, setRegion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onNext(name.trim());
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1, // Az elemek egymás után úsznak be
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white overflow-hidden">
      <motion.div
        className="w-full max-w-md space-y-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="text-center space-y-4" variants={itemVariants}>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            Április 12
          </h1>
          <p className="text-xl text-gray-600">
            Mozgósítsuk együtt az embereket!
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6 mt-12"
          variants={itemVariants}
        >
          <div className="space-y-2">
            <Label htmlFor="name" className="text-lg font-medium">
              Hogy hívhatunk?
            </Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="pl. Ferenc"
              className="h-14 text-lg border-2 focus:border-[#CE2939] transition-colors"
              required
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="region"
              className="text-md font-medium text-gray-500"
            >
              Régiód / városod (opcionális)
            </Label>
            <Input
              id="region"
              type="text"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder="pl. Pécs"
              className="h-14 text-lg border-2 focus:border-[#CE2939] transition-colors"
            />
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              className="w-full h-14 text-lg bg-[#CE2939] hover:bg-[#B02030] text-white font-bold shadow-lg shadow-red-100"
              disabled={!name.trim()}
            >
              Kezdjük!
            </Button>
          </motion.div>
        </motion.form>

        <motion.p
          className="text-center text-sm text-gray-400 mt-8 leading-relaxed"
          variants={itemVariants}
        >
          Készíts tervet a választásra és mozgósítsd a kapcsolataidat
          regisztráció nélkül.
        </motion.p>
      </motion.div>
    </div>
  );
}
