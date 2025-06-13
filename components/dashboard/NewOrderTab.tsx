import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  PlusIcon,
  WrenchIcon,
  UserIcon,
  XCircleIcon,
  CheckCircleIcon,
  Upload,
  X,
  TruckIcon,
  HomeIcon,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";

interface NewOrderTabProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
}

export const NewOrderTab = ({ user }: NewOrderTabProps) => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [deliveryOption, setDeliveryOption] = useState<"pickup" | "delivery">(
    "pickup"
  );

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && uploadedImages.length < 3) {
      const newImages = Array.from(files).slice(0, 3 - uploadedImages.length);
      newImages.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setUploadedImages((prev) => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Informasi Perangkat */}
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
                <select className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-slate-800 dark:text-white transition-colors">
                  <option value="">Pilih jenis perangkat</option>
                  <option value="laptop">Laptop</option>
                  <option value="smartphone">Smartphone</option>
                  <option value="tablet">Tablet</option>
                  <option value="tv">Smart TV</option>
                  <option value="pc">Komputer Desktop</option>
                  <option value="other">Lainnya</option>
                </select>
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

              {/* Upload Foto Perangkat */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Foto Perangkat (Maksimal 3 foto)
                </label>
                <div className="space-y-3">
                  {/* Upload Button */}
                  {uploadedImages.length < 3 && (
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-amber-300 dark:border-amber-600 rounded-lg cursor-pointer bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-amber-600" />
                        <p className="text-sm text-amber-600 dark:text-amber-400">
                          <span className="font-semibold">
                            Klik untuk upload
                          </span>{" "}
                          atau drag & drop
                        </p>
                        <p className="text-xs text-amber-500 dark:text-amber-500">
                          PNG, JPG hingga 10MB
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}

                  {/* Preview Images */}
                  {uploadedImages.length > 0 && (
                    <div className="grid grid-cols-3 gap-3">
                      {uploadedImages.map((image, index) => (
                        <div key={index} className="relative group">
                          <Image
                            src={image}
                            alt={`Preview ${index + 1}`}
                            width={100}
                            height={100}
                            className="w-full h-24 object-cover rounded-lg border border-slate-200 dark:border-slate-600"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Informasi Kontak */}
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
        {/* Opsi Pengambilan/Pengantaran */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <TruckIcon className="w-5 h-5 text-amber-600" />
            Opsi Pengambilan Perangkat
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setDeliveryOption("pickup")}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                deliveryOption === "pickup"
                  ? "border-amber-500 bg-amber-50 dark:bg-amber-900/20"
                  : "border-slate-200 dark:border-slate-600 hover:border-amber-300 dark:hover:border-amber-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-full ${
                    deliveryOption === "pickup"
                      ? "bg-amber-500 text-white"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                  }`}
                >
                  <HomeIcon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h4 className="font-medium text-slate-900 dark:text-white">
                    Kami Ambil
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Tim kami akan mengambil perangkat di lokasi Anda
                  </p>
                </div>
              </div>
              {deliveryOption === "pickup" && (
                <Badge className="mt-2 bg-amber-500 text-white">Terpilih</Badge>
              )}
            </button>

            <button
              onClick={() => setDeliveryOption("delivery")}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                deliveryOption === "delivery"
                  ? "border-amber-500 bg-amber-50 dark:bg-amber-900/20"
                  : "border-slate-200 dark:border-slate-600 hover:border-amber-300 dark:hover:border-amber-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-full ${
                    deliveryOption === "delivery"
                      ? "bg-amber-500 text-white"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                  }`}
                >
                  <TruckIcon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h4 className="font-medium text-slate-900 dark:text-white">
                    Saya Antar
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Saya akan mengantarkan perangkat ke tempat servis
                  </p>
                </div>
              </div>
              {deliveryOption === "delivery" && (
                <Badge className="mt-2 bg-amber-500 text-white">Terpilih</Badge>
              )}
            </button>
          </div>

          {deliveryOption === "pickup" && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <TruckIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                    Informasi Layanan Pickup
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                    Tim kami akan menghubungi Anda untuk mengatur jadwal
                    pengambilan perangkat dalam 1x24 jam.
                  </p>
                  <ul className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
                    <li>
                      • Layanan pickup gratis untuk area Solo dan sekitarnya
                    </li>
                    <li>
                      • Biaya tambahan Rp 25.000 untuk area luar Solo dan sekitarnya
                    </li>
                    <li>
                      • Perangkat akan dikemas dengan aman dan diasuransikan
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
        <Separator />
        {/* Informasi Garansi */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <CheckCircleIcon className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                Informasi Garansi Servis
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                Setiap perbaikan yang kami lakukan akan mendapatkan garansi yang
                akan ditentukan oleh tim teknisi berdasarkan:
              </p>
              <ul className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
                <li>• Jenis kerusakan dan tingkat kesulitan perbaikan</li>
                <li>• Komponen yang diganti (original/non-original)</li>
                <li>• Estimasi daya tahan perbaikan</li>
                <li>• Standar garansi untuk kategori perangkat</li>
              </ul>
            </div>
          </div>
        </div>{" "}
        <Separator />
        {/* Proses Selanjutnya */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <CheckCircleIcon className="w-5 h-5 text-green-600" />
            Proses Setelah Pesanan Dibuat
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                1
              </div>
              <div>
                <h4 className="font-medium text-slate-900 dark:text-white">
                  Konfirmasi Pesanan
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Admin akan menghubungi Anda dalam 1x24 jam untuk konfirmasi
                  detail pesanan
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                2
              </div>
              <div>
                <h4 className="font-medium text-slate-900 dark:text-white">
                  Diagnosis & Estimasi Biaya
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Teknisi akan melakukan diagnosis dan memberikan estimasi biaya
                  perbaikan yang akurat
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                3
              </div>
              <div>
                <h4 className="font-medium text-slate-900 dark:text-white">
                  Persetujuan & Perbaikan
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Setelah Anda menyetujui estimasi, teknisi akan memulai proses
                  perbaikan
                </p>
              </div>
            </div>

            {deliveryOption === "pickup" && (
              <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <p className="text-sm text-green-700 dark:text-green-300 font-medium">
                  📦 Layanan pickup gratis untuk area Solo dan sekitarnya
                </p>
              </div>
            )}
          </div>
        </div>
        {/* Action Buttons */}
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
