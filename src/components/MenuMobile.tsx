import Link from "next/link";

export function MenuMobile() {
  const menuItem =
    "rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-purple-500/10 hover:text-purple-600";

  return (
    <div
      className="
        absolute
        left-0
        top-20
        z-50
        w-full
        bg-white
        border-b
        border-purple-500/30
        shadow-lg
        md:hidden
      "
    >
      <div className="flex flex-col gap-2 p-6">
        <Link href="/" className={menuItem}>
          Home
        </Link>

        <Link href="/products" className={menuItem}>
          Products
        </Link>

        <Link href="/" className={menuItem}>
          Categories
        </Link>
      </div>
    </div>
  );
}