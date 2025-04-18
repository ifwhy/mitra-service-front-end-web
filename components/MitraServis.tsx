import { CircleHelp, Wrench } from "lucide-react";
import Link from "next/link";

const MitraService = () => {
  return (
    <section
      id="mitra-servis"
      className="w-full mt-14 h-full bg-slate-100 dark:bg-neutral-950 py-4"
    >
      {/* Mitra Servis */}
      <div className="bg-slate-100 dark:bg-neutral-950 flex flex-col items-center">
        {/* judul */}
        <div className="w-full flex flex-col items-center p-2">
          <div className="flex items-center justify-center gap-4 my-4">
            <div className="h-[2px] w-16 bg-cyan-400" />
            <h2 className="text-cyan-400 text-lg font-bold tracking-widest text-center">
              MITRA SERVIS ELEKTRONIIK
            </h2>
            <div className="h-[2px] w-16 bg-cyan-400" />
          </div>
          <h1 className="font-semibold text-2xl max-w-3xl text-center tracking-wider text-black dark:text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            rerum totam
          </h1>
        </div>

        {/* card */}
        <div className="flex flex-wrap justify-center gap-8 w-full max-w-6xl py-8 px-3">
          {/* Mengapa memilih kami? */}
          <CardItem
            icon={<CircleHelp color="currentColor" size={64} />}
            title="Mengapa Memilih Kami?"
            description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam, itaque."
          />

          {/* TimKami */}
          <CardItem
            icon={<Wrench color="currentColor" size={64} />}
            title="Tim Kami"
            description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam, itaque."
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
  <div className="bg-amber-500 dark:bg-slate-700/50 w-[450px] h-[150px] grid grid-cols-[100px_1fr] justify-center items-center rounded-lg hover:-translate-y-2 transform duration-700 relative overflow-hidden group text-white">
    <div className="absolute inset-0 bg-sky-500 origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 ease-in-out z-0" />
    <div className="flex justify-center items-center z-10">{icon}</div>
    <div className="flex flex-col gap-1 p-3 z-10">
      <Link href={""} className="font-bold text-lg tracking-wider">
        {title} hello
      </Link>
      <p className="tracking-wide">{description}</p>
    </div>
  </div>
);

export default MitraService;
