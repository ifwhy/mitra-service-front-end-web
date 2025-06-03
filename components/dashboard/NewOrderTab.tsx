import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  PlusIcon,
  WrenchIcon,
  UserIcon,
  XCircleIcon,
  CheckCircleIcon,
} from "lucide-react";

interface NewOrderTabProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
}

export const NewOrderTab = ({ user }: NewOrderTabProps) => {
  return (
    <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-amber-200/50 dark:border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PlusIcon className="w-5 h-5 text-amber-600" />
          Buat Pesanan Servis Baru
        </CardTitle>
        <CardDescription>
          Isi formulir berikut untuk membuat pesanan servis elektronik baru
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <WrenchIcon className="w-5 h-5 text-amber-600" />
              Informasi Perangkat
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Jenis Perangkat
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-slate-800 dark:text-white transition-colors"
                  placeholder="Contoh: Laptop, Smartphone, TV, dll."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Merek & Model
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-slate-800 dark:text-white transition-colors"
                  placeholder="Contoh: ASUS ROG Strix G15"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Deskripsi Masalah
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-slate-800 dark:text-white resize-none transition-colors"
                  placeholder="Jelaskan masalah yang dialami perangkat Anda secara detail..."
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <UserIcon className="w-5 h-5 text-amber-600" />
              Informasi Kontak
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                  value={user?.fullName || ""}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                  value={user?.primaryEmailAddress?.emailAddress || ""}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-slate-800 dark:text-white transition-colors"
                  placeholder="Contoh: +62 812-3456-7890"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Alamat Lengkap
                </label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-slate-800 dark:text-white resize-none transition-colors"
                  placeholder="Alamat lengkap untuk pickup/delivery perangkat..."
                />
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <Button
            variant="outline"
            className="flex items-center gap-2 hover:bg-red-50 hover:border-red-300 hover:text-red-600 dark:hover:bg-red-900/20 transition-colors"
          >
            <XCircleIcon className="w-4 h-4" />
            Batal
          </Button>
          <Button className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
            <CheckCircleIcon className="w-4 h-4" />
            Buat Pesanan
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
