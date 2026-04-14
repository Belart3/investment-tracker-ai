import React from 'react'
import { FaSpinner } from 'react-icons/fa'

type Props = {}

const LoadState = (props: Props) => {
    return (
        <FaSpinner className="animate-spin duration-500 mx-auto text-[#28C76F]" size={32} />
    )
}

export default LoadState