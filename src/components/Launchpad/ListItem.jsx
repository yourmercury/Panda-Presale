import React from "react"

export default function ListItem({left, right, noBorder}){
    return (
        <div className={`flex justify-between items-center p-1 ${noBorder? "":"border-b"} border-border-color`}>
            <div className="">{left}</div>
            <div className="">{right}</div>
        </div>
    )
}
