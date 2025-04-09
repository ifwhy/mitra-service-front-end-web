import ModeToggle from "@/components/ToggleMode";
import Spline from "@splinetool/react-spline/next";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main>
        <section className="bg-blue-200 dark:bg-gray-900 h-screen grid justify-center py-8 relative overflow-hidden">
          <div className="grid grid-rows-[15%_25%_10%] justify-center h-[80%] z-20">
            {/* Navbar */}
            <nav className="bg-white dark:bg-gray-800 grid grid-cols-[40%_30%_30%] items-center gap-5 h-[55px] w-[1000px] rounded-full shadow-lg px-4">
              {/* Judul Navbar */}
              <h1 className="font-extrabold text-xl text-blue-900 dark:text-blue-200 flex justify-start items-center pl-8">
                MITRA SERVICE
              </h1>

              {/* Menu */}
              <nav className="flex flex-row gap-3 justify-center items-center text-gray-800 dark:text-gray-200">
                <Link href="#" className="hover:underline">
                  nav 1
                </Link>
                <Link href="#" className="hover:underline">
                  nav 2
                </Link>
                <Link href="#" className="hover:underline">
                  nav 3
                </Link>
                {/* Toggle Mode */}
                <ModeToggle />
              </nav>

              {/* Login/Signup */}
              <div className="flex items-center justify-end gap-4 pr-4">
                <div className="grid grid-cols-2 gap-2 bg-blue-800 dark:bg-blue-600 w-[140px] h-[40px] rounded-full items-center justify-center pl-1">
                  <div className="bg-blue-300 dark:bg-white w-full h-[33px] rounded-full grid items-center justify-center">
                    <Link href="#" className="text-blue-900 font-bold">
                      LOGIN
                    </Link>
                  </div>
                  <Link
                    href="#"
                    className="text-white dark:text-blue-100 font-bold"
                  >
                    SIGN UP
                  </Link>
                </div>
              </div>
            </nav>

            {/* Hero Text */}
            <div className="flex flex-col items-center justify-evenly h-full z-20">
              <h1 className="font-bold text-lg text-blue-900 dark:text-blue-100">
                HELLO WELCOME TO
              </h1>
              <h1 className="font-extrabold text-5xl tracking-wider text-blue-900 dark:text-blue-300">
                MITRA SERVICE
              </h1>
              <h1 className="text-gray-800 dark:text-gray-300 text-center px-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </h1>
            </div>

            {/* Learn More */}
            <div className="flex justify-center z-20">
              <div className="bg-blue-500 dark:bg-blue-600 mt-3 h-[45px] w-[170px] rounded-full flex items-center justify-center hover:bg-blue-600 dark:hover:bg-blue-700 transition">
                <Link href="#" className="font-bold text-lg text-white">
                  Learn More
                </Link>
              </div>
            </div>
          </div>

          {/* Spline Background */}
          <Spline
            scene="https://prod.spline.design/S5eBl3Tyv4dtMi6R/scene.splinecode"
            className="absolute z-10 w-full h-screen top-0 left-0"
          />
        </section>

        {/* Section bawah */}
        <div className="bg-blue-500 dark:bg-blue-700 text-green-700 dark:text-green-300 py-4 px-8">
          <h1 className="text-xl font-semibold">bejo</h1>
        </div>
      </main>
    </>
  );
}
