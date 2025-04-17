const DashboardPage = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2500));

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <p>INI HALAMAN DASHBOARD</p>
    </div>
  );
};

export default DashboardPage;
