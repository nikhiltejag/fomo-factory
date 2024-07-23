import Image from 'next/image';
import React from 'react'

const StockCard = (props: any) => {
    const { stock } = props;
    return (
        // <div key={stock._id} className=' rounded-sm bg-gray-800 p-2 m-4'>
        //     <Image src={stock.webp128} alt={stock.name+' image'} width={20} height={20}/>
        //     {stock.name}
        // </div>

        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-100 flex flex-row">
            {/* <div > */}
                <Image src={stock.webp64} alt={stock.name} width={100} height={100} className="w-[20%] h-[60%] mr-3" />

            {/* </div> */}
            <div className='w-[100%]'>
                <h2 className="text-2xl font-semibold">{stock.name}</h2>

                <div className="flex items-center mb-4 justify-between">
                    <div className="mb-2">
                        <span className="text-gray-400">24H VOLUME</span>
                        <p className="text-xl">${stock.volume}</p>
                    </div>
                    <div className="mb-2">
                        <span className="text-gray-400">LIQUIDITY ±2%</span>
                        <p className="text-xl">{stock.volume}</p>
                    </div>
                    <div className="mb-2">
                        <span className="text-gray-400">VOL SHARE</span>
                        <p className="text-xl">13.34%</p>
                    </div>
                </div>


                <div className='flex items-center mb-4 justify-between'>
                    <div className="mb-2">
                        <span className="text-gray-400">MARKETS</span>
                        <p className="text-xl">${stock.markets}</p>
                    </div>
                    <div className="mb-2">
                        <span className="text-gray-400">BIDS -2%</span>
                        <p className="text-xl">${parseInt(stock.bidTotal).toFixed(2)}</p>
                    </div>
                    <div>
                        <span className="text-gray-400">ASKS +2%</span>
                        <p className="text-xl">${parseInt(stock.askTotal).toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StockCard