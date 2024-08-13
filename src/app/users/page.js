"use client";
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UsersPage() {
    const { loading, data } = useProfile();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/api/users').then(response => {
            response.json().then(users => {
                setUsers(users);
            });
        })
    }, []);
    if (loading) {
        return 'Loading user info...';
    }
    if (!data.admin) {
        return 'Not an admin.';
    }
    return (
        <section className="max-w-2xl mx-auto mt-8">
            <UserTabs isAdmin={true} />
            <div className="mt-8">
                {users.length > 0 && users.map(user => (
                    <div key={user._id} className="bg-gray-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-4">
                        <div className="flex p-4 gap-4 grow">
                            <span>{user.name || 'No name'}</span>
                            <span className="text-gray-500">{user.email}</span>
                        </div>
                        {/* <div>
                            <Link className="button" href={'/users/'+user._id}>Edit</Link>
                        </div> */}
                    </div>
                ))}
            </div>
        </section>
    );
}