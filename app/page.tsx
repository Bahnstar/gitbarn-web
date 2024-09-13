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
}
