"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {signIn} from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginInProgess, setLoginInProgress] = useState(false);
    
    async function handleFormSubmit(ev) {
        ev.preventDefault();
        setLoginInProgress(true);

        try {
            const res = await signIn('credentials', {redirect: false, email, password});
            if(res?.ok){
                router.push('/')
            }

            if(res?.error){
                toast.error(res.error);
            }
        } catch (error) {
            console.log('Error: ', error);
            setLoginInProgress(false);
        } finally {
            setLoginInProgress(false);
        }
    }
    return (
        <section className="mt-8">
             <h1 className="text-center text-primary text-4xl mb-4">Login</h1>
             <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
             <input type="email" name="email" placeholder="Email" value={email} disabled={loginInProgess} onChange={ev => setEmail(ev.target.value)} />
                <input type="password" name="password" placeholder="Password" value={password} disabled={loginInProgess} onChange={ev => setPassword(ev.target.value)} />
                <button disabled={loginInProgess} type="submit">Login</button>
                <div className="my-4 text-center text-gray-500">or login with provider</div>
                <button type="button" className="flex gap-4 justify-center" onClick={()=> signIn('google', {callbackUrl:'/'})}>
                    <Image src={'/google.png'} alt="Google-logo" width={24} height={24} />
                    Login with Google
                </button>
                <div className="text-center my-4 text-gray-500 border-t pt-4">
                    New user? <Link className="underline" href={'/register'} >Register here &raquo;</Link>
                </div>
             </form>
        </section>
    );
}