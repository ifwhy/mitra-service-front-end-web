import KamiPerbaiki from "@/components/YangDapatKamiPerbaiki";

const DashboardPage = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2500));

  return (
    <div className="h-screen w-full flex flex-col gap-2 items-center justify-center">
      <p>INI HALAMAN DASHBOARD</p>
      <KamiPerbaiki />
    </div>
  );
};

export default DashboardPage;
