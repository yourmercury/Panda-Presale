import React from "react";
import PreviewLeft from "./PreviewLeft";
import PreviewRight from "./PreviewRight";

export default function LaunchpadPreview({details, reload, handler}){
    return (
        <div className='w-full'>
            <div className="h-[50px] border border-border-color w-[100%] rounded-2xl"></div>
            <div className="flex my-1 justify-between">
                <div className="w-[65%]">
                    <PreviewLeft details={details}/>
                </div>
                <div className="w-[33%]">
                    <PreviewRight details={details} reload={reload} handler={handler}/>
                </div>
            </div>
            
        </div>
    )
}