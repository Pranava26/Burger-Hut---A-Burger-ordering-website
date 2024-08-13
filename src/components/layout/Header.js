"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "@/components/AppContext";
import ShoppingCart from "../icons/ShoppingCart";
import Bars2 from "../icons/Bars2";

function AuthLinks({ status, profile }) {
  if (status === 'authenticated') {
    return (
      <>
        <Link href={'/profile'} >Profile</Link>
        <button onClick={() => signOut({callbackUrl: '/'})} className="bg-primary rounded-full text-white px-8 py-2" >Logout</button>
      </>
    )
  }
  if (status !== 'authenticated') {
    return (
      <>
        <Link href={'/login'} >Login</Link>
        <Link href={'/register'} className="bg-primary rounded-full text-white px-8 py-2" >Register</Link>
      </>
    )
  }
}

export default function Header() {
  const { data: session, status } = useSession();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const cartProducts = useContext(CartContext);
  return (
    <header>
      <div className="flex items-center justify-between md:hidden">
        <Link className="text-primary font-semibold text-2xl" href={'/'} >Burger Hut</Link>
        <div className="flex gap-8 items-center">
          <Link href={'/cart'} className="relative">
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">{cartProducts.length}</span>
            )}
          </Link>
          <button className="p-1 border" onClick={() => setMobileNavOpen(prev => !prev)}>
            <Bars2 />
          </button>
        </div>
      </div>
      {mobileNavOpen && (
        <div onClick={() => setMobileNavOpen(false)} className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center">
          <Link href={'/'} >Home</Link>
          <Link href={'/menu'} >Menu</Link>
          <Link href={'/#about'} >About</Link>
          <Link href={'/#contact'} >Contact</Link>
          <AuthLinks status={status} profile='Profile' />
        </div>
      )}
      <div className="hidden md:flex items-center justify-between">
        <nav className="flex items-center gap-8 text-gray-500 font-semibold">
          <Link className="text-primary font-semibold text-2xl" href={'/'} >Burger Hut</Link>
          <Link href={'/'} >Home</Link>
          <Link href={'/menu'} >Menu</Link>
          <Link href={'/#about'} >About</Link>
          <Link href={'/#contact'} >Contact</Link>
        </nav>
        <nav className="flex items-center gap-4 text-gray-500 font-semibold">
          <AuthLinks status={status} profile='Profile' />
          <Link href={'/cart'} className="relative">
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">{cartProducts.length}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}