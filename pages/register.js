import Head from 'next/head'
import Link from 'next/link';
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
const [name, setName] = useState('')
const [password, setPassword] = useState('')
const [email, setEmail] = useState('')

const handleSubmit = async (e)=>{
    e.preventDefault()
    const data = {name, password, email}

    let res = await fetch('http://localhost:3000/api/signup',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    let response = await res.json()

    toast.info('Created your account!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });

    setName('')
    setPassword('')
    setEmail('')
}

const handleChange = (e)=>{
    if(e.target.name == 'name'){
        setName(e.target.value)
    }
    else if(e.target.name == 'password'){
        setPassword(e.target.value)
    }
    else if(e.target.name == 'email'){
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
      <h1>Register Yourself Stock Nimbus</h1>
      <p className="mb-6">or <Link href='/login' className='text-blue-700'>Login</Link></p>

<form onSubmit={handleSubmit}>
  <div className="mb-6">
    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
    <input type="text" id="name" onChange={handleChange} name="name" value={name} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter your name" required />
  </div>
  <div className="mb-6">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input type="email" id="email" onChange={handleChange} name="email" value={email} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@example.com" required />
  </div>
  <div className="mb-6">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input type="password" id="password" onChange={handleChange} name="password" value={password} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
  </div>
  <div className="flex items-start mb-6">
    <div className="flex items-center h-5">
      <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
    </div>
    <label htmlFor="terms" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
  </div>
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
</form>

    </div>
  )
}

export default Signup