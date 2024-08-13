"use client";
import UserTabs from "@/components/layout/UserTabs.js";
import { useEffect, useState } from "react";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import Left from "@/components/icons/Left";
import { redirect, useParams } from "next/navigation";
import toast from "react-hot-toast";
import MenuItemForm from "@/components/layout/MenuItemForm";

export default function EditMenuItemPage() {
    const {id} = useParams();
    const { loading, data } = useProfile();
    const [menuItem, setMenuItem] = useState(null);
    const [redirectToItems, setRedirectToItems] = useState(false);

    useEffect(()=>{
        fetch('/api/menu-items').then(res => {
            res.json().then(items => {
                const item = items.find(i => i._id === id);
                setMenuItem(item);
            })
        })
    },[]);

    async function handleFormSubmit(ev, data) {
        ev.preventDefault();
        data = {...data, _id:id};
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            })
            if (response.ok) {
                resolve();
            } else {
                reject();
            }
        });
        await toast.promise(savingPromise, {
            loading: 'Saving item...',
            success: 'Saved',
            error: 'Error'
        })
        
        setRedirectToItems(true);
    }

    async function handleDeleteClick(){
        const promise = new Promise(async(resolve, reject) => {
            const response = await fetch('/api/menu-items?_id='+id, {
                method: 'DELETE'
            });
            if(response.ok){
                resolve();
            } else {
                reject();
            }
        });
        toast.promise(promise, {
            loading: 'Deleting...',
            success: 'Deleted',
            error: 'Error'
        });
        setRedirectToItems(true);
    }

    if(redirectToItems){
        return redirect('/menu-items');
    }

    if (loading) {
        return 'Loading user info...';
    }

    if (!data.admin) {
        return 'Not an admin.';
    }

    return (
        <section className="mt-8">
            <UserTabs isAdmin={true} />
            <div className="max-w-md mx-auto mt-8">
                <Link className="button" href={'/menu-items'}><Left /><span>Show all Menu Items</span></Link>
            </div>
            <MenuItemForm onSubmit={handleFormSubmit} menuItem={menuItem} />
            <div className="max-w-md mx-auto mt-2">
                <div className="max-w-xs ml-auto pl-4">
                <button onClick={handleDeleteClick}>Delete</button>
                </div>
            </div>
        </section>
    );
}