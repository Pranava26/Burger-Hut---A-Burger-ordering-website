import Image from "next/image";
import { useContext } from "react";
import { CartContext } from "@/components/AppContext";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function MenuItem(menuItem) {
    const {status} = useSession();
    const { name, description, basePrice } = menuItem;
    const { addToCart } = useContext(CartContext);

    function handleCartClick() {
        if(status === 'authenticated'){
            addToCart(menuItem);
            toast.success('Added to cart!');
        }
        else if(status === 'unauthenticated'){
            toast.error("Please login to add items to cart.");
        }
    }

    return (
        <section>
            <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
                <div className="text-center">
                    <Image className="block mx-auto max-h-24" src='/chicken-whooper.png' alt="chicken-whooper" width={100} height={100} />
                </div>
                <h4 className="font-semibold text-xl my-3">{name}</h4>
                <p className="text-gray-500 text-sm line-clamp-3">{description}</p>
                <button type="button" onClick={handleCartClick} className="mt-4 bg-primary text-white rounded-full px-8 py-2">Add to cart ₹{basePrice}</button>
            </div>
        </section>
    );
}