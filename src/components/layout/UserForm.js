"use client";
import { useState } from "react";
import Image from "next/image";
import { useProfile } from "@/components/UseProfile";
import AddressInputs from "./AddressInputs";

export default function UserForm({ user, onSave }) {
    const [userName, setUserName] = useState(user?.name || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [address, setAddress] = useState(user?.address || '');
    const [postalCode, setPostalCode] = useState(user?.postalCode || '');
    const [city, setCity] = useState(user?.city || '');
    const [state, setState] = useState(user?.state || '');
    const [country, setCountry] = useState(user?.country || '');
    const [admin, setAdmin] = useState(user?.admin || false);
    const { data:loggedInUserData } = useProfile();

    function handleAddressChange(propName, val) {
        if(propName === 'phone') setPhone(val)
        if(propName === 'address') setAddress(val)
        if(propName === 'postalCode') setPostalCode(val)
        if(propName === 'city') setCity(val)
        if(propName === 'state') setState(val)
        if(propName === 'country') setCountry(val)
    }

    return (
        <div className="md:flex gap-4">
            <div>
                <div className="p-2 rounded-lg">
                    {user.image ? (<Image className="rounded-lg w-full h-full mb-1" src={user.image} width={250} height={250} alt="user-image" />) : (<Image className="rounded-lg border border-gray-300 mb-1" src={'/user.svg'} width={80} height={80} alt="user-image" />)}
                </div>
            </div>
            <form className="grow"
                onSubmit={ev => onSave(ev, {
                    name: userName, phone, address, postalCode, city, state, country, admin
                })}>
                <label>Username</label>
                <input type="text" placeholder="First and Last Name" value={userName} onChange={ev => setUserName(ev.target.value)} />
                <label>Email</label>
                <input type="email" value={user.email} disabled={true} />
                <AddressInputs addressProps={{phone, address, postalCode, city, state, country}} setAddressProp={handleAddressChange} />
                {loggedInUserData.admin && (
                    <div>
                        <label htmlFor="adminCb" className="p-2 inline-flex items-center gap-2 mb-2">
                            <input id="admin" type="checkbox" value={'1'} checked={admin} onChange={ev => setAdmin(ev.target.checked)} />
                            <span>Admin</span>
                        </label>
                    </div>
                )}
                <button type="submit">
                    Save
                </button>
            </form>
        </div>
    );
}