"use client";
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs.js";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState(null);
    const [profileFetched, setProfileFetched] = useState(false);

    useEffect(() => {
        if (status === 'authenticated') {
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    setUser(data);
                    setIsAdmin(data.admin);
                    setProfileFetched(true);
                })
            })
        } else {
            router.push('/login');
        }
    }, [session, status]);

    async function handleProfileInfoUpdate(ev, data) {
        ev.preventDefault();
        const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'appliction/json' },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            toast.success('Profile saved!');
        }
    }

    if (status === 'loading' || !profileFetched) {
        return (
            <p className="my-4 text-center">Loading...</p>
        );
    }

    return (
        <section className="mt-8">
            <UserTabs isAdmin={isAdmin} />
            <div className="max-w-2xl mx-auto mt-8">
                <UserForm user={user} onSave={handleProfileInfoUpdate} />
            </div>
        </section>
    );
}