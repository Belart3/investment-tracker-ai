import React from 'react'
import { FaGoogle } from 'react-icons/fa'

type Props = {}

const signupForm = (props: Props) => {
    return (
        <div className='flex flex-col gap-4 bg-[#0D1117] p-10 rounded-md border border-[#374151] w-[600px] h-fit'>
            <h1 className="text-white capitalize font-semibold text-center text-[37px] tracking-[-2.2px]">sign up</h1>
            <form action="" className='flex flex-col gap-4'>
                <div className="flex gap-3 w-full">
                    <button className='border border-[#374151] flex-1 rounded-md flex items-center justify-center h-10 text-white hover:bg-[#374151] transition cursor-pointer'>
                        <FaGoogle />
                    </button>
                    <button className='border border-[#374151] flex-1 rounded-md flex items-center justify-center h-10 text-white hover:bg-[#374151] transition cursor-pointer'>
                        <FaGoogle />
                    </button>
                </div>
                <input type="text" className='rounded-[8px] px-4 border border-[#374151] w-full text-white text-[14px]/[21px] font-normal tracking-[-0.56px] h-14 flex items-center' placeholder='Full name' required />
                <input type="email" className='rounded-[8px] px-4 border border-[#374151] w-full text-white text-[14px]/[21px] font-normal tracking-[-0.56px] h-14 flex items-center' placeholder='Email Address' required />
                <input type="password" className='rounded-[8px] px-4 border border-[#374151] w-full text-white text-[14px]/[21px] font-normal tracking-[-0.56px] h-14 flex items-center' placeholder='Password' required minLength={8} />
                <input type="password" className='rounded-[8px] px-4 border border-[#374151] w-full text-white text-[14px]/[21px] font-normal tracking-[-0.56px] h-14 flex items-center' placeholder='Confirm Password' required minLength={8} />
                <button type="submit" className='capitalize w-full rounded-[16px] bg-[#28C76F] px-6 h-14 text-white text-[16px]/[16px] font-medium tracking-[-0.64px] cursor-pointer'>sign up</button>
            </form>
        </div>
    )
}

export default signupForm