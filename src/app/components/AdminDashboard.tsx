import {
  BarChart3,
  MousePointer2,
  Share2,
  MapPin,
  TrendingUp,
} from "lucide-react";

export function AdminDashboard() {
  const campaignStats = {
    totalLinkCopies: 1245,
    totalReferralClicks: 4589,
    conversionRate: "0.4x", // Egy link másolásból átlagosan ennyi kattintás jön
    topRegions: [
      { name: "Budapest", clicks: 1542 },
      { name: "Pécs", clicks: 420 },
      { name: "Debrecen", clicks: 389 },
      { name: "Szeged", clicks: 310 },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Admin Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Kampány Felügyelet
            </h1>
            <p className="text-slate-500">
              Valós idejű mozgósítási statisztikák
            </p>
          </div>
          <div className="bg-[#CE2939] text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse">
            LIVE ADATOK
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 text-slate-500 mb-2">
              <Share2 className="w-5 h-5" />
              <span className="font-medium">Link másolások</span>
            </div>
            <div className="text-3xl font-black">
              {campaignStats.totalLinkCopies.toLocaleString()}
            </div>
            <div className="text-xs text-green-600 font-bold mt-2">
              ↑ 12% az elmúlt órában
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 text-slate-500 mb-2">
              <MousePointer2 className="w-5 h-5" />
              <span className="font-medium">Referral kattintások</span>
            </div>
            <div className="text-3xl font-black">
              {campaignStats.totalReferralClicks.toLocaleString()}
            </div>
            <div className="text-xs text-green-600 font-bold mt-2">
              ↑ 8% az elmúlt órában
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 text-slate-500 mb-2">
              <TrendingUp className="w-5 h-5" />
              <span className="font-medium">Conversion ráta</span>
            </div>
            <div className="text-3xl font-black text-[#477050]">
              {campaignStats.conversionRate}
            </div>
            <div className="text-xs text-slate-400 mt-2">
              Kattintás / Megosztás arány
            </div>
          </div>
        </div>

        {/* Regionális ranglista */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#CE2939]" /> Legaktívabb
              területek
            </h3>
            <div className="space-y-4">
              {campaignStats.topRegions.map((region, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-sm font-bold">
                    <span>{region.name}</span>
                    <span>{region.clicks.toLocaleString()} click</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#477050] h-full transition-all duration-1000"
                      style={{
                        width: `${(region.clicks / campaignStats.topRegions[0].clicks) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technikai log (példa) */}
          <div className="bg-slate-900 text-slate-300 p-6 rounded-xl shadow-sm font-mono text-xs">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4" /> Rendszernapló (Logs)
            </h3>
            <div className="space-y-1 opacity-80">
              <p>[23:41:02] NEW_PLEDGE: User from Budapest created a plan</p>
              <p>[23:41:45] LINK_SHARED: WhatsApp click detected from Pécs</p>
              <p className="text-green-400">
                [23:42:10] GOAL_REACHED: 24,000 users milestone
              </p>
              <p>[23:42:30] REFERRAL_HIT: Unique ID: x7f2-a9b1 clicked</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
