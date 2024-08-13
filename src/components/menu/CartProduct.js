import Trash from "@/components/icons/Trash";
import Image from "next/image";

export default function CartProduct({ product, index, onRemove }) {
    return (
        <div className="flex gap-4 border-b py-4 items-center">
            <div className="w-24">
                <Image src={'/burger.png'} width={240} height={240} alt="burger-image" />
            </div>
            <div className="grow">
                {product.name}
            </div>
            <div className="text-lg font-semibold">
                ₹{product.basePrice}
            </div>
            {onRemove && (
                <div className="ml-2">
                    <button type="button" onClick={() => onRemove(index)} className="p-2">
                        <Trash />
                    </button>
                </div>
            )}
        </div>
    );
}