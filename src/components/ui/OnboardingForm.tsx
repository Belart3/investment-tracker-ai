'use client'
import React from 'react'
import { useState } from 'react'

type Props = {}

const OnboardingForm = (props: Props) => {
    const [formData, setFormData] = useState({
        exchangeName: '',
        apiKey: '',
        apiSecret: '',
    });
    return (
        <form className='flex flex-col space-y-2 border border-white p-6 rounded-0-md bg-gray-800'>
            <div className='flex flex-col space-y-1'>
                <label htmlFor="exchangeName" className='text-white capitalize'>exchange name</label>
                <input id="exchangeName" name="exchangeName" className='border border-white bg-white' placeholder="Exchange Name (e.g. bybit)" required />
            </div>
            <div className='flex flex-col space-y-1'>
                <label htmlFor="apiKey" className='text-white capitalize'>api key</label>
                <input id="apiKey" name="apiKey" className='border border-white bg-white' placeholder="Input API Key from your exchange" required />
            </div>
            <div className='flex flex-col space-y-1'>
                <label htmlFor="apiSecret" className='text-white capitalize'>api secret</label>
                <input id="apiSecret" name="apiSecret" className='border border-white bg-white' placeholder="Input API secret from your exchange" required />
            </div>
            <button type="submit" className='bg-white py-2 cursor-pointer capitalize'>submit</button>
        </form>
    )
}

export default OnboardingForm