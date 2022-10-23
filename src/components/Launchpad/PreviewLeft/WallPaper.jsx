import React, { useEffect, useState } from "react";
import axios from "axios";

export default function WallPaper({details}){
    const [isLoaded, load] = useState(false);
    const [images, setImgages] = useState(null);
    const cap = details.presale.softCap > 5 ? 5 : details.presale.softCap

    // console.log(`${details.baseUri}${1}`)
    useEffect(()=>{
        if(!isLoaded){
            load(true);
            return;
        }
        
        getMetadata(cap, details.baseUri)
        .then(data=>{
            setImgages(data);
        })
        .catch((error)=>{
            console.log(error);
        })
    }, [isLoaded])
    return (
        <div className="flex justify-center items-center h-[200px] relative overflow-hidden">
            {images && images.map((source, index)=> (
                <img className="h-full grow-1" src={source} alt="" key={index}/>
            ))}
        </div>
    )
}

async function getMetadata(cap, uri){
    try {
        let arr = []
        for(let i=0; i < cap; i++){
            let pay;
            try {
                pay = await axios.get(`${uri}${i+1}`);
            } catch (error) {
                continue;
            }
            let meta = pay.data;
            arr.push(meta.image);
        }
        return arr;
    } catch (error) {
        console.log(error);
    }
}