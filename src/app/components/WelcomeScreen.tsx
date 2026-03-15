import { useState } from "react";
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          {/* <div className="flex flex-col items-center justify-center gap-1 mb-6">
              <div className="w-12 h-2 bg-[#CE2939]" />
              <div className="w-12 h-2 bg-white border-2 border-gray-300" />
              <div className="w-12 h-2 bg-[#477050]" />
            </div> */}
          <h1 className="text-4xl font-bold text-gray-900">Április 12</h1>
          <p className="text-xl text-gray-600">
            Mozgósítsuk együtt az embereket!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mt-12">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-lg">
              Hogy hívhatunk?
            </Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="pl. Ferenc"
              className="h-14 text-lg"
              required
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="region" className="text-md">
              Régiód / városod (opcionális)
            </Label>
            <Input
              id="region"
              type="text"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder="pl. Pécs"
              className="h-14 text-lg"
              required
              autoFocus
            />
          </div>

          <Button
            type="submit"
            className="w-full h-14 text-lg bg-[#CE2939] hover:bg-[#B02030] text-white"
            disabled={!name.trim()}
          >
            Kezdjük!
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-8">
          Készíts tervet a választásra és mozgósítsd a kapcsolataidat
        </p>
      </div>
    </div>
  );
}
