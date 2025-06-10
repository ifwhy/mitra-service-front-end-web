"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  SettingsIcon,
  WrenchIcon,
  DollarSignIcon,
  StarIcon,
  PlusIcon,
  UserIcon,
} from "lucide-react";
import { DashboardAuthModal } from "@/components/DashboardAuthModal";
import {
  DashboardHeader,
  DashboardWelcome,
  DashboardStats,
  OrdersTab,
  NewOrderTab,
  ProfileTab,
  LoadingState,
} from "@/components/dashboard";
import { useEffect, useState } from "react";
import { client } from "@/sanity/client";
import { getRepairOrdersByCustomer } from "@/lib/queries";

const DashboardPage = () => {
  const [orders, setOrders] = useState<any[]>([]);

  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const userId = user?.id;

  console.log(userId);

useEffect(() => {
  if (!user?.id) return;

  const customerId = user.id;
  console.log("Fetching repair orders for:", customerId);

  client
    .fetch(getRepairOrdersByCustomer(customerId))
    .then((data) => {
      console.log("Raw repair data:", data);

      const mappedOrders = (data || []).map((order: any) => ({
        id: order.orderId || order._id,
        device: [order.brand, order.model].filter(Boolean).join(" ") || order.device,
        issue: order.issue,
        status: order.status,
        date: order.dateCreated,
        estimatedCompletion: order.estimatedCompletion,
        technician: order.technician?.name || "",
        price: order.pricing?.total || 0,
        rating: order.rating || 0,
      }));

      console.log("Mapped orders:", mappedOrders);
      setOrders(mappedOrders);
    })
    .catch((error) => {
      console.error("Error fetching repair order:", error);
    });
}, [user?.id]);

  // Sample data for dashboard
  // const serviceOrders = [
  //   {
  //     id: "SRV-001",
  //     device: "Laptop ASUS ROG Strix G15",
  //     issue: "Layar berkedip dan tidak stabil, kadang blank screen",
  //     status: "in-progress",
  //     date: "2024-12-10",
  //     estimatedCompletion: "2024-12-12",
  //     technician: "Ahmad Fauzi",
  //     price: 450000,
  //     rating: 4.8,
  //   },
  //   {
  //     id: "SRV-002",
  //     device: "iPhone 13 Pro Max",
  //     issue: "Kamera belakang tidak berfungsi, hasil foto blur dan tidak fokus",
  //     status: "completed",
  //     date: "2024-12-08",
  //     estimatedCompletion: "2024-12-10",
  //     technician: "Sari Dewi",
  //     price: 875000,
  //     rating: 4.9,
  //   },
  //   {
  //     id: "SRV-003",
  //     device: "Samsung Galaxy Tab S8",
  //     issue:
  //       "Baterai cepat habis dan tablet sering hang, performa menurun drastis",
  //     status: "pending",
  //     date: "2024-12-12",
  //     estimatedCompletion: "2024-12-15",
  //     technician: "Budi Santoso",
  //     price: 440000,
  //     rating: 4.7,
  //   },
  // ];

  const stats = [
    {
      title: "Total Pesanan",
      value: "12",
      description: "3 selesai bulan ini",
      icon: SettingsIcon,
      trend: "+20.1%",
      color: "text-blue-600",
    },
    {
      title: "Sedang Dikerjakan",
      value: "3",
      description: "2 akan selesai minggu ini",
      icon: WrenchIcon,
      trend: "+15.2%",
      color: "text-orange-600",
    },
    {
      title: "Total Pembayaran",
      value: "Rp 2.450.000",
      description: "Bulan ini",
      icon: DollarSignIcon,
      trend: "+12.5%",
      color: "text-green-600",
    },
    {
      title: "Rating Layanan",
      value: "4.8/5.0",
      description: "Dari 15 ulasan",
      icon: StarIcon,
      trend: "+0.2",
      color: "text-yellow-600",
    },
  ];

  return (
    <>
      {/* Modal Login untuk user yang belum login */}
      <DashboardAuthModal />

      {/* Konten Dashboard - hanya tampil jika user sudah login */}
      {isSignedIn && (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/30 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
          {/* Header */}
          <DashboardHeader user={user} />

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Welcome Section */}
            <DashboardWelcome />

            {/* Stats Grid */}
            <DashboardStats stats={stats} />

            {/* Main Dashboard Content */}
            <Tabs defaultValue="orders" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 lg:w-[400px] bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-amber-200/50 dark:border-slate-700">
                <TabsTrigger
                  value="orders"
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-amber-600 data-[state=active]:text-white transition-all"
                >
                  <SettingsIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Pesanan</span>
                </TabsTrigger>
                <TabsTrigger
                  value="new-order"
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-amber-600 data-[state=active]:text-white transition-all"
                >
                  <PlusIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Buat Baru</span>
                </TabsTrigger>
                <TabsTrigger
                  value="profile"
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-amber-600 data-[state=active]:text-white transition-all"
                >
                  <UserIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Profil</span>
                </TabsTrigger>
              </TabsList>

              {/* Orders Tab */}
              <TabsContent value="orders" className="space-y-6">
                <OrdersTab serviceOrders={orders} />
              </TabsContent>

              {/* New Order Tab */}
              <TabsContent value="new-order" className="space-y-6">
                <NewOrderTab user={user} />
              </TabsContent>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                <ProfileTab user={user} />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      )}

      {/* Loading placeholder saat belum login */}
      {!isSignedIn && <LoadingState />}
    </>
  );
};

export default DashboardPage;
