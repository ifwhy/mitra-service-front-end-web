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
  BellIcon,
} from "lucide-react";
import { DashboardAuthModal } from "@/components/DashboardAuthModal";
import {
  DashboardHeader,
  DashboardWelcome,
  DashboardStats,
  OrdersTab,
  NewOrderTab,
  NotificationsTab,
  ProfileTab,
  LoadingState,
} from "@/components/dashboard";
import { useEffect, useState } from "react";
import { client } from "@/sanity/client";
import { getRepairOrdersByCustomer, getOrderWithReviewById, getReviewsByCustomerId } from "@/lib/queries";

const DashboardPage = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("orders");
  const [reviews, setReviews] = useState<any[]>([]);

  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const userId = user?.id;

  console.log(userId);

  const fetchOrders = () => {
  if (!user?.id) return;
  const customerId = user.id;
  client
    .fetch(getRepairOrdersByCustomer(customerId))
    .then((data) => {
      const mappedOrders = (data || []).map((order: any) => ({
        id: order.orderId || order._id,
        sanityId: order._id, //id dari sanity
        device: [order.device, order.brand].filter(Boolean).join(" - ") || [order.brand, order.model].filter(Boolean).join(" "),
        issue: order.issue,
        status: order.status,
        date: order.dateCreated,
        estimatedCompletion: order.estimatedCompletion,
        technician: order.technician?.name || "",
        price: order.pricing?.total || 0,
        paid: order.pricing?.paid || 0,
        remaining: order.pricing?.remaining || 0,
        rating: order.rating || 0,
        timeline: order.timeline || [],
      }));
      setOrders(mappedOrders);

    })
    .catch((error) => {
      console.error("Error fetching repair order:", error);
    });

    client
      .fetch(getReviewsByCustomerId(customerId))
      .then((reviewData) => {
        const mappedReviews = (reviewData || []).map((review: any) => ({
          id: review._id,
          score: review.score || 0,
          review: review.review || "",
        }));
        setReviews(mappedReviews);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });

};


useEffect(() => {
    if (activeTab === "orders") {
      fetchOrders();
    }
}, [user?.id, activeTab]);

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

  // const notifications = [
  //   {
  //     id: "NOT-001",
  //     title: "🚚 Jadwal Penjemputan",
  //     description: "Penjemputan perangkat Anda dengan Nomor Pesanan SRV-001 dijadwalkan pada: Senin, 17 Juni 2025 pukul 10.00 WIB. Pastikan perangkat sudah siap.",
  //     date: "2025-06-13",
  //   },
  //   {
  //     id: "NOT-002",
  //     title: "✅ Pemesanan Berhasil",
  //     description: "Pemesanan layanan servis dengan Nomor Pesanan SRV-002 telah kami terima. Tim kami akan segera menghubungi Anda untuk penanganan lebih lanjut",
  //     date: "2025-06-12",
  //   },
  //   {
  //     id: "NOT-003",
  //     title: "💳 Pembayaran",
  //     description: "Pelunasan pembayaran Nomor Pesanan SRV-003 telah kami terima. Terima kasih atas kepercayaannya.",
  //     date: "2025-06-12",
  //   },
  // ];

  const [reviewData, setReviewData] = useState(null);
  // const fetchReviews = async () => {
  //     if (!orderId) return;

  //     try {
  //       const order = await getOrderWithReviewById(orderId);

  //       if (!order) {
  //         setReviewData(null);
  //         return;
  //       }

  //       const mappedReview = {
  //         id: order.orderId || order._id,
  //         sanityId: order._id,
  //         rating: order.review?.score || 0,
  //         reviewText: order.review?.review || "",
  //       };

  //       setReviewData(mappedReview);
  //     } catch (error) {
  //       console.error("Error fetching review order:", error);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchReviews();
  //   }, [orderId]);
  


  const stats = [
    {
      title: "Total Pesanan",
      value: `${orders.length}`,
      description: `${(orders || []).filter(order=>order.status==='completed').length} pesanan selesai`,
      icon: SettingsIcon,
      // trend: "+20.1%",
      color: "text-blue-600",
    },
    {
      title: "Sedang Dikerjakan",
      value: `${(orders || []).filter(order=>order.status!=='completed').length}`,
      description: `dari ${orders.length} pesanan`,
      icon: WrenchIcon,
      // trend: "+15.2%",
      color: "text-orange-600",
    },
    {
      title: "Total Pembayaran",
      value: `${orders.reduce((acc, order) => acc + (order.paid || 0), 0)}`,
      description: `${orders.reduce((acc, order) => acc + (order.remaining || 0), 0)} belum terbayar`,
      icon: DollarSignIcon,
      // trend: "+12.5%",
      color: "text-red-600",
    },
    {
      title: "Rating Layanan",
      value: `${reviews.reduce((acc, review) => acc + (review.score || 0), 0) / reviews.length} / 5`,
      description: `Dari ${reviews.length} ulasan`,
      icon: StarIcon,
      // trend: "+0.2",
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
            <Tabs defaultValue="orders" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 lg:w-[550px] bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-amber-200/50 dark:border-slate-700">
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
                  value="notification"
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-amber-600 data-[state=active]:text-white transition-all"
                >
                  <BellIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Notifikasi</span>
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
              <TabsContent value="orders" className="space-y-6" >
                <OrdersTab serviceOrders={orders} />
              </TabsContent>

              {/* New Order Tab */}
              <TabsContent value="new-order" className="space-y-6">
                <NewOrderTab user={user} />
              </TabsContent>

              {/* Notification Tab */}
              <TabsContent value="notification" className="space-y-6">
                <NotificationsTab orders={orders} />
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
