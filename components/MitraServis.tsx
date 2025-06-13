import { CircleHelp, Wrench } from "lucide-react";
import Link from "next/link";

const MitraService = () => {
  return (
    <section
      id="mitra-servis"
      className="w-full h-full dark:bg-neutral-900 py-4 lg:scroll-mt-[10rem]"
    >
      {/* Mitra Servis */}
      <div className="dark:bg-neutral-900 flex flex-col items-center">
        {/* judul */}
        <div className="w-full flex flex-col items-center p-2">
          <div className="flex items-center justify-center gap-4 my-4">
            <div className="h-[2px] w-6 lg:w-16 bg-blue-700 dark:bg-cyan-400" />
            <h2 className="text-blue-700 dark:text-cyan-400 text-base lg:text-lg font-bold tracking-widest text-center">
              MITRA SERVIS ELEKTRONIIK
            </h2>
            <div className="h-[2px] w-6 lg:w-16 bg-blue-700 dark:bg-cyan-400" />
          </div>
          <h1 className="font-semibold text-xl lg:text-2xl max-w-3xl text-center tracking-wider text-black dark:text-white">
            Kami adalah penyedia layanan servis elektronik terbaik di Kota Solo.
          </h1>
        </div>

        {/* card */}
        <div className="flex flex-wrap justify-center gap-8 w-full max-w-6xl py-8 px-3">
          {/* Mengapa memilih kami? */}
          <CardItem
            icon={<CircleHelp color="currentColor" size={64} />}
            title="Mengapa Memilih Kami?"
            description="Kami hadir untuk memberikan solusi terbaik untuk kebutuhan servis elektronik Anda."
          />

          {/* TimKami */}
          <CardItem
            icon={<Wrench color="currentColor" size={64} />}
            title="Tim Kami"
            description="Kami memiliki tim teknisi profesional untuk menangani berbagai perangkat elektronik."
          />
        </div>
      </div>
    </section>
  );
};

const CardItem = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="bg-gradient-to-r from-amber-300/20 dark:from-sky-400/20 to-transparent dark:bg-slate-700/50 w-[450px] h-[100px] lg:h-[150px] grid-cols-[40px_1fr] grid lg:grid-cols-[100px_1fr] justify-center items-center rounded-lg hover:-translate-y-2 transform duration-700 relative overflow-hidden group text-slate-900 hover:text-white dark:text-white px-3 lg:px-0 border-amber-200 dark:border-sky-500 border-2">
    <div className="absolute inset-0 bg-amber-500 dark:bg-sky-500 origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 ease-in-out z-0" />
    <div className="flex justify-center items-center z-10">{icon}</div>
    <div className="flex flex-col gap-1 p-3 z-10">
      <Link href={""} className="font-bold text-sm lg:text-lg tracking-wider">
        {title}
      </Link>
      <p className="tracking-wide text-xs lg:text-base">{description}</p>
    </div>
  </div>
);

export default MitraService;
