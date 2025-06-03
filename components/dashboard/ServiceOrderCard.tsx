import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ClockIcon, UserIcon, StarIcon } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { useRouter } from "next/navigation";

interface ServiceOrder {
  id: string;
  device: string;
  issue: string;
  status: string;
  date: string;
  estimatedCompletion: string;
  technician: string;
  price: number;
  rating: number;
}

interface ServiceOrderCardProps {
  order: ServiceOrder;
}

export const ServiceOrderCard = ({ order }: ServiceOrderCardProps) => {
  const router = useRouter();

  const handleDetailClick = () => {
    router.push(`/dashboard/orders/${order.id}`);
  };

  return (
    <Card className="relative overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-r from-white to-amber-50/20 dark:from-slate-900 dark:to-amber-900/10">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-amber-600"></div>
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <Badge
                variant="outline"
                className="font-mono bg-slate-100 dark:bg-slate-800"
              >
                {order.id}
              </Badge>
              <StatusBadge status={order.status} />
              <div className="flex items-center gap-1">
                <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  {order.rating}
                </span>
              </div>
            </div>
            <h3 className="font-semibold text-xl text-slate-900 dark:text-white">
              {order.device}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {order.issue}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <CalendarIcon className="w-4 h-4 text-amber-600" />
                <div>
                  <p className="font-medium">Masuk</p>
                  <p>{new Date(order.date).toLocaleDateString("id-ID")}</p>
                </div>
              </span>
              <span className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <ClockIcon className="w-4 h-4 text-amber-600" />
                <div>
                  <p className="font-medium">Estimasi</p>
                  <p>
                    {new Date(order.estimatedCompletion).toLocaleDateString(
                      "id-ID"
                    )}
                  </p>
                </div>
              </span>
              <span className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <UserIcon className="w-4 h-4 text-amber-600" />
                <div>
                  <p className="font-medium">Teknisi</p>
                  <p>{order.technician}</p>
                </div>
              </span>
            </div>
          </div>
          <div className="lg:text-right lg:min-w-[180px]">
            <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent mb-3">
              Rp {order.price.toLocaleString("id-ID")}
            </div>{" "}
            <Button
              onClick={handleDetailClick}
              className="w-full lg:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Detail Pesanan
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
