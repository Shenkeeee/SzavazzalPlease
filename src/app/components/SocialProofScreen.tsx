import { Users, Zap, Calendar, Award, Globe } from "lucide-react";

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

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 flex flex-col p-6 max-w-2xl mx-auto w-full">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-900 mb-6 text-left"
        >
          ← Vissza
        </button>
        <div className="min-h-screen flex flex-col p-6 items-center justify-center">
          <div className="max-w-2xl mx-auto w-full space-y-8">
            {/* Header */}
            <div className="text-center space-y-2 pt-8">
              <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-tight">
                EGYÜTT <span className="text-[#CE2939]">ERŐSEBBEK</span> VAGYUNK
              </h1>
              <p className="text-gray-600 text-lg font-medium">
                Már ennyien tettünk szavazási vállalást:
              </p>
            </div>

            {/* 1. ALL TIME - A legnagyobb kártya */}
            <div className="bg-white border-b-8 border-[#477050] rounded-3xl p-8 shadow-xl text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Award className="w-24 h-24 text-[#477050]" />
              </div>
              <div className="flex justify-center mb-2">
                <Users className="w-10 h-10 text-[#477050]" />
              </div>
              <div className="text-7xl font-black text-gray-900 mb-2">
                {stats.allTimeJoined.toLocaleString()}
              </div>
              <div className="text-xl font-bold text-gray-500 uppercase tracking-[0.2em]">
                Összes csatlakozó
              </div>
            </div>

            {/* 2. TODAY & WEEKLY GRID */}
            <div className="grid grid-cols-2 gap-4">
              {/* Today */}
              <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-[#CE2939] flex flex-col items-center text-center">
                <Zap className="w-8 h-8 text-[#CE2939] mb-3" />
                <div className="text-3xl font-black text-gray-900">
                  +{stats.todayJoined.toLocaleString()}
                </div>
                <div className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                  Ma érkeztek
                </div>
              </div>

              {/* Weekly */}
              <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-blue-500 flex flex-col items-center text-center">
                <Calendar className="w-8 h-8 text-blue-500 mb-3" />
                <div className="text-3xl font-black text-gray-900">
                  +{stats.weeklyJoined.toLocaleString()}
                </div>
                <div className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                  Ezen a héten
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4 pb-12">
              <button
                className="w-full bg-[#CE2939] text-white font-black py-5 rounded-2xl text-xl shadow-lg hover:bg-red-700 active:scale-[0.98] transition-all uppercase tracking-tight"
                onClick={onForward}
              >
                Én is szeretnék segíteni
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
