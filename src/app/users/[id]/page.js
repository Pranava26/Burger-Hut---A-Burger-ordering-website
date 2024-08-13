"use client";
import { useProfile } from "@/components/UseProfile";
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditUserPage() {
    const { data: session, status } = useSession();
    const {loading, data} = useProfile();
    const [user, setUser] = useState(null);
    const {id} = useParams();

    useEffect(()=>{
        fetch('/api/profile?._id='+id).then(response => {
            response.json().then(user => {
                setUser(user);
            })
        })
    }, [session, status]);

    function handleSaveForm(ev, data) {
        ev.preventDefault();
        const promise = new Promise(async(resolve, reject)=>{
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({...data, _id:id})
            });
            if(response.ok){
                resolve();
            } else {
                reject();
            }
        });
        toast.promise(promise, {
            loading: 'Saving user...',
            success: 'User saved',
            error: 'Error'
        })
    }

    if(loading){
        return 'Loading user info...';
    }
    if(!data.admin){
        return 'Not an admin.';
    }

    return (
        <section className="mt-8 mx-auto max-w-2xl">
            <UserTabs isAdmin={true} />
            <div className="mt-8">
                <UserForm user={user} onSave={handleSaveForm} />
            </div>
        </section>
    );
}