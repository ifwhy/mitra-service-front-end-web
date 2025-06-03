import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WrenchIcon } from "lucide-react";
import { ServiceOrderCard } from "./ServiceOrderCard";

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

interface OrdersTabProps {
  serviceOrders: ServiceOrder[];
}

export const OrdersTab = ({ serviceOrders }: OrdersTabProps) => {
  return (
    <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-amber-200/50 dark:border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <WrenchIcon className="w-5 h-5 text-amber-600" />
          Daftar Pesanan Servis
        </CardTitle>
        <CardDescription>
          Kelola dan pantau status pesanan servis elektronik Anda
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {serviceOrders.map((order) => (
            <ServiceOrderCard key={order.id} order={order} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
