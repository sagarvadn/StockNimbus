import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function search() {
    const [query, setQuery] = useState('')
    const [stock, setStock] = useState([])

    const getData = async () => {

        let res = await fetch('http://localhost:3000/api/searchStock', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "stock": query })
        })
        const data = await res.json()

        setStock(data.stocks)
    }
    useEffect(() => {
        if (query.length > 2) {
            getData()
        }
    }, [query])

// Lama Dev
    return (
        <div>
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-4xl dark:text-white text-center">Search Stocks</h1>
            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Find your favourite stocks from around the world!</p>

            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input type="search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Stocks, Cryptos..." onChange={(e) => setQuery(e.target.value)} required />

            </div>
            
            { stock && query.length > 2 &&
                <ul className='bg-white border border-gray-100 w-full mt-2'>
                    {stock.map(result => (
                        <Link href={result["Symbol"]} key={result["Symbol"]}>
                        <li className="pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-gray-50 hover:text-gray-900">
                            <svg className="absolute w-4 h-4 left-2 top-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            {result["Symbol"]} - {result["Name"]}</li></Link>
                    ))}
                </ul>
            }
            { !stock && 
                <div className="container">
                <p className="my-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 text-center">Stocks Not Found</p>
                </div>
            }
        </div>
    )
}

export default search
