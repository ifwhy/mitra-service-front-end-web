import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUpIcon } from "lucide-react";

interface StatCard {
  title: string;
  value: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  trend: string;
  color: string;
}

interface DashboardStatsProps {
  stats: StatCard[];
}

export const DashboardStats = ({ stats }: DashboardStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="relative overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-amber-200/50 dark:border-slate-700"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent"></div>
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">
              {stat.title}
            </CardTitle>
            <div className="p-2 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-lg">
              <stat.icon className="h-4 w-4 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              {stat.value}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1 mt-2">
              <TrendingUpIcon className="w-3 h-3 text-green-500" />
              <span className="text-green-500 font-medium">{stat.trend}</span>
              <span>{stat.description}</span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
