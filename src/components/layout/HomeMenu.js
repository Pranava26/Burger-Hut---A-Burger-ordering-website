"use client";
import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import { useEffect, useState } from "react";

export default function HomeMenu() {
    const [bestSellers, setBestSellers] = useState([]);

    useEffect(()=>{
        fetch('/api/menu-items').then(response => {
            response.json().then(menuItems => {
                setBestSellers(menuItems.slice(-3));
            })
        } )
    }, []);

    return (
        <section>
            <div className="absolute left-0 right-0" style={{overflowX: 'hidden'}}>
                <div className="absolute left-0 -top-[70px] -z-10">
                <Image src={'/sallad1.png'} alt="sallad" width={109} height={189} />
                </div>
                <div className="absolute -top-[100px] right-0 -z-10">
                <Image src={'/sallad2.png'} alt="sallad" width={107} height={195}/>
                </div>
            </div>
        <div className="text-center mb-4">
            <SectionHeaders subHeader={'Check Out'} mainHeader={'Our Best Sellers'} />
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
           {bestSellers?.length > 0 && bestSellers.map(item => (
            <MenuItem key={item._id} {...item} />
           ))}
        </div>
        </section>
    );
}