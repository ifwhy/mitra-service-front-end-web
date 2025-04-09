import Spline from '@splinetool/react-spline/next';
export default function Home() {
  return (
    <main>
      <section className='bg-gradient-to-b from-sky-200 to-white h-screen grid justify-center py-8 relative'>
        <div className='grid grid-rows-[12%_28%_10%] justify-center h-[600px]'>
          <nav className='bg-white/80 grid grid-cols-[40%_20%] justify-between items-center gap-5 px-10 h-[55px] w-[1000px] rounded-full'>
            {/*judul navbar*/}
            <h1 className='font-extrabold text-xl flex justify-start items-center text-blue-900'>MITRA SERVICE</h1>
            {/* menu */}
            {/* <div className="grid grid-cols-3 justify-center items-center">
              <a href="#" className='z-20'>nav 1</a>
              <a href="#" className='z-20'>nav 1</a>
              <a href="#" className='z-20'>nav 1</a>
            </div> */}
            {/* button login/sign up */}
            <div className='relative overflow-hidden group'>
              <div className='grid grid-cols-2 gap-3 bg-blue-900 w-full h-[40px] rounded-full items-center justify-center pl-1 hover:bg-blue-950 transition duration-300'>
                <div className='bg-blue-400 w-full h-[33px] rounded-full grid items-center justify-center hover:bg-blue-200 transition duration-300'>
                  <a href='#' className='text-white font-bold z-20 hover:text-blue-950 transition duration-300'>LOGIN</a>
                </div>
                <a href='#' className='text-white font-bold z-20 font-shadow hover:text-cyan-400 transition duration-300'>SIGN UP</a>
              </div>
                <span className="absolute inset-0 bg-gradient-to-bl from-white/30 to-white/0 rotate-45 translate-x-full group-hover:translate-x-[-100%] transition-transform duration-700 ease-out before:content-[''] before:absolute before:inset-0">
                </span>
            </div>
          </nav>
          {/* hellow */}
          <div className='flex flex-col items-center justify-evenly h-full text-blue-950'>
            <h1 className='font-bold text-lg '>HELLO WELCOME TO</h1>
            <h1 className='font-extrabold text-5xl tracking-wider'>MITRA SERVICE</h1>
            <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
          </div>
          {/* button learn more */}
          <div className='flex justify-center'>
            <div className="bg-blue-950 mt-3 h-[45px] w-[170px] rounded-full flex items-center justify-center">
              <a href="#" className='font-bold text-lg z-20 text-white hover:text-cyan-400 transition duration-300'>Learn More</a>
            </div>
          </div>
        </div>
        
        <Spline
          scene="https://prod.spline.design/S5eBl3Tyv4dtMi6R/scene.splinecode" className='absolute z-10 w-full h-screen'
        />


      </section>
      <div className="bg-blue-500 text-green-700">
        <h1 className="">bejo</h1>
      </div>

    </main>
  );
}

