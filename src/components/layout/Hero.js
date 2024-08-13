import Image from "next/image";
import Right from "../icons/Right";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="hero md:mt-4">
            <div className="py-8 md:py-12">
                <h1 className="text-4xl font-semibold">Everything<br /> is better<br /> with a <span className="text-primary">Burger</span></h1>
                <p className="my-6 text-gray-500 text-sm">Burger is the missing piece that makes everyday complete, a simple yet delicious joy in life.</p>
                <div className="flex gap-4 text-sm">
                    <Link href={'/menu'} className="bg-primary justify-center uppercase flex items-center gap-2 text-white px-4 py-2 rounded-full">
                        Order now
                        <Right />
                    </Link>
                    <Link href={'/#about'} className="flex border-0 items-center gap-2 py-2 text-gray-600 font-semibold">
                        Learn more
                        <Right />
                    </Link>
                </div>
            </div>
            <div className="relative hidden md:block">
                <Image src={'/burger.png'} alt="burger" layout={"fill"} objectFit={"contain"} />
            </div>
        </section>
    );
}