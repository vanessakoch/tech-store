'use client'

import Link from "next/link";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { LuMenu, LuMonitorSmartphone, LuShoppingCart, LuX } from "react-icons/lu";
import { MenuMobile } from "./MenuMobile";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const navLink =
    "transition-colors duration-200 hover:text-purple-500";

  return (
    <nav className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

      <Link 
        href="/" 
        className="flex items-center gap-2 transition-colors hover:text-purple-500"
      >
        <LuMonitorSmartphone className="h-8 w-8 text-purple-500" />
        <span className="text-xl font-bold">ByteStore</span>
      </Link>


      <div className="hidden items-center gap-12 md:flex">
        <Link href="/" className={navLink}>
          Home
        </Link>

        <Link
          href="/"
          className="
            relative
            transition-colors
            duration-300
            hover:text-purple-500
            after:absolute
            after:left-0
            after:-bottom-1
            after:h-0.5
            after:w-0
            after:bg-purple-500
            after:transition-all
            after:duration-300
            hover:after:w-full
          "
        >
          Products
        </Link>

        <Link href="/" className={navLink}>
          Categories
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/">
          <FaHeart className="text-red-500" size={20}/>
        </Link>

        <Link href="/" className={navLink}>
          <LuShoppingCart size={26}/>
        </Link>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <LuX size={28} /> : <LuMenu size={28} />}
        </button>
      </div>

      {open && <MenuMobile />}

    </nav>
  );
}