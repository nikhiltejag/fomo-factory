import Image from 'next/image'
import React from 'react'

const StockCard = async () => {
    const res = await fetch("http://localhost:3000/api/stocks");
    const data = await res.json();
    return (
        <h1> Stcoks</h1>
    )
}

export default StockCard