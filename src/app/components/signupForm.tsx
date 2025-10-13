import React from 'react'
import { FaGoogle } from 'react-icons/fa'

type Props = {}

const signupForm = (props: Props) => {
    return (
        <div className='flex flex-col gap-4 bg-[#0D1117] p-5 rounded-md border border-[#374151] w-[400px] h-[500px]'>
            <h1 className="text-white capitalize font-semibold text-center text-[37px] tracking-[-2.2px]">sign up</h1>
            <div className="flex gap-3 w-full">
                <button className='border border-[#374151] flex-1 rounded-md flex items-center justify-center h-10 text-white hover:bg-[#374151] transition cursor-pointer'>
                    <FaGoogle />
                </button>
                <button className='border border-[#374151] flex-1 rounded-md flex items-center justify-center h-10 text-white hover:bg-[#374151] transition cursor-pointer'>
                    <FaGoogle />
                </button>
            </div>
        </div>
    )
}

export default signupForm