import { Navbar } from "@/components/NavBar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-6 py-12 md:flex-row md:px-8">
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-4xl font-bold md:text-5xl">
            Discover the Latest Tech
          </h1>

          <p className="mt-6 text-lg text-gray-500">
            Explore premium electronics at unbeatable prices.
          </p>

          <div className="mt-6 flex justify-center md:justify-start">
            <Link
              href="/"
              className="
                rounded-lg
                font-bold
                border border-purple-500
                px-6 py-2
                text-purple-500
                shadow-sm
                transition-shadow
                duration-300
                hover:bg-purple-500
                hover:text-white
                hover:shadow-lg
              ">
              Shop Now
            </Link>
          </div>
        </div>

        <Image
          src="/assets/home.jpg"
          alt="ByteStore Banner"
          width={1200}
          height={600}
          className="h-75 w-full rounded-2xl object-cover md:h-112.5"
        />
      </section>
    </main>
  )
}