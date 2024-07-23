import React from 'react'
import { ExtendedResponse } from '../external/Response';
import StockCard from './StockCard';

const StocksPage = async () => {
    let data = []
    try {
        const response = await fetch('http://localhost:3000/api/stocks');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log("api success")
         data = await response.json();
      } catch (error) {
        console.error('Failed to fetch data:', error);
        // Provide fallback data or handle the error
      }
    return (
        <div className='w-[80%] ml-auto mr-auto mt-4 bg-[#293143] rounded-md'>
            {/* <div className='bg-gray-900 flex justify-center items-center min-h-screen'> */}
            <h1 className='mb-10 p-5'>
                Stocks
            </h1>

            <div className='grid grid-cols-2 gap-2'>
                {/* <div className='flex space-x-4'> */}
                {data.length == 0 ?
                    <p className='m-4 text-yellow-200'>No Stock data Available in database</p>
                    : data.map((stock: any) => <StockCard stock={stock} key={stock._id} />)}

            </div>
        </div>
    )
}

export default StocksPage