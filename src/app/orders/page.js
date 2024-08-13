"use client";
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import { dbTime } from "@/libs/datetime";
import { useEffect, useState } from "react";
import Link from "next/link";
import Right from "@/components/icons/Right";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function OrdersPage() {
    const { data: session, status } = useSession();
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const { loading, data: profile } = useProfile();

    useEffect(() => {
        if(status === 'authenticated'){
            fetchOrders();
        }
    }, [session, status]);

    function fetchOrders() {
        setLoadingOrders(true);
        fetch('/api/orders').then(res => {
            res.json().then(orders => {
                setOrders(orders.reverse());
                setLoadingOrders(false);
            })
        })
    }

    if(status === 'unauthenticated'){
        return redirect('/login');
    }

    return (
        <section className="mt-8 max-w-2xl mx-auto">
            <UserTabs isAdmin={profile.admin} />
            <div className="mt-8">
                {loadingOrders && (
                    <div className="text-center">Loading orders...</div>
                )}
                {orders?.length > 0 && orders.map(order => (
                    <div key={order._id} className="bg-gray-100 mb-2 p-4 rounded-lg flex flex-col md:flex-row gap-6 items-center">
                        <div className="grow flex flex-col md:flex-row items-center gap-6">
                            <div>
                                {/* <div className={(order.paid ? 'bg-green-500' : 'bg-red-400') + 'p-2 rounded-md text-white w-24 text-center'}>{order.paid ? 'Paid' : 'Not paid'}</div> */}
                                <div className='p-2 rounded-md bg-green-400 text-white w-24 text-center'>Paid</div>
                            </div>
                            <div className="grow">
                                <div className="flex gap-2 items-center mb-1">
                                    <div>{order.userEmail}</div>
                                    <div className="text-gray-500 text-sm">{dbTime(order.createdAt)}</div>
                                </div>
                                <div className="text-gray-500 text-xs">
                                    {order.cartProducts.map(p => p.name).join(', ')}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 items-center whitespace-nowrap">
                            <Link className="button" href={'/orders/' + order._id}>Show Order</Link>
                        </div>
                    </div>
                ))}
                {orders?.length === 0 && (
                    <div className="text-center flex items-center gap-2 justify-center">
                        <span>No orders placed yet.</span>
                        <Link href={'/menu'} className="bg-primary justify-center uppercase flex items-center gap-2 text-white px-4 py-2 rounded-full">
                        Order now
                        <Right />
                    </Link>
                    </div>
                )}
            </div>
        </section>
    );
}