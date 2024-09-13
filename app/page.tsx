"use client"
import BlurFade from "@/components/magicui/blur-fade"
import Iphone15Pro from "@/components/magicui/iphone-15-pro"
import WordRotate from "@/components/magicui/word-rotate"
import Swiper, { SwiperData } from "@/components/Swiper"
import MarqueeDemo from "@/components/Marquee"
import HeroVideoDialog from "@/components/magicui/hero-video-dialog"

export default async function Index() {
  const swiperData: SwiperData[] = [
    {
      title: "Online Orders",
      image: "https://gitbarn.com/wp-content/uploads/2018/08/GIT-Truck-lift-banner3.jpg",
      description: "A new manure removal system | No Flies | Saves Money | Saves Time",
    },
    {
      title: "Online Orders",
      image: "https://gitbarn.com/wp-content/uploads/2018/07/GIT-pictures-at-3080.jpg",
      description: "Competitive Pricing | Outstanding Customer Service | Friendly Drivers | Clean Trucks",
    },
    {
      title: "Online Orders",
      image: "https://gitbarn.com/wp-content/uploads/2018/08/bedding-banner1.jpg",
      description: "We also offer super bedding for the comfort of your horses",
    },
    {
      title: "Online Orders",
      image: "https://gitbarn.com/wp-content/uploads/2018/08/GIT-dump-in-the-dumpster2.jpg",
      description: "Convenient, easy to operate, non-leaking dumpsters with lids",
    },
    {
      title: "Online Orders",
      image: "https://gitbarn.com/wp-content/uploads/2018/06/shutterstock_554368408.jpg",
      description: "Even horses recommend us!",
    }
  ]


  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-col gap-28">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <div className="flex items-center gap-2 mx-6">
              <img
                src="https://gitbarn.com/wp-content/uploads/2018/06/gitbarn-logo.png"
                alt="Git Barn Logo"
                className="h-8"
              />
            </div>
            <div className="mr-4 hidden md:flex">
              <nav className="flex items-center space-x-6 text-sm font-medium">
                <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="#services">Services</a>
                <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="#about">About</a>
                <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="#contact">Contact</a>
                <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="login">Login</a>
              </nav>
            </div>
          </div>
        </header>
        <section className="flex flex-col justify-center items-center w-3/5 m-auto">
          <div className="flex flex-col items-center gap-4">
            <BlurFade delay={0.25}>
              <h1 className="text-6xl font-bold">Welcome to Git Barn</h1>
            </BlurFade>
            <BlurFade delay={.5}>
              <h2 className="text-4xl">The <span className="font-semibold text-green-400">#1</span>  horse manure solution in South Florida</h2>
            </BlurFade>
          </div>
        </section>
        <section className="m-auto w-4/6 h-[50vh]">
          <BlurFade delay={.75} className="flex flex-col items-center h-full">
            <Swiper data={swiperData} />
          </BlurFade>
        </section>
        <section className="m-auto w-3/5">
          <BlurFade delay={1}>
            <div className="flex flex-row items-center gap-12 w-full ">
              <div className="flex-1 flex flex-col gap-8">
                <h2 className="text-4xl font-semibold">Git Barn Manure Removal</h2>
                <p className="flex-1 text-2xl">
                  Serving Palm Beach County, we provide eco-friendly manure removal services
                  along with premium yellow pine wood shavings for stalls. Our professional team
                  is committed to delivering exceptional service, quality products, and reliable
                  results—all with a focus on efficiency and customer satisfaction.
                </p>
                <div className="flex flex-col gap-2 text-lg">
                  <p>We Service:</p>
                  <ul>
                    <li>Residential Properties</li>
                    <li>Farms with Residential Properties</li>
                    <li>Commercial Farms</li>
                    <li>Commercial Properties</li>
                  </ul>
                </div>
              </div>
              <div className="flex-1 relative">
                <HeroVideoDialog
                  className="dark:hidden block"
                  animationStyle="from-center"
                  videoSrc="https://www.youtube.com/embed/T0GKop_lgEY?si=hpvXvcVUiStcPnge"
                  thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
                  thumbnailAlt="Hero Video"
                />
                {/* <HeroVideoDialog */}
                {/*   className="hidden dark:block" */}
                {/*   animationStyle="from-center" */}
                {/*   videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb" */}
                {/*   thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png" */}
                {/*   thumbnailAlt="Hero Video" */}
                {/* /> */}
              </div>
            </div>
          </BlurFade>
        </section>
        <section className="flex flex-col items-center gap-10">
          <div className="flex flex-row justify-center items-center gap-8 w-3/6 h-full m-auto">
            <Iphone15Pro className="h-[50vh]" src={"https://i.ibb.co/kGW15k6/photo-2024-09-12-17-10-14.jpg"} />
            <div className="flex-1 flex flex-col items-center gap-8">
              <h2 className="text-4xl font-semibold">Git Barn Software Portal</h2>
              <WordRotate
                className="text-4xl font-bold text-black dark:text-white"
                words={["Online Orders", "24/7 Support", "Document Viewing"]}
              />
              <p className="text-2xl">via our Git Barn online portal</p>
            </div>
          </div>
        </section>
        <section className="flex flex-col items-center gap-10">
          <h2 className="text-4xl font-semibold">Testimonials</h2>
          <MarqueeDemo />
        </section>
      </main>
    </div>
  )


  // return (
  //   <div className="flex-1">
  //     <div className="relative isolate px-6 pt-14 lg:px-8">
  //       <div
  //         className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
  //         aria-hidden="true"
  //       >
  //         <div
  //           className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
  //           style={{
  //             clipPath:
  //               "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
  //           }}
  //         />
  //       </div>
  //       <div className="mx-auto max-w-2xl flex-1 py-32 sm:py-48 lg:py-56">
  //         <div className="hidden sm:mb-8 sm:flex sm:justify-center">
  //           <Image
  //             src="https://gitbarn.com/wp-content/uploads/2018/06/gitbarn-logo.png"
  //             alt="GitBarn"
  //             width={162}
  //             height={150}
  //           />
  //         </div>
  //         <div className="text-center">
  //           <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
  //             Welcome to GitBarn
  //           </h1>
  //           <p className="mt-6 text-lg leading-8 text-gray-600">
  //             By installing GIT plastic, closed, non leaking dumpsters with lids you avoid the flies
  //             and are using an environmentally friendly solution to manure removal. Save money, save
  //             time!
  //           </p>
  //           <div className="mt-10 flex items-center justify-center gap-x-6">
  //             <Link
  //               href="/login"
  //               className="rounded-md bg-green-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
  //             >
  //               Login
  //             </Link>
  //           </div>
  //         </div>
  //       </div>
  //       <div
  //         className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
  //         aria-hidden="true"
  //       >
  //         <div
  //           className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
  //           style={{
  //             clipPath:
  //               "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
  //           }}
  //         />
  //       </div>
  //     </div>
  //   </div>
  // )
}
