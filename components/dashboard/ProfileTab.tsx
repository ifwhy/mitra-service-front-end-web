import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { UserButton } from "@clerk/nextjs";
import {
  UserIcon,
  TrendingUpIcon,
  PhoneIcon,
  CheckCircleIcon,
} from "lucide-react";

interface ProfileTabProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  orders: any[];
}

export const ProfileTab = ({ user, orders }: ProfileTabProps) => {
  return (
    <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-amber-200/50 dark:border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserIcon className="w-5 h-5 text-amber-600" />
          Profil Pengguna
        </CardTitle>
        <CardDescription>
          Kelola informasi akun dan preferensi Anda
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/50 dark:to-amber-800/50 rounded-full flex items-center justify-center border-4 border-amber-300/30 dark:border-amber-700/30">
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-16 h-16",
                  },
                }}
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-green-500 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center">
              <CheckCircleIcon className="w-3 h-3 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-lg lg:text-xl font-semibold text-slate-900 dark:text-white">
              {user?.fullName || "Nama Pengguna"}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-xs lg:text-base">
              {user?.primaryEmailAddress?.emailAddress || "email@example.com"}
            </p>
            <Badge className="mt-2 bg-gradient-to-r from-green-100 to-green-200 text-green-800 dark:from-green-900/50 dark:to-green-800/50 dark:text-green-200 border-green-300 dark:border-green-700">
              <CheckCircleIcon className="w-3 h-3 mr-1" />
              Akun Terverifikasi
            </Badge>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-800/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUpIcon className="w-5 h-5 text-amber-600" />
                Statistik Akun
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <span className="text-slate-600 dark:text-slate-300 font-medium">
                  Total Pesanan:
                </span>
                <span className="font-bold text-lg text-slate-900 dark:text-white">
                  {orders.length}
                </span>
              </div>
              <div className="flex justify-between items-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <span className="text-slate-600 dark:text-slate-300 font-medium">
                  Selesai:
                </span>
                <span className="font-bold text-lg text-green-600">
                  {
                    (orders || []).filter(
                      (order) => order.status === "completed"
                    ).length
                  }
                </span>
              </div>
              <div className="flex justify-between items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <span className="text-slate-600 dark:text-slate-300 font-medium">
                  Sedang Proses:
                </span>
                <span className="font-bold text-lg text-blue-600">
                  {
                    (orders || []).filter(
                      (order) => order.status === "in-progress"
                    ).length
                  }
                </span>
              </div>
              <div className="flex justify-between items-center p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <span className="text-slate-600 dark:text-slate-300 font-medium">
                  Menunggu:
                </span>
                <span className="font-bold text-lg text-yellow-600">
                  {
                    (orders || []).filter(
                      (order) =>
                        order.status === "received" ||
                        order.status == "diagnosed"
                    ).length
                  }
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-800/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <PhoneIcon className="w-5 h-5 text-amber-600" />
                Kontak Darurat
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-lg">
                  <PhoneIcon className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium">Customer Service</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    +62 21-1234-5678
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-lg">
                  <PhoneIcon className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium">WhatsApp</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    +62 812-3456-7890
                  </p>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                Hubungi Customer Service
              </Button>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};
