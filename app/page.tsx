import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col gap-3 justify-center items-center bg-slate-100 dark:bg-black">
      <Link
        href={"/hajs"}
        className="font-semibold py-1 px-3 rounded-lg dark:bg-slate-900 bg-slate-400 text-primary"
      >
        Go to 404 Not Found
      </Link>
    </div>
  );
}
