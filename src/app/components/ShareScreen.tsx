import { useState } from "react";
import { Button } from "./ui/button";
import {
  Copy,
  Check,
  Share2,
  MessageCircle,
  Mail,
  Users,
  Trophy,
} from "lucide-react";

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

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      const textArea = document.createElement("textarea");
      textArea.value = shareText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 flex flex-col p-6 max-w-2xl mx-auto w-full">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-900 mb-6 text-left"
        >
          ← Vissza
        </button>

        <div className="flex-1 flex flex-col justify-center space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Share2 className="w-8 h-8 text-[#CE2939]" />
              <h2 className="text-3xl font-bold text-gray-900">
                Oszd meg másokkal is!
              </h2>
            </div>
            <p className="text-lg text-gray-600">
              Minél többen vagyunk, annál erősebb a mozgalom
            </p>
          </div>

          {/* Share Card Preview */}
          <div className="border-4 border-[#CE2939] rounded-2xl p-6 md:p-8 bg-gradient-to-br from-white to-gray-50 shadow-lg">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-2 h-12 bg-[#CE2939]" />
              <div className="w-2 h-12 bg-white border-2 border-gray-300" />
              <div className="w-2 h-12 bg-[#477050]" />
            </div>

            <h3 className="text-2xl font-bold text-center text-gray-900 mb-4">
              {userName} elkötelezte magát
            </h3>

            <div className="bg-white rounded-lg p-6 border-2 border-gray-200 mb-6">
              <div className="text-center space-y-3">
                <div className="text-5xl font-bold text-[#CE2939]">
                  {friendsCount}
                </div>
                <div className="text-lg text-gray-700">ember mozgósítása</div>
                <div className="text-3xl font-bold text-gray-900 mt-4">
                  Április 12
                </div>
                <div className="text-gray-600">Választás napja</div>
              </div>
            </div>

            <p className="text-center text-gray-700 text-lg">
              Csatlakozz te is a mozgalomhoz! 🇭🇺
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleCopyLink}
              className="w-full h-14 text-lg bg-[#477050] hover:bg-[#3A5A40] text-white flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  Másolva!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  Link másolása
                </>
              )}
            </Button>

            <Button
              onClick={handleCopyMessage}
              variant="outline"
              className="w-full h-14 text-lg border-2 border-[#CE2939] text-[#CE2939] hover:bg-[#CE2939] hover:text-white flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Üzenet másolása
            </Button>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button
                variant="outline"
                className="h-12 border-gray-300 hover:bg-gray-100"
                onClick={() =>
                  window.open(
                    `mailto:?subject=Gyere el szavazni!&body=${encodeURIComponent(shareText)}`,
                    "_blank",
                  )
                }
              >
                <Mail className="w-5 h-5 mr-2" />
                Email
              </Button>
              <Button
                variant="outline"
                className="h-12 border-gray-300 hover:bg-gray-100"
                onClick={() =>
                  window.open(
                    `https://wa.me/?text=${encodeURIComponent(shareText)}`,
                    "_blank",
                  )
                }
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>

          <Button
            onClick={onNext}
            className="w-full h-14 text-lg bg-[#CE2939] hover:bg-[#B02030] text-white"
          >
            Tovább a feladataimhoz
          </Button>

          <Button
            onClick={onLeaderboard}
            variant="outline"
            className="w-full h-14 text-lg border-2 border-[#477050] text-[#477050] hover:bg-[#477050] hover:text-white flex items-center justify-center gap-2"
          >
            <Trophy className="w-5 h-5" />
            Nézd meg, hányan vagyunk már! (Ranglista)
          </Button>
        </div>
      </div>
    </div>
  );
}
