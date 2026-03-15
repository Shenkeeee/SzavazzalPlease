import { motion } from "framer-motion";
import {
  BarChart3,
  MousePointer2,
  Share2,
  MapPin,
  TrendingUp,
  Activity,
} from "lucide-react";

export function AdminDashboard() {
  const campaignStats = {
    totalLinkCopies: 1245,
    totalReferralClicks: 4589,
    conversionRate: "0.4x",
    topRegions: [
      { name: "Budapest", clicks: 1542 },
      { name: "Pécs", clicks: 420 },
      { name: "Debrecen", clicks: 389 },
      { name: "Szeged", clicks: 310 },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans"
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Admin Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Kampány <span className="text-[#CE2939]">Felügyelet</span>
            </h1>
            <div className="flex items-center gap-2 text-slate-500 mt-1">
              <Activity className="w-4 h-4 text-green-500" />
              <p className="font-medium text-sm">
                Valós idejű mozgósítási statisztikák
              </p>
            </div>
          </div>
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="bg-[#CE2939] text-white px-4 py-1.5 rounded-full text-xs font-black letter tracking-widest uppercase"
          >
            ● Live Adatok
          </motion.div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              label: "Link másolások",
              val: campaignStats.totalLinkCopies,
              icon: Share2,
              trend: "↑ 12%",
            },
            {
              label: "Referral kattintások",
              val: campaignStats.totalReferralClicks,
              icon: MousePointer2,
              trend: "↑ 8%",
            },
            {
              label: "Conversion ráta",
              val: campaignStats.conversionRate,
              icon: TrendingUp,
              trend: "Stabil",
              color: "text-[#477050]",
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-slate-50 rounded-lg">
                  <stat.icon className="w-5 h-5 text-slate-600" />
                </div>
                <span
                  className={`text-xs font-bold ${stat.trend.includes("↑") ? "text-green-600" : "text-slate-400"}`}
                >
                  {stat.trend}
                </span>
              </div>
              <div
                className={`text-4xl font-black ${stat.color || "text-slate-900"}`}
              >
                {typeof stat.val === "number"
                  ? stat.val.toLocaleString()
                  : stat.val}
              </div>
              <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Regionális ranglista - Animált oszlopokkal */}
          <motion.div
            variants={itemVariants}
            className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200"
          >
            <h3 className="text-lg font-black mb-6 flex items-center gap-2 uppercase tracking-tight">
              <MapPin className="w-5 h-5 text-[#CE2939]" /> Legaktívabb
              területek
            </h3>
            <div className="space-y-6">
              {campaignStats.topRegions.map((region, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-slate-700">{region.name}</span>
                    <span className="text-slate-900">
                      {region.clicks.toLocaleString()} kattintás
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(region.clicks / campaignStats.topRegions[0].clicks) * 100}%`,
                      }}
                      transition={{
                        duration: 1.5,
                        ease: "easeOut",
                        delay: 0.5 + i * 0.1,
                      }}
                      className="bg-gradient-to-r from-[#477050] to-[#5ba36a] h-full rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Technikai log - Gépelés effekttel */}
          <motion.div
            variants={itemVariants}
            className="bg-slate-900 text-slate-300 p-8 rounded-2xl shadow-xl font-mono text-[11px] relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-[#CE2939] to-green-500 opacity-50" />
            <h3 className="text-white font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-xs opacity-50">
              <BarChart3 className="w-4 h-4" /> Rendszernapló log
            </h3>
            <div className="space-y-2">
              {[
                {
                  time: "23:41:02",
                  msg: "NEW_PLEDGE: User from Budapest created a plan",
                  color: "text-slate-400",
                },
                {
                  time: "23:41:45",
                  msg: "LINK_SHARED: WhatsApp click detected from Pécs",
                  color: "text-slate-400",
                },
                {
                  time: "23:42:10",
                  msg: "GOAL_REACHED: 24,000 users milestone",
                  color: "text-green-400 font-bold",
                },
                {
                  time: "23:42:30",
                  msg: "REFERRAL_HIT: Unique ID: x7f2-a9b1 clicked",
                  color: "text-blue-400",
                },
                {
                  time: "23:43:01",
                  msg: "SYSTEM: Database optimization complete",
                  color: "text-slate-500",
                },
              ].map((log, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + i * 0.3 }}
                  className="flex gap-3"
                >
                  <span className="text-slate-600">[{log.time}]</span>
                  <span className={log.color}>{log.msg}</span>
                </motion.p>
              ))}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-2 h-4 bg-[#CE2939] align-middle ml-1"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
