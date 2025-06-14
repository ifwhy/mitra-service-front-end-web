"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  PlusIcon,
  WrenchIcon,
  TruckIcon,
  HomeIcon,
  ImageIcon,
  XIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  LoaderIcon,
  Upload,
} from "lucide-react";
import Image from "next/image";
import {
  uploadImageToSanity,
  base64ToFile,
  createOrGetCustomer,
  createRepairOrder,
} from "@/lib/sanity-utils";
import { toast } from "sonner";

interface NewOrderTabProps {
  user: {
    id: string;
    fullName: string | null;
    primaryEmailAddress: {
      emailAddress: string;
    } | null;
  };
}

export const NewOrderTab = ({ user }: NewOrderTabProps) => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [deliveryOption, setDeliveryOption] = useState<"pickup" | "delivery">(
    "pickup"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    device: "",
    brand: "",
    model: "",
    issue: "",
    address: "",
  });

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.device ||
      !formData.brand ||
      !formData.model ||
      !formData.issue
    ) {
      toast.error("Mohon lengkapi semua field yang wajib diisi");
      return;
    }

    if (deliveryOption === "pickup" && !formData.address) {
      toast.error("Alamat wajib diisi untuk opsi pickup");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create or get customer
      const customer = await createOrGetCustomer({
        clerkId: user.id,
        name: user.fullName || "Unknown",
        email: user.primaryEmailAddress?.emailAddress || "",
        phone: "",
        address: formData.address,
      });

      // Upload images to Sanity
      const imageIds: string[] = [];
      for (const base64Image of uploadedImages) {
        const file = base64ToFile(
          base64Image,
          `repair-image-${Date.now()}.jpg`
        );
        const imageId = await uploadImageToSanity(file);
        imageIds.push(imageId);
      }

      // Create repair order
      const repairOrder = await createRepairOrder({
        customerId: customer._id,
        device: formData.device,
        brand: formData.brand,
        model: formData.model,
        issue: formData.issue,
        images: imageIds,
        deliveryOption: deliveryOption,
        address: deliveryOption === "pickup" ? formData.address : undefined,
      });

      toast.success("Pesanan berhasil dibuat!", {
        description: `ID Pesanan: ${repairOrder.orderId}`,
      });

      // Reset form
      setFormData({
        device: "",
        brand: "",
        model: "",
        issue: "",
        address: "",
      });
      setUploadedImages([]);
      setDeliveryOption("pickup");
    } catch (error) {
      console.error("Error creating repair order:", error);
      toast.error("Gagal membuat pesanan", {
        description: "Silakan coba lagi atau hubungi customer service",
      });
    } finally {
      setIsSubmitting(false);
    }
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
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Informasi Perangkat */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <WrenchIcon className="w-5 h-5 text-amber-600" />
                Informasi Perangkat
              </h3>
              <div className="space-y-4">
                <div>
                  <Label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Jenis Perangkat *
                  </Label>
                  <Input
                    name="device"
                    value={formData.device}
                    onChange={handleInputChange}
                    className="w-full"
                    placeholder="Contoh: Laptop, Smartphone, Tablet"
                    required
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Merek *
                  </Label>
                  <Input
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    className="w-full"
                    placeholder="Contoh: ASUS, Apple, Samsung"
                    required
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Model *
                  </Label>
                  <Input
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    className="w-full"
                    placeholder="Contoh: ROG Strix G15, iPhone 13 Pro"
                    required
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Deskripsi Masalah *
                  </Label>
                  <textarea
                    name="issue"
                    value={formData.issue}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-slate-800 dark:text-white transition-colors resize-none"
                    placeholder="Jelaskan masalah yang dialami perangkat Anda dengan detail..."
                    required
                  />
                </div>
              </div>
            </div>

            {/* Upload Foto */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-amber-600" />
                Upload Foto (Opsional)
              </h3>
              <div className="space-y-3">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Upload foto kondisi perangkat (maksimal 3 foto)
                </p>

                {uploadedImages.length < 3 && (
                  <div>
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex items-center justify-center w-full p-6 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg cursor-pointer hover:border-amber-400 transition-colors"
                    >
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          Klik untuk upload foto
                        </p>
                        <p className="text-xs text-slate-500">
                          PNG, JPG hingga 5MB
                        </p>
                      </div>
                    </label>
                  </div>
                )}

                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-3">
                    {uploadedImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <Image
                          src={image}
                          alt={`Upload ${index + 1}`}
                          width={100}
                          height={100}
                          className="w-full h-24 object-cover rounded-lg border border-slate-200 dark:border-slate-700"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <XIcon className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Opsi Pengambilan/Pengantaran */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <TruckIcon className="w-5 h-5 text-amber-600" />
                  Opsi Pengambilan/Pengantaran
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryOption("pickup")}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      deliveryOption === "pickup"
                        ? "border-amber-500 bg-amber-50 dark:bg-amber-900/20"
                        : "border-slate-300 dark:border-slate-600 hover:border-amber-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <TruckIcon className="w-5 h-5 text-amber-600" />
                      <div className="text-left">
                        <p className="font-medium text-slate-900 dark:text-white">
                          Pickup (Kami Ambil)
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Gratis pickup di Jakarta
                        </p>
                      </div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryOption("delivery")}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      deliveryOption === "delivery"
                        ? "border-amber-500 bg-amber-50 dark:bg-amber-900/20"
                        : "border-slate-300 dark:border-slate-600 hover:border-amber-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <HomeIcon className="w-5 h-5 text-amber-600" />
                      <div className="text-left">
                        <p className="font-medium text-slate-900 dark:text-white">
                          Delivery (Anda Antar)
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Antar ke toko kami
                        </p>
                      </div>
                    </div>
                  </button>
                </div>

                {deliveryOption === "pickup" && (
                  <div>
                    <Label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Alamat Pickup *
                    </Label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-slate-800 dark:text-white transition-colors resize-none"
                      placeholder="Masukkan alamat lengkap untuk pickup..."
                      required={deliveryOption === "pickup"}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Proses Setelah Pesanan Dibuat */}
          <div className="bg-gradient-to-r from-green-50 to-amber-50 dark:from-green-900/20 dark:to-amber-900/20 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <CheckCircleIcon className="w-5 h-5 text-green-600" />
              Proses Setelah Pesanan Dibuat
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  step: "1",
                  title: "Diagnosis Teknisi",
                  description:
                    "Teknisi akan memeriksa perangkat dan memberikan estimasi biaya perbaikan",
                },
                {
                  step: "2",
                  title: "Konfirmasi Biaya",
                  description:
                    "Kami akan menghubungi Anda untuk konfirmasi estimasi biaya sebelum melanjutkan",
                },
                {
                  step: "3",
                  title: "Proses Perbaikan",
                  description:
                    "Setelah persetujuan, teknisi akan memulai proses perbaikan perangkat",
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center font-semibold text-sm">
                    {item.step}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white text-sm">
                      {item.title}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <p className="text-sm text-amber-800 dark:text-amber-200 flex items-center gap-2">
                <AlertCircleIcon className="w-4 h-4" />
                Pickup gratis untuk area Jakarta. Biaya diagnosis akan dipotong
                dari total biaya perbaikan jika Anda melanjutkan servis.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <LoaderIcon className="w-4 h-4 mr-2 animate-spin" />
                  Membuat Pesanan...
                </>
              ) : (
                <>
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Buat Pesanan
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
