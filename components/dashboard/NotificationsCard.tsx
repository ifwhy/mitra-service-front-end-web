import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  description: string;
  date: string;
}

interface NotificationCardProps {
  notification: Notification;
}

export const NotificationCard = ({ notification }: NotificationCardProps) => {
  return (
    <Card className="relative overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-r from-white to-amber-50/20 dark:from-slate-900 dark:to-amber-900/10">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-amber-600"></div>
      <CardContent className="p-6">
        <div className="w-full flex flex-col lg:items-center justify-between gap-3 lg:gap-4">
          <div className="w-full flex items-center justify-between gap-3 flex-wrap">
            <h3 className="font-semibold text-lg lg:text-xl text-slate-900 dark:text-white">
              {notification.title}
            </h3>
            <span className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm text-slate-500 dark:text-slate-400">
              <CalendarIcon className="w-4 h-4 text-amber-600" />
              <div>
                <p>{new Date(notification.date).toLocaleDateString("id-ID")}</p>
              </div>
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-sm lg:text-base leading-relaxed w-full">
            {notification.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
