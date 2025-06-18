import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BellIcon, TruckIcon,WrenchIcon,CheckCircleIcon, WrenchIcon as ToolIcon } from "lucide-react";


interface TimelineEvent {
  status: string;
  title: string;
  description: string;
  date: string;
  by: string;
}

interface FlattenedEvent {
  id: string;
  device: string;
  status: string;
  title: string;
  description: string;
  date: string;
  by: string;
}

interface Order {
  id: string;
  device: string;
  date: string;
  timeline: TimelineEvent[];
}

interface NotificationsTabProps {
  orders: Order[];
}

export const NotificationsTab = ({ orders }: NotificationsTabProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  

  // Proses flatten
  const flattenedTimeline: FlattenedEvent[] = orders.flatMap((order) =>
    order.timeline.map((event) => ({
      id: order.id,
      device: order.device,
      status: event.status,
      title: event.title,
      description: event.description,
      date: event.date,
      by: event.by,
    }))
  );

  // Sorting berdasarkan tanggal
  const sortedTimeline = flattenedTimeline.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

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
        <div className="space-y-6">
          {sortedTimeline.map((event, index) => (
            <div key={index} className="flex gap-4">
              {/* Icon Timeline Notifikasi */}
              <div className="flex flex-col items-center">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center border-2
                    ${event.status === "received" ? "bg-blue-100 border-blue-300" : ""}
                    ${event.status === "diagnosed" ? "bg-yellow-100 border-yellow-300" : ""}
                    ${event.status === "in-progress" ? "bg-orange-100 border-orange-300" : ""}
                    ${event.status === "completed" ? "bg-green-100 border-green-300" : ""}
                  `}
                >
                  {event.status === "received" && <TruckIcon className="w-5 h-5 text-blue-600" />}
                  {event.status === "diagnosed" && <WrenchIcon className="w-5 h-5 text-yellow-600" />}
                  {event.status === "in-progress" && <ToolIcon className="w-5 h-5 text-orange-600" />}
                  {event.status === "completed" && <CheckCircleIcon className="w-5 h-5 text-green-600" />}
                </div>
              </div>

              {/* Isi Notifikasi */}
              <div className="flex-1 pb-8">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    {event.title} - {event.device}
                  </h4>
                  <span className="text-xs text-slate-500">{formatDate(event.date)}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-2">{event.description}</p>
                <p className="text-sm text-slate-500">Oleh: {event.by}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

    </Card>
  );
};