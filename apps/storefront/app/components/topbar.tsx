import Image from "next/image";
import Link from "next/link";

export default function Topbar() {
  return (
    <span className="flex flex-row items-center justify-center w-full h-14 px-4 gap-4 bg-[#1F140E] text-white">
      <span className="shrink-0">
        <Image src="/logo.png" alt="Logo" width={100} height={48} />
      </span>
      <span className="flex flex-row flex-1 items-center justify-center space-x-6 ">
        <Link href="/" className="text-sm font-medium text-white/90 hover:text-white">Home</Link>
        <Link href="/phones" className="text-sm font-medium text-white/90 hover:text-white">Phones</Link>
        <Link href="/accessories" className="text-sm font-medium text-white/90 hover:text-white">Accessories</Link>
        <Link href="/brands" className="text-sm font-medium text-white/90 hover:text-white">Brands</Link>
        <Link href="/deals" className="text-sm font-medium text-white/90 hover:text-white">Deals</Link>
        <Link href="/contact" className="text-sm font-medium text-white/90 hover:text-white">Contact</Link>
      </span>
      <span className="shrink-0">
        {/* <Image src="/cart.png" alt="Cart" width={24} height={24} /> */}
        <Link href="/cart">Cart</Link>
      </span>
    </span>
  );
}
