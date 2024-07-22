import Image from 'next/image'
import React from 'react'
import { ExtendedResponse } from '../external/Response';
import StockCard from './StockCard';

const StocksPage = async () => {
    const res = await fetch("http://localhost:3000/api/stocks", { cache: "no-cache" });
    const data: ExtendedResponse[] = await res.json();
    return (
        <div className='w-[80%] ml-auto mr-auto mt-4 bg-[#293143] rounded-md'>
        {/* <div className='bg-gray-900 flex justify-center items-center min-h-screen'> */}
            <h1 className='mb-10 p-5'>
                Stocks
            </h1>

            <div className='grid grid-cols-2 gap-2'>
            {/* <div className='flex space-x-4'> */}
                {data.map(stock => <StockCard stock={stock} key={stock._id} />)}

            </div>
        </div>
    )
}

export default StocksPage