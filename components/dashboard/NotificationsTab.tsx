import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WrenchIcon, BellIcon } from "lucide-react";
import { NotificationCard } from "./NotificationsCard";

interface Notification {
  id: string;
  title: string;
  description: string;
  date: string;
}

interface NotificationsTabProps {
  notifications: Notification[];
}

export const NotificationsTab = ({ notifications }: NotificationsTabProps) => {
  return (
    <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-amber-200/50 dark:border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BellIcon className="w-5 h-5 text-amber-600" />
          Notifikasi
        </CardTitle>
        <CardDescription>
          Lihat Notifikasi Anda
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <NotificationCard key={notification.id} notification={notification} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
