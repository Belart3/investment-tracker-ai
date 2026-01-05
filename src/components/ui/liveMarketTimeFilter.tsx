import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Clock } from 'lucide-react';

type Props = {
    setTimeFilter: (value: string) => void;
    timefilter?: string;
    lastUpdated?: string;
}

const liveMarketTimeFilter = (props: Props) => {
    const formatedLastUpdated = props.lastUpdated ? new Date(props.lastUpdated).toLocaleString() : '';
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div className="flex rounded-[8px] bg-[#161B22] border border-[#374151]">
                    <Select value={props.timefilter} onValueChange={(value) => {
                        props.setTimeFilter(value);
                    }}>
                        <SelectTrigger className="w-[180px] text-[#6B7280] border-none !px-1 md:p-1.5 !gap-1 lg:gap-2">
                            <Clock className='w-4 h-4! text-[#6B7280]' />
                            <SelectValue className='rouned-[4px] text-[12px]/[18px] tracking-[-0.48px] !text-[#6B7280] cursor-pointer' />
                        </SelectTrigger>
                        <SelectContent className='z-[99999]'>
                            <SelectGroup>
                                <SelectItem defaultChecked className='p-1.5 rouned-[4px] text-[12px]/[18px] tracking-[-0.48px] text-[#6B7280] cursor-pointer' value="1h">1h</SelectItem>
                                <SelectItem className='p-1.5 rouned-[4px] text-[12px]/[18px] tracking-[-0.48px] text-[#6B7280] cursor-pointer' value="24h">24h</SelectItem>
                                <SelectItem className='p-1.5 rouned-[4px] text-[12px]/[18px] tracking-[-0.48px] text-[#6B7280] cursor-pointer' value="7d">7d</SelectItem>
                                <SelectItem className='p-1.5 rouned-[4px] text-[12px]/[18px] tracking-[-0.48px] text-[#6B7280] cursor-pointer' value="30d">30d</SelectItem>
                                <SelectItem className='p-1.5 rouned-[4px] text-[12px]/[18px] tracking-[-0.48px] text-[#6B7280] cursor-pointer' value="60d">60d</SelectItem>
                                <SelectItem className='p-1.5 rouned-[4px] text-[12px]/[18px] tracking-[-0.48px] text-[#6B7280] cursor-pointer' value="90d">90d</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </TooltipTrigger>
            <TooltipContent>
                <p className="text-[12px]/[18px] tracking-[-0.48px] text-[#6B7280] capitalize">live data - updated {formatedLastUpdated}</p>
            </TooltipContent>
        </Tooltip>
    )
}

export default liveMarketTimeFilter
