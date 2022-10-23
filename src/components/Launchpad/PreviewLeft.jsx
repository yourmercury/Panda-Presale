import React from "react";
import PresaleDescription from "./PreviewLeft/PresaleDescription";
import Tokenomics from "./PreviewLeft/Tokenomics";
import WallPaper from "./PreviewLeft/WallPaper";

export default function PreviewLeft({details}){
    return (
        <>
            <div className="rounded-2xl border border-border-color">
                <WallPaper details={details}/>
            </div>
            <div className="relative top-[-80px]">
                <PresaleDescription details={details}/>
                <Tokenomics details={details}/>
            </div>
        </>
        
    )
}