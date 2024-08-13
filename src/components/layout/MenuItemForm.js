import Image from "next/image";
import { useEffect, useState } from "react";

export default function MenuItemForm({onSubmit, menuItem}) {
    const [name, setName] = useState(menuItem?.name || '');
    const [description, setDescription] = useState(menuItem?.description || '');
    const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
    const [category, setCategory] = useState(menuItem?.category || '');
    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories);
            })
        })
    }, [])

    return (
        <form onSubmit={ev => onSubmit(ev, {name, description, basePrice, category})} className="mt-8 max-w-md mx-auto">
        <div className="md:grid gap-4 items-start" style={{ gridTemplateColumns: '.3fr .7fr' }}>
            <div>
                <Image src={'/burger.png'} width={250} height={250} alt="burger-image" />
            </div>
            <div className="grow">
                <label>Item name</label>
                <input type="text" value={name} onChange={ev => setName(ev.target.value)} />
                <label>Description</label>
                <input type="text" value={description} onChange={ev => setDescription(ev.target.value)} />
                <label>Category</label>
                <select value={category} onChange={ev => setCategory(ev.target.value)}>
                    {categories?.length > 0 && categories.map(c => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                </select>
                <label>Base Price</label>
                <input type="text" value={basePrice} onChange={ev => setBasePrice(ev.target.value)} />
                <button type="submit">Save</button>
            </div>
        </div>
    </form>
    );
}