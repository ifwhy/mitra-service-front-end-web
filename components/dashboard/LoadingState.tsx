export const LoadingState = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-amber-50/30 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-amber-200 dark:border-amber-800 rounded-full animate-spin border-t-amber-600 dark:border-t-amber-400 mx-auto mb-4"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-pulse border-t-amber-300 dark:border-t-amber-500 mx-auto"></div>
        </div>
        <div className="space-y-2">
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            Memuat dashboard...
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-500">
            Mohon tunggu sebentar
          </p>
        </div>
      </div>
    </div>
  );
};
