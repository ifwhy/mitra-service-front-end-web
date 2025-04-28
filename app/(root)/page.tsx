import MitraService from "../../components/MitraServis";
import KamiPerbaiki from "@/components/YangDapatKamiPerbaiki";
import HomeSection from "@/components/HomeSection";
import Footer from "@/components/Footer";
import FAQs from "@/components/FAQs";

export default async function Home() {
  // uncomment this line to simulate loading state
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <div className="w-full h-full flex flex-col gap-3 bg-slate-100 dark:bg-neutral-900">
      {/* Bagian Beranda */}
      <HomeSection />

      {/* Mitra Servis */}
      <MitraService />

      {/* Apa Saja yang Bisa Kami Perbaiki? */}
      <KamiPerbaiki />

      {/* FAQs */}
      <FAQs />

      {/* Footer */}
      <Footer />
    </div>
  );
}
