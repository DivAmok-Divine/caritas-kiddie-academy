"use client";

interface StatCard {
  label: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
  valueColor?: string;
}

interface QuickStatsCardsProps {
  stats: StatCard[];
}

export default function QuickStatsCards({ stats }: QuickStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="rounded-lg shadow-xl p-4 border relative overflow-hidden" style={{ backgroundColor: '#F8F9FA' }}>
          {/* Decorative bubbles */}
          <div className="absolute top-[-10px] right-[-10px] w-20 h-20 rounded-full opacity-20" style={{ backgroundColor: '#00A3A3' }}></div>
          <div className="absolute bottom-[-15px] left-[-15px] w-16 h-16 rounded-full opacity-15" style={{ backgroundColor: '#00A3A3' }}></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3 pb-3 border-b" style={{ borderColor: '#E0E0E0' }}>
              <p className="text-sm font-medium" style={{ color: '#212529' }}>{stat.label}</p>
              <div className={`h-10 w-10 ${stat.iconBgColor} rounded-full flex items-center justify-center shadow-md`}>
                <div className={`${stat.iconColor} flex items-center justify-center`}>
                  {stat.icon}
                </div>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold" style={{ color: stat.valueColor || '#212529' }}>
                {stat.value}
              </p>
              {stat.subtitle && (
                <p className="text-xs mt-1 pt-2 border-t" style={{ color: '#212529', borderColor: '#E0E0E0' }}>{stat.subtitle}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

