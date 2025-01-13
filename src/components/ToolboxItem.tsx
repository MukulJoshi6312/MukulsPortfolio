import React, { Fragment } from 'react'
import TechIcon from "@/components/TechIcon";
import { twMerge } from 'tailwind-merge';

type ToolboxItemProps = {
    title: string;
    iconType: React.ElementType;
};

const ToolboxItem = ({items,className,itemsWrapperdClassName}:{
    items:{
        [x: string]: any;
        title:string;
        iconType:React.ElementType;
    }[],
    className?:string,
    itemsWrapperdClassName?:string
}) => {
    return (
        <div className={twMerge("flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",className)}>
            <div className={twMerge('flex flex-none py-0.5 gap-6 pr-6',itemsWrapperdClassName)}> 
            
            {[...new Array(2)].fill(0).map((_,idx)=>(
                <Fragment key={idx}>
                     {
            items.map((item: ToolboxItemProps) => (
                <div key={item.title} className="inline-flex items-center gap-4 py-2 px-3 outline outline-2 outline-white/10 rounded-lg ">
                <TechIcon component={item.iconType} />
                <span className="font-semibold">{item.title}</span>
                {/* <span>{item.iconType}</span> */}
                </div>
            ))
            }
                </Fragment>
            ))}
            </div>
        </div>
    )
}

export default ToolboxItem
