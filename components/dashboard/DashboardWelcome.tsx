import { SparklesIcon } from "lucide-react";

export const DashboardWelcome = () => {
  return (
    <div className="mb-8 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 to-amber-400/10 rounded-2xl blur-3xl"></div>
      <div className="relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 border border-amber-200/50 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent mb-2">
              Selamat Datang di Dashboard
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              Kelola pesanan servis elektronik Anda dengan mudah dan efisien
            </p>
          </div>
          <div className="hidden lg:block">
            <SparklesIcon className="w-16 h-16 text-amber-500 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};
