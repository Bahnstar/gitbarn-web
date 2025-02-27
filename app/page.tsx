"use client"
import BlurFade from "@/components/magicui/blur-fade"
import Iphone15Pro from "@/components/magicui/iphone-15-pro"
import WordRotate from "@/components/magicui/word-rotate"
import Swiper, { SwiperData } from "@/components/Swiper"
import MarqueeDemo from "@/components/Marquee"
import HeroVideoDialog from "@/components/magicui/hero-video-dialog"
import Link from "next/link"

export default function Index() {
  const serviceStyle = "bg-gray-50 p-2 rounded-md shadow-sm text-center"
  const swiperData: SwiperData[] = [
    {
      title: "Online Orders",
      image: "https://gitbarn.com/wp-content/uploads/2018/08/GIT-Truck-lift-banner3.jpg",
      description: "A new manure removal system | No Flies | Saves Money | Saves Time",
    },
    {
      title: "Online Orders",
      image: "https://gitbarn.com/wp-content/uploads/2018/07/GIT-pictures-at-3080.jpg",
      description:
        "Competitive Pricing | Outstanding Customer Service | Friendly Drivers | Clean Trucks",
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
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-col gap-16 md:gap-20 2xl:gap-28">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <div className="mx-6 flex w-full items-center justify-between gap-2 md:w-auto">
              <img
                src="https://gitbarn.com/wp-content/uploads/2018/06/gitbarn-logo.png"
                alt="Git Barn Logo"
                className="h-8"
              />
              <Link
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 md:hidden"
                href="login"
              >
                Login
              </Link>
            </div>
            <div className="mr-4 hidden md:flex">
              <nav className="flex items-center space-x-6 text-sm font-medium">
                <a
                  className="text-foreground/60 transition-colors hover:text-foreground/80"
                  href="#services"
                >
                  Services
                </a>
                <a
                  className="text-foreground/60 transition-colors hover:text-foreground/80"
                  href="#about"
                >
                  About
                </a>
                <a
                  className="text-foreground/60 transition-colors hover:text-foreground/80"
                  href="#contact"
                >
                  Contact
                </a>
                <Link
                  className="text-foreground/60 transition-colors hover:text-foreground/80"
                  href="login"
                >
                  Login
                </Link>
              </nav>
            </div>
          </div>
        </header>
        <section className="m-auto flex w-3/5 flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <BlurFade delay={0.5}>
              <h1 className="text-center text-4xl font-bold md:text-6xl">Welcome to Git Barn</h1>
            </BlurFade>
            <BlurFade delay={1.0}>
              <h2 className="text-center text-2xl md:text-4xl">
                The <span className="font-semibold text-green-400">#1</span> horse manure solution
                in South Florida
              </h2>
            </BlurFade>
          </div>
        </section>
        <section className="m-auto w-full md:w-5/6 2xl:w-4/6">
          <BlurFade delay={1.5} className="flex h-full flex-col items-center">
            <Swiper data={swiperData} />
          </BlurFade>
        </section>
        <section className="m-auto w-full md:w-4/5 md:px-0 2xl:w-3/5">
          <BlurFade delay={2}>
            <div className="flex w-full flex-col items-center gap-12 md:flex-row">
              <div className="flex flex-1 flex-col gap-4">
                <h2 className="text-center text-3xl font-semibold md:text-4xl">
                  Git Barn Manure Removal
                </h2>
                <p className="flex-1 text-center text-lg md:text-xl 2xl:text-2xl">
                  Serving Palm Beach County, we provide eco-friendly manure removal services along
                  with premium yellow pine wood shavings for stalls. Our professional team is
                  committed to delivering exceptional service, quality products, and reliable
                  results—all with a focus on efficiency and customer satisfaction.
                </p>
                <div className="flex flex-col gap-2 text-lg">
                  <p className="m-auto text-2xl font-medium">We Service:</p>
                  <div className="grid h-full grid-cols-2 items-center justify-items-center gap-2 text-lg">
                    <p className={serviceStyle}>Residential Properties</p>
                    <p className={serviceStyle}>Farms with Residential Properties</p>
                    <p className={serviceStyle}>Commercial Farms</p>
                    <p className={serviceStyle}>Commercial Properties</p>
                  </div>
                </div>
              </div>
              <div className="relative flex-1">
                <HeroVideoDialog
                  className="block dark:hidden"
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
          <div className="m-auto flex w-full flex-col-reverse items-center justify-center gap-8 px-4 md:w-4/6 md:flex-row md:px-0 2xl:w-3/6">
            <Iphone15Pro
              className="h-[50vh]"
              src={"https://i.ibb.co/kGW15k6/photo-2024-09-12-17-10-14.jpg"}
            />
            <div className="flex h-full flex-1 flex-col items-center gap-8">
              <h2 className="text-center text-3xl font-semibold md:text-4xl">
                Git Barn Software Portal
              </h2>
              <p className="text-center text-lg md:text-xl">
                We created a custom software portal for our customers to easily receive support,
                view orders, and check documents related to billing. The portal is easy to use and
                provides a seamless experience for our customers. You can access the portal by
                clicking the Login button on the top menu.
              </p>
              <WordRotate
                className="text-center text-3xl font-bold text-black md:text-4xl dark:text-white"
                words={["Online Orders", "24/7 Support", "Document Viewing"]}
              />
              <p className="text-2xl">via our Git Barn online portal</p>
            </div>
          </div>
        </section>
        <section className="flex flex-col items-center gap-10">
          <h2 className="text center text-3xl font-semibold md:text-4xl">Testimonials</h2>
          <MarqueeDemo />
        </section>
      </main>
    </div>
  )
}
