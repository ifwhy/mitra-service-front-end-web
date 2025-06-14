'use client'

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  PhoneIcon,
  MapPinIcon,
  CreditCardIcon,
  WrenchIcon,
  MessageCircleIcon,
  StarIcon,
  DownloadIcon,
  PrinterIcon,
  ShareIcon,
  ImageIcon,
  ZoomInIcon,
  ExternalLinkIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  XCircleIcon,
  TruckIcon,
  WrenchIcon as ToolIcon,
  DollarSignIcon,
} from "lucide-react";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { DashboardAuthModal } from "@/components/DashboardAuthModal";
import { LoadingState } from "@/components/dashboard/LoadingState";
import Image from "next/image";
import { client, urlFor } from "@/sanity/client";
import { getCustomerByClerkId, getRepairOrderById } from "@/lib/queries";

// Complete detailed order data for all orders
// const getOrderDetails = (id: string) => {
//   const orderData = {
//     "SRV-001": {
//       id: "SRV-001",
//       device: "Laptop ASUS ROG Strix G15",
//       brand: "ASUS",
//       model: "ROG Strix G15 (2021)",
//       issue: "Layar berkedip dan tidak stabil, kadang blank screen",
//       status: "in-progress",
//       priority: "normal",
//       dateCreated: "2024-12-10T08:30:00Z",
//       dateUpdated: "2024-12-11T14:20:00Z",
//       estimatedCompletion: "2024-12-12T17:00:00Z",
//       actualCompletion: null,
//       technician: {
//         name: "Ahmad Fauzi",
//         id: "TECH-001",
//         phone: "+62 812-1234-5678",
//         specialization: "Laptop & PC Hardware",
//       },
//       customer: {
//         name: "John Doe",
//         email: "john.doe@email.com",
//         phone: "+62 812-9876-5432",
//         address: "Jl. Sudirman No. 123, Jakarta Selatan, DKI Jakarta 12190",
//       },
//       pricing: {
//         diagnosticFee: 50000,
//         repairFee: 250000,
//         partsCost: 150000,
//         total: 450000,
//         paid: 100000,
//         remaining: 350000,
//       },
//       warranty: {
//         duration: "3 bulan",
//         expiryDate: "2025-03-12",
//         coverage: "Komponen yang diganti dan perbaikan yang dilakukan",
//       },
//       images: [
//         {
//           id: "IMG-001",
//           url: "/images/laptop-damage-1.jpg",
//           caption: "Kondisi awal - layar berkedip",
//           type: "before",
//           uploadedAt: "2024-12-10T08:35:00Z",
//         },
//         {
//           id: "IMG-002",
//           url: "/images/laptop-damage-2.jpg",
//           caption: "Detail kerusakan di panel LCD",
//           type: "diagnostic",
//           uploadedAt: "2024-12-10T10:15:00Z",
//         },
//         {
//           id: "IMG-003",
//           url: "/images/laptop-repair-progress.jpg",
//           caption: "Proses pembongkaran dan diagnosis",
//           type: "progress",
//           uploadedAt: "2024-12-11T09:30:00Z",
//         },
//       ],
//       timeline: [
//         {
//           date: "2024-12-10T08:30:00Z",
//           status: "received",
//           title: "Pesanan Diterima",
//           description: "Perangkat diterima dan dicatat dalam sistem",
//           by: "Staff Penerima",
//         },
//         {
//           date: "2024-12-10T10:00:00Z",
//           status: "diagnosed",
//           title: "Diagnosis Awal",
//           description:
//             "Teknisi melakukan pemeriksaan awal dan identifikasi masalah",
//           by: "Ahmad Fauzi",
//         },
//         {
//           date: "2024-12-11T09:00:00Z",
//           status: "in-progress",
//           title: "Proses Perbaikan Dimulai",
//           description: "Pembongkaran perangkat dan penggantian komponen LCD",
//           by: "Ahmad Fauzi",
//         },
//       ],
//       notes: [
//         {
//           date: "2024-12-10T10:30:00Z",
//           author: "Ahmad Fauzi",
//           type: "diagnostic",
//           content:
//             "Panel LCD mengalami kerusakan pada backlight inverter. Perlu penggantian komponen.",
//         },
//         {
//           date: "2024-12-11T14:20:00Z",
//           author: "Ahmad Fauzi",
//           type: "progress",
//           content:
//             "Komponen pengganti sudah dipesan. Estimasi tiba besok pagi. Perbaikan akan dilanjutkan setelah komponen tiba.",
//         },
//       ],
//       services: [
//         {
//           name: "Diagnosis Kerusakan",
//           description: "Pemeriksaan menyeluruh untuk identifikasi masalah",
//           status: "completed",
//           fee: 50000,
//         },
//         {
//           name: "Penggantian Panel LCD",
//           description: "Penggantian panel LCD yang rusak dengan yang baru",
//           status: "in-progress",
//           fee: 250000,
//         },
//         {
//           name: "Testing & Kalibrasi",
//           description: "Pengujian fungsi dan kalibrasi setelah perbaikan",
//           status: "pending",
//           fee: 0,
//         },
//       ],
//     },
//     "SRV-002": {
//       id: "SRV-002",
//       device: "iPhone 13 Pro Max",
//       brand: "Apple",
//       model: "iPhone 13 Pro Max (128GB)",
//       issue: "Kamera belakang tidak berfungsi, hasil foto blur dan tidak fokus",
//       status: "completed",
//       priority: "high",
//       dateCreated: "2024-12-08T09:15:00Z",
//       dateUpdated: "2024-12-10T16:45:00Z",
//       estimatedCompletion: "2024-12-10T17:00:00Z",
//       actualCompletion: "2024-12-10T15:30:00Z",
//       technician: {
//         name: "Sari Dewi",
//         id: "TECH-002",
//         phone: "+62 813-2345-6789",
//         specialization: "Mobile Device & Camera Systems",
//       },
//       customer: {
//         name: "Sarah Wilson",
//         email: "sarah.wilson@email.com",
//         phone: "+62 821-1234-5678",
//         address: "Jl. Kemang Raya No. 88, Jakarta Selatan, DKI Jakarta 12560",
//       },
//       pricing: {
//         diagnosticFee: 75000,
//         repairFee: 350000,
//         partsCost: 450000,
//         total: 875000,
//         paid: 875000,
//         remaining: 0,
//       },
//       warranty: {
//         duration: "6 bulan",
//         expiryDate: "2025-06-10",
//         coverage: "Modul kamera dan perbaikan yang dilakukan",
//       },
//       images: [
//         {
//           id: "IMG-004",
//           url: "/images/iphone-camera-issue-1.jpg",
//           caption: "Kondisi awal - hasil foto blur",
//           type: "before",
//           uploadedAt: "2024-12-08T09:20:00Z",
//         },
//         {
//           id: "IMG-005",
//           url: "/images/iphone-camera-issue-2.jpg",
//           caption: "Pemeriksaan modul kamera",
//           type: "diagnostic",
//           uploadedAt: "2024-12-08T11:30:00Z",
//         },
//         {
//           id: "IMG-006",
//           url: "/images/iphone-repair-completed.jpg",
//           caption: "Hasil setelah penggantian modul kamera",
//           type: "after",
//           uploadedAt: "2024-12-10T15:30:00Z",
//         },
//       ],
//       timeline: [
//         {
//           date: "2024-12-08T09:15:00Z",
//           status: "received",
//           title: "Pesanan Diterima",
//           description: "Perangkat diterima dan dicatat dalam sistem",
//           by: "Staff Penerima",
//         },
//         {
//           date: "2024-12-08T11:00:00Z",
//           status: "diagnosed",
//           title: "Diagnosis Selesai",
//           description: "Identifikasi kerusakan pada modul kamera utama",
//           by: "Sari Dewi",
//         },
//         {
//           date: "2024-12-09T10:00:00Z",
//           status: "in-progress",
//           title: "Proses Perbaikan",
//           description: "Penggantian modul kamera dengan komponen original",
//           by: "Sari Dewi",
//         },
//         {
//           date: "2024-12-10T15:30:00Z",
//           status: "completed",
//           title: "Perbaikan Selesai",
//           description: "Testing berhasil, kamera berfungsi normal",
//           by: "Sari Dewi",
//         },
//       ],
//       notes: [
//         {
//           date: "2024-12-08T11:30:00Z",
//           author: "Sari Dewi",
//           type: "diagnostic",
//           content:
//             "Modul kamera utama mengalami kerusakan pada sensor. Perlu diganti dengan komponen original Apple.",
//         },
//         {
//           date: "2024-12-09T16:20:00Z",
//           author: "Sari Dewi",
//           type: "progress",
//           content:
//             "Komponen original sudah terpasang. Melakukan kalibrasi dan testing kualitas foto.",
//         },
//         {
//           date: "2024-12-10T15:30:00Z",
//           author: "Sari Dewi",
//           type: "completed",
//           content:
//             "Perbaikan selesai. Kamera berfungsi normal dengan kualitas foto kembali optimal.",
//         },
//       ],
//       services: [
//         {
//           name: "Diagnosis Kamera",
//           description: "Pemeriksaan sistem kamera dan sensor",
//           status: "completed",
//           fee: 75000,
//         },
//         {
//           name: "Penggantian Modul Kamera",
//           description: "Penggantian modul kamera dengan komponen original",
//           status: "completed",
//           fee: 350000,
//         },
//         {
//           name: "Kalibrasi & Testing",
//           description: "Kalibrasi sistem kamera dan testing kualitas",
//           status: "completed",
//           fee: 0,
//         },
//       ],
//     },
//     "SRV-003": {
//       id: "SRV-003",
//       device: "Samsung Galaxy Tab S8",
//       brand: "Samsung",
//       model: "Galaxy Tab S8 (Wi-Fi, 128GB)",
//       issue:
//         "Baterai cepat habis dan tablet sering hang, performa menurun drastis",
//       status: "pending",
//       priority: "normal",
//       dateCreated: "2024-12-12T14:20:00Z",
//       dateUpdated: "2024-12-12T14:20:00Z",
//       estimatedCompletion: "2024-12-15T17:00:00Z",
//       actualCompletion: null,
//       technician: {
//         name: "Budi Santoso",
//         id: "TECH-003",
//         phone: "+62 814-3456-7890",
//         specialization: "Tablet & Mobile Hardware",
//       },
//       customer: {
//         name: "Michael Chen",
//         email: "michael.chen@email.com",
//         phone: "+62 822-2345-6789",
//         address: "Jl. Thamrin No. 45, Jakarta Pusat, DKI Jakarta 10350",
//       },
//       pricing: {
//         diagnosticFee: 60000,
//         repairFee: 200000,
//         partsCost: 180000,
//         total: 440000,
//         paid: 0,
//         remaining: 440000,
//       },
//       warranty: {
//         duration: "3 bulan",
//         expiryDate: "2025-03-15",
//         coverage: "Baterai dan komponen yang diganti",
//       },
//       images: [
//         {
//           id: "IMG-007",
//           url: "/images/tablet-battery-issue.jpg",
//           caption: "Kondisi awal - indikator baterai tidak normal",
//           type: "before",
//           uploadedAt: "2024-12-12T14:25:00Z",
//         },
//       ],
//       timeline: [
//         {
//           date: "2024-12-12T14:20:00Z",
//           status: "received",
//           title: "Pesanan Diterima",
//           description: "Perangkat diterima dan menunggu proses diagnosis",
//           by: "Staff Penerima",
//         },
//       ],
//       notes: [
//         {
//           date: "2024-12-12T14:30:00Z",
//           author: "Staff Penerima",
//           type: "progress",
//           content:
//             "Perangkat telah diterima dan akan segera diperiksa oleh teknisi. Estimasi diagnosis selesai dalam 1-2 hari kerja.",
//         },
//       ],
//       services: [
//         {
//           name: "Diagnosis Sistem",
//           description: "Pemeriksaan menyeluruh sistem dan baterai",
//           status: "pending",
//           fee: 60000,
//         },
//         {
//           name: "Penggantian Baterai",
//           description: "Penggantian baterai jika diperlukan",
//           status: "pending",
//           fee: 200000,
//         },
//         {
//           name: "Optimasi Sistem",
//           description: "Pembersihan sistem dan optimasi performa",
//           status: "pending",
//           fee: 0,
//         },
//       ],
//     },
//   };

//   return orderData[id as keyof typeof orderData] || null;
// };

const OrderDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [orderDetails, setRepairOrder] = useState<any>(null);
  const [customer, setCustomer] = useState<any>(null);

  const orderId = params.id as string;
  
  const { user } = useUser();

  useEffect(() => {
    client.fetch(getCustomerByClerkId(user.id))
    .then((data) => {
      setCustomer(data);
    })
    client.fetch(getRepairOrderById(orderId))
    .then((data) => {
      setRepairOrder(data);
      })
      .catch((error) => {
        console.error("Error fetching repair order:", error);
      });
  }, [orderId])
  
  if (!orderDetails) {
    return (
      <>
        <DashboardAuthModal />
        {isSignedIn && (
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/30 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
            <Card className="max-w-md mx-auto text-center">
              <CardContent className="p-8">
                <XCircleIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">
                  Pesanan Tidak Ditemukan
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Pesanan dengan ID {orderId} tidak ditemukan.
                </p>
                <Button
                  onClick={() => router.push("/dashboard")}
                  className="bg-amber-600 hover:bg-amber-700"
                >
                  <ArrowLeftIcon className="w-4 h-4 mr-2" />
                  Kembali
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
        {!isSignedIn && <LoadingState />}
      </>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircleIcon className="w-5 h-5 text-green-600" />;
      case "in-progress":
        return <AlertCircleIcon className="w-5 h-5 text-blue-600" />;
      case "pending":
        return <ClockIcon className="w-5 h-5 text-yellow-600" />;
      default:
        return <XCircleIcon className="w-5 h-5 text-red-600" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

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

  return (
    <>
      <DashboardAuthModal />
      {isSignedIn && (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/30 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
          {/* Enhanced Header with better mobile responsiveness */}
          <div className="bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 border-b border-amber-200/50 dark:border-slate-700 sticky top-0 z-40 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.back()}
                    className="hover:bg-amber-50 hover:border-amber-300 dark:hover:bg-amber-900/20 transition-all duration-200 hover:scale-105 shrink-0"
                  >
                    <ArrowLeftIcon className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Kembali</span>
                  </Button>
                  <div className="min-w-0 flex-1">
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white truncate">
                      Detail Pesanan {orderDetails.id}
                    </h1>
                    <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                      {orderDetails.device}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                  <Button
                    variant="outline"
                    size="sm"
                    className="transition-all duration-200 hover:scale-105 hover:shadow-md"
                  >
                    <DownloadIcon className="w-4 h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Unduh PDF</span>
                    <span className="sm:hidden">PDF</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="transition-all duration-200 hover:scale-105 hover:shadow-md"
                  >
                    <PrinterIcon className="w-4 h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Cetak</span>
                    <span className="sm:hidden">Print</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="transition-all duration-200 hover:scale-105 hover:shadow-md"
                  >
                    {" "}
                    <ShareIcon className="w-4 h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Bagikan</span>
                    <span className="sm:hidden">Share</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Main Content with better responsive design */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {/* Status Overview Card with enhanced visual design */}
            <Card className="mb-6 sm:mb-8 bg-gradient-to-r from-white/90 to-amber-50/50 dark:from-slate-800/90 dark:to-slate-700/50 backdrop-blur-sm border-amber-200/50 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-4 sm:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
                  <div className="lg:col-span-3">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                          <StatusBadge status={orderDetails.status} />
                          <Badge
                            variant="outline"
                            className="font-mono text-xs sm:text-sm"
                          >
                            {orderDetails.id}
                          </Badge>
                          <Badge
                            variant={
                              orderDetails.priority === "high"
                                ? "destructive"
                                : orderDetails.priority === "normal"
                                ? "default"
                                : "secondary"
                            }
                            className="text-xs"
                          >
                            {orderDetails.priority === "high"
                              ? "Prioritas Tinggi"
                              : orderDetails.priority === "normal"
                              ? "Normal"
                              : "Rendah"}
                          </Badge>
                        </div>
                        <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white mb-2 break-words">
                          {orderDetails.device}
                        </h2>
                        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                          {orderDetails.issue}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-sm">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50 dark:bg-slate-700/50">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30">
                          <CalendarIcon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-slate-900 dark:text-white">
                            Dibuat
                          </p>
                          <p className="text-slate-600 dark:text-slate-400 truncate">
                            {new Date(
                              orderDetails.dateCreated
                            ).toLocaleDateString("id-ID")}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50 dark:bg-slate-700/50">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30">
                          <ClockIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-slate-900 dark:text-white">
                            Estimasi Selesai
                          </p>
                          <p className="text-slate-600 dark:text-slate-400 truncate">
                            {new Date(
                              orderDetails.estimatedCompletion
                            ).toLocaleDateString("id-ID")}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50 dark:bg-slate-700/50">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30">
                          <UserIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-slate-900 dark:text-white">
                            Teknisi
                          </p>
                          <p className="text-slate-600 dark:text-slate-400">
                            {orderDetails.technician.name}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <StarIcon className="w-4 h-4 text-amber-600 fill-amber-600" />
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">
                            Prioritas
                          </p>
                          <p className="text-slate-600 dark:text-slate-400 capitalize">
                            {orderDetails.priority}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                  {/* Enhanced pricing summary with better visual design */}
                  <div className="lg:border-l lg:border-slate-200 dark:lg:border-slate-700 lg:pl-6 mt-6 lg:mt-0">
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg p-4 border border-amber-200/50 dark:border-amber-800/50">
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <DollarSignIcon className="w-5 h-5 text-amber-600" />
                        Ringkasan Biaya
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600 dark:text-slate-400">
                            Total Biaya
                          </span>
                          <span className="font-bold text-lg text-slate-900 dark:text-white">
                            {formatCurrency(orderDetails.pricing.total)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600 dark:text-slate-400">
                            Sudah Dibayar
                          </span>
                          <span className="font-semibold text-green-600 dark:text-green-400">
                            {formatCurrency(orderDetails.pricing.paid)}
                          </span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600 dark:text-slate-400">
                            Sisa Pembayaran
                          </span>
                          <span
                            className={`font-bold text-lg ${
                              orderDetails.pricing.remaining > 0
                                ? "text-red-600 dark:text-red-400"
                                : "text-green-600 dark:text-green-400"
                            }`}
                          >
                            {formatCurrency(orderDetails.pricing.remaining)}
                          </span>
                        </div>
                        {orderDetails.pricing.remaining > 0 && (
                          <Button className="w-full mt-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all duration-200">
                            <CreditCardIcon className="w-4 h-4 mr-2" />
                            Bayar Sekarang
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>{" "}
            {/* Enhanced Detailed Tabs with improved responsive design */}
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-4 sm:space-y-6"
            >
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-amber-200/50 dark:border-slate-700 h-auto p-1">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-amber-600 data-[state=active]:text-white transition-all duration-200 text-xs sm:text-sm py-2 sm:py-3"
                >
                  <WrenchIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Overview</span>
                  <span className="sm:hidden">Info</span>
                </TabsTrigger>
                <TabsTrigger
                  value="images"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-amber-600 data-[state=active]:text-white transition-all duration-200 text-xs sm:text-sm py-2 sm:py-3"
                >
                  <ImageIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Foto</span>
                  <span className="sm:hidden">Foto</span>
                </TabsTrigger>
                <TabsTrigger
                  value="timeline"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-amber-600 data-[state=active]:text-white transition-all duration-200 text-xs sm:text-sm py-2 sm:py-3"
                >
                  <ClockIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Timeline</span>
                  <span className="sm:hidden">Time</span>
                </TabsTrigger>
                <TabsTrigger
                  value="payment"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-amber-600 data-[state=active]:text-white transition-all duration-200 text-xs sm:text-sm py-2 sm:py-3"
                >
                  <CreditCardIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Pembayaran</span>
                  <span className="sm:hidden">Pay</span>
                </TabsTrigger>
                <TabsTrigger
                  value="notes"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-amber-600 data-[state=active]:text-white transition-all duration-200 text-xs sm:text-sm py-2 sm:py-3"
                >
                  <MessageCircleIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Catatan</span>
                  <span className="sm:hidden">Note</span>
                </TabsTrigger>
              </TabsList>{" "}
              {/* Enhanced Overview Tab with better cards */}
              <TabsContent value="overview" className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {/* Enhanced Device Information */}
                  <Card className="bg-gradient-to-br from-white/90 to-slate-50/50 dark:from-slate-800/90 dark:to-slate-700/50 backdrop-blur-sm border-amber-200/50 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                          <WrenchIcon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                        </div>
                        Informasi Perangkat
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-3 rounded-lg bg-white/60 dark:bg-slate-800/60">
                          <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                            Merek
                          </label>
                          <p className="font-semibold text-slate-900 dark:text-white">
                            {orderDetails.brand}
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-white/60 dark:bg-slate-800/60">
                          <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                            Model
                          </label>
                          <p className="font-semibold text-slate-900 dark:text-white">
                            {orderDetails.model}
                          </p>
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-white/60 dark:bg-slate-800/60">
                        <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          Keluhan
                        </label>
                        <p className="mt-1 text-slate-700 dark:text-slate-300">
                          {orderDetails.issue}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3 block">
                          Layanan yang Dilakukan
                        </label>
                        <div className="space-y-3">
                          {orderDetails.services.map((service, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-white/60 dark:bg-slate-800/60 rounded-lg border border-slate-200/50 dark:border-slate-600/50 hover:shadow-md transition-all duration-200"
                            >
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 shrink-0">
                                  {getStatusIcon(service.status)}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="font-medium text-slate-900 dark:text-white truncate">
                                    {service.name}
                                  </p>
                                  <p className="text-sm text-slate-600 dark:text-slate-400 break-words">
                                    {service.description}
                                  </p>
                                </div>
                              </div>
                              <span className="font-semibold text-slate-900 dark:text-white ml-3">
                                {formatCurrency(service.fee)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>{" "}
                  {/* Enhanced Customer & Technician Info */}
                  <div className="space-y-4 sm:space-y-6">
                    {/* Enhanced Customer Info */}
                    <Card className="bg-gradient-to-br from-white/90 to-blue-50/30 dark:from-slate-800/90 dark:to-slate-700/50 backdrop-blur-sm border-blue-200/50 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                            <UserIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          Informasi Pelanggan
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-white/60 dark:bg-slate-800/60">
                          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <UserIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-slate-900 dark:text-white">
                              {customer.name}
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                              {customer.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-white/60 dark:bg-slate-800/60">
                          <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <PhoneIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                          </div>
                          <p className="text-slate-700 dark:text-slate-300">
                            {customer.phone}
                          </p>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white/60 dark:bg-slate-800/60">
                          <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mt-0.5">
                            <MapPinIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                          </div>
                          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            {customer.address}
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Enhanced Technician Info */}
                    <Card className="bg-gradient-to-br from-white/90 to-orange-50/30 dark:from-slate-800/90 dark:to-slate-700/50 backdrop-blur-sm border-orange-200/50 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                            <ToolIcon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                          </div>
                          Teknisi yang Menangani
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border border-orange-200/50 dark:border-orange-800/50">
                          <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/50 dark:to-amber-800/50 rounded-full flex items-center justify-center">
                            <UserIcon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-slate-900 dark:text-white">
                              {orderDetails.technician.name}
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {orderDetails.technician.specialization}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                              ID: {orderDetails.technician.id}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-white/60 dark:bg-slate-800/60">
                          <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <PhoneIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                          </div>
                          <p className="text-slate-700 dark:text-slate-300">
                            {orderDetails.technician.phone}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20 dark:hover:from-orange-900/40 dark:hover:to-amber-900/40 border-orange-200 dark:border-orange-800 hover:shadow-md transition-all duration-200"
                        >
                          <MessageCircleIcon className="w-4 h-4 mr-2" />
                          Hubungi Teknisi
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>{" "}
              {/* Enhanced Images Tab with better gallery design */}
              <TabsContent value="images" className="space-y-4 sm:space-y-6">
                <Card className="bg-gradient-to-br from-white/90 to-slate-50/50 dark:from-slate-800/90 dark:to-slate-700/50 backdrop-blur-sm border-amber-200/50 dark:border-slate-700 shadow-lg">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                        <ImageIcon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      </div>
                      Dokumentasi Foto ({orderDetails.images.length})
                    </CardTitle>
                    <CardDescription>
                      Foto-foto dokumentasi kondisi perangkat dan proses
                      perbaikan
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      {orderDetails.images.map((image) => (
                        <div
                          key={image.id}
                          className="group relative bg-white dark:bg-slate-800 rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-slate-200/50 dark:border-slate-700/50"
                          onClick={() => setSelectedImage(urlFor(image.url).url())}
                        >
                          <div className="aspect-square relative overflow-hidden">
                            <Image
                              src={urlFor(image.url).url()}
                              alt={image.caption}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                              onError={() => {
                                // Handle image load error with placeholder
                                const target =
                                  event?.target as HTMLImageElement;
                                if (target) {
                                  target.src = "/images/placeholder-image.png";
                                }
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="bg-white/90 dark:bg-slate-800/90 rounded-full p-3 backdrop-blur-sm">
                                <ZoomInIcon className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                              </div>
                            </div>
                          </div>

                          <div className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <Badge
                                variant="secondary"
                                className={`text-xs font-medium
                                  ${
                                    image.type === "before"
                                      ? "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200 border-red-200"
                                      : ""
                                  }
                                  ${
                                    image.type === "diagnostic"
                                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 border-blue-200"
                                      : ""
                                  }
                                  ${
                                    image.type === "progress"
                                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200 border-yellow-200"
                                      : ""
                                  }
                                  ${
                                    image.type === "after"
                                      ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200 border-green-200"
                                      : ""
                                  }
                                `}
                              >
                                {image.type === "before" && "Sebelum"}
                                {image.type === "diagnostic" && "Diagnosis"}
                                {image.type === "progress" && "Progress"}
                                {image.type === "after" && "Setelah"}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-8 w-8 p-0"
                              >
                                <ExternalLinkIcon className="w-4 h-4" />
                              </Button>
                            </div>
                            <p className="text-sm font-medium mb-2 text-slate-900 dark:text-white line-clamp-2">
                              {image.caption}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {formatDate(image.uploadedAt)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {orderDetails.images.length === 0 && (
                      <div className="text-center py-16">
                        <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                          <ImageIcon className="w-12 h-12 text-slate-300 dark:text-slate-600" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                          Belum Ada Foto
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400">
                          Foto dokumentasi akan muncul di sini setelah teknisi
                          mengunggahnya
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              {/* Timeline Tab */}
              <TabsContent value="timeline" className="space-y-6">
                <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-amber-200/50 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ClockIcon className="w-5 h-5 text-amber-600" />
                      Timeline Pesanan
                    </CardTitle>
                    <CardDescription>
                      Riwayat lengkap proses pesanan dari awal hingga selesai
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {orderDetails.timeline.map((event, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div
                              className={`
                              w-10 h-10 rounded-full flex items-center justify-center border-2
                              ${
                                event.status === "received"
                                  ? "bg-blue-100 border-blue-300 dark:bg-blue-900/50 dark:border-blue-700"
                                  : ""
                              }
                              ${
                                event.status === "diagnosed"
                                  ? "bg-yellow-100 border-yellow-300 dark:bg-yellow-900/50 dark:border-yellow-700"
                                  : ""
                              }
                              ${
                                event.status === "in-progress"
                                  ? "bg-orange-100 border-orange-300 dark:bg-orange-900/50 dark:border-orange-700"
                                  : ""
                              }
                              ${
                                event.status === "completed"
                                  ? "bg-green-100 border-green-300 dark:bg-green-900/50 dark:border-green-700"
                                  : ""
                              }
                            `}
                            >
                              {event.status === "received" && (
                                <TruckIcon className="w-5 h-5 text-blue-600" />
                              )}
                              {event.status === "diagnosed" && (
                                <WrenchIcon className="w-5 h-5 text-yellow-600" />
                              )}
                              {event.status === "in-progress" && (
                                <ToolIcon className="w-5 h-5 text-orange-600" />
                              )}
                              {event.status === "completed" && (
                                <CheckCircleIcon className="w-5 h-5 text-green-600" />
                              )}
                            </div>
                            {index < orderDetails.timeline.length - 1 && (
                              <div className="w-0.5 h-16 bg-slate-300 dark:bg-slate-600 mt-2"></div>
                            )}
                          </div>

                          <div className="flex-1 pb-8">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold text-slate-900 dark:text-white">
                                {event.title}
                              </h3>
                              <span className="text-xs text-slate-500">
                                {formatDate(event.date)}
                              </span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 mb-2">
                              {event.description}
                            </p>
                            <p className="text-sm text-slate-500">
                              Oleh: {event.by}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              {/* Payment Tab */}
              <TabsContent value="payment" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Payment Details */}
                  <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-amber-200/50 dark:border-slate-700">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CreditCardIcon className="w-5 h-5 text-amber-600" />
                        Rincian Pembayaran
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-slate-600 dark:text-slate-400">
                            Biaya Diagnosis
                          </span>
                          <span className="font-medium">
                            {formatCurrency(orderDetails.pricing.diagnosticFee)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600 dark:text-slate-400">
                            Biaya Perbaikan
                          </span>
                          <span className="font-medium">
                            {formatCurrency(orderDetails.pricing.repairFee)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600 dark:text-slate-400">
                            Biaya Komponen
                          </span>
                          <span className="font-medium">
                            {formatCurrency(orderDetails.pricing.partsCost)}
                          </span>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-lg font-semibold">
                          <span>Total Biaya</span>
                          <span>
                            {formatCurrency(orderDetails.pricing.total)}
                          </span>
                        </div>
                        <div className="flex justify-between text-green-600">
                          <span>Telah Dibayar</span>
                          <span className="font-medium">
                            {formatCurrency(orderDetails.pricing.paid)}
                          </span>
                        </div>
                        <div className="flex justify-between text-red-600 text-lg font-semibold">
                          <span>Sisa Pembayaran</span>
                          <span>
                            {formatCurrency(orderDetails.pricing.remaining)}
                          </span>
                        </div>
                      </div>

                      {orderDetails.pricing.remaining > 0 && (
                        <div className="pt-4">
                          <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700">
                            <DollarSignIcon className="w-4 h-4 mr-2" />
                            Bayar Sekarang
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Warranty Info */}
                  <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-amber-200/50 dark:border-slate-700">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircleIcon className="w-5 h-5 text-amber-600" />
                        Informasi Garansi
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                        <div className="flex items-center gap-3 mb-3">
                          <CheckCircleIcon className="w-6 h-6 text-green-600" />
                          <div>
                            <h3 className="font-semibold text-green-800 dark:text-green-200">
                              Garansi Aktif
                            </h3>
                            <p className="text-sm text-green-600 dark:text-green-300">
                              Berlaku hingga{" "}
                              {new Date(
                                orderDetails.warranty.expiryDate
                              ).toLocaleDateString("id-ID")}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <span className="text-sm font-medium text-green-800 dark:text-green-200">
                              Durasi:
                            </span>
                            <span className="text-sm text-green-600 dark:text-green-300 ml-2">
                              {orderDetails.warranty.duration}
                            </span>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-green-800 dark:text-green-200">
                              Cakupan:
                            </span>
                            <p className="text-sm text-green-600 dark:text-green-300 mt-1">
                              {orderDetails.warranty.coverage}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="text-xs text-slate-500 space-y-1">
                        <p>
                          • Garansi tidak berlaku untuk kerusakan fisik akibat
                          benturan
                        </p>
                        <p>
                          • Garansi tidak berlaku untuk kerusakan akibat
                          air/cairan
                        </p>
                        <p>• Simpan bukti pembayaran untuk klaim garansi</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              {/* Notes Tab */}
              <TabsContent value="notes" className="space-y-6">
                <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-amber-200/50 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircleIcon className="w-5 h-5 text-amber-600" />
                      Catatan Teknisi
                    </CardTitle>
                    <CardDescription>
                      Catatan dan komunikasi selama proses perbaikan
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {orderDetails.notes.map((note, index) => (
                        <div
                          key={index}
                          className={`
                            p-4 rounded-lg border-l-4
                            ${
                              note.type === "diagnostic"
                                ? "bg-blue-50 border-blue-400 dark:bg-blue-900/20 dark:border-blue-600"
                                : ""
                            }
                            ${
                              note.type === "progress"
                                ? "bg-yellow-50 border-yellow-400 dark:bg-yellow-900/20 dark:border-yellow-600"
                                : ""
                            }
                            ${
                              note.type === "completed"
                                ? "bg-green-50 border-green-400 dark:bg-green-900/20 dark:border-green-600"
                                : ""
                            }
                          `}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="secondary"
                                className={`
                                  ${
                                    note.type === "diagnostic"
                                      ? "bg-blue-100 text-blue-800"
                                      : ""
                                  }
                                  ${
                                    note.type === "progress"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : ""
                                  }
                                  ${
                                    note.type === "completed"
                                      ? "bg-green-100 text-green-800"
                                      : ""
                                  }
                                `}
                              >
                                {note.type === "diagnostic" && "Diagnosis"}
                                {note.type === "progress" && "Progress"}
                                {note.type === "completed" && "Selesai"}
                              </Badge>
                              <span className="font-medium text-slate-900 dark:text-white">
                                {note.author}
                              </span>
                            </div>
                            <span className="text-xs text-slate-500">
                              {formatDate(note.date)}
                            </span>
                          </div>
                          <p className="text-slate-700 dark:text-slate-300">
                            {note.content}
                          </p>
                        </div>
                      ))}

                      {orderDetails.notes.length === 0 && (
                        <div className="text-center py-8">
                          <MessageCircleIcon className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                          <p className="text-slate-500 dark:text-slate-400">
                            Belum ada catatan dari teknisi
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      )}
      {!isSignedIn && <LoadingState />}{" "}
      {/* Enhanced Image Modal with better mobile support */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-2 sm:p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full w-full">
            <div className="relative bg-white dark:bg-slate-900 rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={selectedImage}
                alt="Detail foto"
                width={800}
                height={600}
                className="max-w-full max-h-[80vh] object-contain mx-auto block"
              />
              <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-white/90 hover:bg-white dark:bg-slate-800/90 dark:hover:bg-slate-800 backdrop-blur-sm shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(null);
                  }}
                >
                  <XCircleIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetailPage;
