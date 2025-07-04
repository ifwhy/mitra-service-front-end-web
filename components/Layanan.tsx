import images from "@/constants/images";
import Image from "next/image";
import { Search, Truck, HandHeart, Hammer, PackageCheck } from "lucide-react";

const Layanan = () => {
    return (
        <section 
        id="layanan"
        className="h-[75rem] lg:h-[60rem] grid grid-cols-1 lg:grid-cols-[525px_1fr] px-8 pb-8 pt-16 mt-[4rem] gap-8 lg:gap-16 lg:scroll-mt-[10rem]"
        >
            <div className="flex justify-center items-start">
                <Image
                    src={images.technician}
                    alt="Technician"
                    className="w-[95%] lg:w-[90%] object-cover rounded-lg"
                />
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 mb-1">
                    <div className="h-[2px] w-8 lg:w-12 bg-blue-700 dark:bg-cyan-400" />
                    <h2 className="text-blue-700 dark:text-cyan-400 text-base lg:text-lg font-bold tracking-widest text-center">
                    LAYANAN KAMI
                    </h2>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold tracking-wide">Kepuasan Pelanggan Adalah yang Utama</h2>
                <p className="text-base">Kami memiliki beberapa layanan untuk meningkatkan kepuasan para pelanggan.</p>
                <div className="grid grid-rows-5 gap-4">
                    <CardItem
                        icon={<HandHeart color="currentColor" size={48} />}
                        title="Solusi Kami"
                        description="Kami menyediakan solusi layanan terpadu untuk berbagai kebutuhan servis elektronik Anda."
                    />
                    <CardItem
                        icon={<Search color="currentColor" size={48} />}
                        title="Pemeriksaan dan Diagnosis"
                        description="Teknisi akan menganalisis kerusakan perangkat dan memberikan estimasi biaya."
                    />
                    <CardItem
                        icon={<Hammer color="currentColor" size={48} />}
                        title="Servis dan Perbaikan"
                        description="Perangkat Anda akan diperbaiki oleh teknisi berpengalaman."
                    />
                    <CardItem
                        icon={<Truck color="currentColor" size={48} />}
                        title="Pengambilan Perangkat"
                        description="Layanan penjadwalan pengambilan perangkat elektronik yang rusak langsung dari lokasi pelanggan."
                    />
                    <CardItem
                        icon={<PackageCheck color="currentColor" size={48} />}
                        title="Pengembalian Perangkat"
                        description="Setelah proses servis selesai, perangkat akan dikembalikan ke Anda dengan aman dan cepat."
                    />
                </div>
            </div>
        </section>
    );
}

const CardItem = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="bg-white dark:bg-slate-700/50 w-full h-[88px] lg:h-[110px] grid grid-cols-[70px_1fr] lg:grid-cols-[100px_1fr] justify-center items-center rounded-l-full transform duration-700 relative overflow-hidden group p-2 shadow-md shadow-slate-400/20 hover:shadow-none hover:text-white">
    <div className="absolute inset-0 bg-amber-500 dark:bg-sky-500 origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out z-0 rounded-l-full" />
    <div className="flex justify-center items-center z-10 text-amber-500 group-hover:text-white transition duration-700 scale-75 group-hover:scale-[.70] lg:scale-100 lg:group-hover:scale-90 transform">{icon}</div>
    <div className="flex flex-col gap-1 px-1 lg:px-3 z-10">
      <h2 className="text-sm lg:text-base font-extrabold tracking-wider">
        {title}
      </h2>
      <p className="tracking-wide text-[10px] lg:text-sm font-light">{description}</p>
    </div>
  </div>
);

export default Layanan;