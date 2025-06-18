"use client";

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

const OrderDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [orderDetails, setRepairOrder] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [customer, setCustomer] = useState<any>(null);
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);

  const orderId = params.id as string;

  const { user } = useUser();

  useEffect(() => {
    client.fetch(getCustomerByClerkId(user.id)).then((data) => {
      setCustomer(data);
    });
    client
      .fetch(getRepairOrderById(orderId))
      .then((data) => {
        setRepairOrder(data);
      })
      .catch((error) => {
        console.error("Error fetching repair order:", error);
      });
  }, [orderId, user.id]);

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
      case "diagnosed":
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

                {/* <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
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
                </div> */}
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
                            {params.id}
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
                          <Badge
                            variant={
                              orderDetails.deliveryOption === "pickup"
                                ? "destructive"
                                : "outline"
                            }
                            className="text-xs"
                          >
                            {orderDetails.deliveryOption === "pickup"
                              ? "Pick Up"
                              : "Delivery"}
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
                              orderDetails?.estimatedCompletion
                            ).toLocaleDateString("id-ID") ?? "None"}
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
                          // <Button className="w-full mt-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all duration-200">
                          //   <CreditCardIcon className="w-4 h-4 mr-2" />
                          //   Bayar Sekarang
                          // </Button>
                          <Tabs
                            value={activeTab}
                            onValueChange={setActiveTab}
                            className="w-full"
                          >
                            <TabsList className="w-full">
                              <TabsTrigger
                                value="payment"
                                className="bg-gradient-to-r from-amber-500 to-amber-600 text-white data-[state=active]:text-white transition-all duration-200 text-xs sm:text-base py-2 sm:py-3 w-full mt-3 hover:from-amber-600 hover:to-orange-600"
                              >
                                <CreditCardIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                <span className="inline">Pembayaran</span>
                              </TabsTrigger>
                            </TabsList>
                          </Tabs>
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
                        {/* <div className="flex items-center gap-3 p-3 rounded-lg bg-white/60 dark:bg-slate-800/60">
                          <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <PhoneIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                          </div>
                          <p className="text-slate-700 dark:text-slate-300">
                            {customer?.phone ?? 'None'}
                          </p>
                        </div> */}
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white/60 dark:bg-slate-800/60">
                          <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mt-0.5">
                            <MapPinIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-slate-900 dark:text-white">
                              Alamat
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                              {customer.address}
                            </p>
                          </div>
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
                        <a
                          href={`https://wa.me/${orderDetails.technician.phone}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20 dark:hover:from-orange-900/40 dark:hover:to-amber-900/40 border-orange-200 dark:border-orange-800 hover:shadow-md transition-all duration-200"
                          >
                            <MessageCircleIcon className="w-4 h-4 mr-2" />
                            Hubungi Teknisi
                          </Button>
                        </a>
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
                      {orderDetails.images.map((image, index) => (
                        <div
                          key={index}
                          className="group relative bg-white dark:bg-slate-800 rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-slate-200/50 dark:border-slate-700/50"
                          onClick={() =>
                            setSelectedImage(urlFor(image.url).url())
                          }
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
                          <Button
                            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                            onClick={() => setShowPaymentInfo(!showPaymentInfo)}
                          >
                            <DollarSignIcon className="w-4 h-4 mr-2" />
                            {showPaymentInfo
                              ? "Tutup Info Pembayaran"
                              : "Bayar Sekarang"}
                          </Button>

                          {/* Info Pembayaran */}
                          {showPaymentInfo && (
                            <div className="mt-2 border p-4 rounded-lg bg-amber-50/50 dark:bg-amber-900/10 space-y-4 flex flex-col justify-center">
                              <p>
                                <strong>Bank:</strong> BCA
                              </p>
                              <p>
                                <strong>No Rekening:</strong> 1234567890 a.n.
                                Mitra Servis Elektronik
                              </p>
                              <p>
                                <strong>Konfirmasi Pembayaran:</strong>
                                <a
                                  href="https://wa.me/6285743840940?text=Halo,%20saya%20telah%20melakukan%20pembayaran"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 underline ml-1"
                                >
                                  WhatsApp Admin
                                </a>
                              </p>

                              <Button
                                className="mt-2 bg-green-500 hover:bg-green-600 text-white mx-auto transition duration-200"
                                onClick={() => setShowPaymentInfo(false)}
                              >
                                Saya Sudah Konfirmasi
                              </Button>
                            </div>
                          )}
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
