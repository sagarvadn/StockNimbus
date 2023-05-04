import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';

function dashboard() {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if(!localStorage.Stock_Nimbus_Token){
            router.push('http://localhost:3000/login')
        }

        setLoading(true)
        fetch('http://localhost:3000/api/getStock?stock=SBIN.NS')
          .then((res) => res.json())
          .then((data) => {
            setData(data)
            setLoading(false)
          })
      }, [])
    
      if (isLoading) return <p>Loading...</p>
      if (!data) return <p>No profile data</p>
    
    return (
        <div>

            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>




            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Stock Name: {data.name}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Price: {data.price}</p>
                <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                </a>
            </div>


        </div>
    )
}

export default dashboard
