import Head from 'next/head'
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const router = useRouter()
    useEffect(()=>{
        if(localStorage.Stock_Nimbus_Token){
            router.push('http://localhost:3000/dashboard')
        }
    })
    
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = { password, email }

        let res = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        let response = await res.json()

        if (response.success) {
            console.log(response.token)
            localStorage.Stock_Nimbus_Token = response.token
            toast.success('Logged in Successfully!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

            setTimeout(() => {
                router.push('http://localhost:3000/dashboard')
            }, 1000)
        }
        else {
            toast.error(response.error, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }


        setPassword('')
        setEmail('')
    }

    const handleChange = (e) => {
        if (e.target.name == 'password') {
            setPassword(e.target.value)
        }
        else if (e.target.name == 'email') {
            setEmail(e.target.value)
        }
    }

    return (
        <div className='mx-auto my-auto'>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <Head>
                <title>Stock Nimbus - Your dashboard to watch over your portfolio!</title>
                <meta name="description" content="Stock Nimbus helps you to track all your investments in Stocks and Cryptos. Get notified when its time!" />
            </Head>
            <h1>Login to Stock Nimbus</h1>
            <p className="mb-6">or <Link href='/register' className='text-blue-700'>Sign Up</Link></p>

            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" id="email" onChange={handleChange} name="email" value={email} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@example.com" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input type="password" id="password" onChange={handleChange} name="password" value={password} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
            </form>

        </div>
    )
}

export default Login