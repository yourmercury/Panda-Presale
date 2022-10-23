import React from "react";
import Badge from "../Badge";
import ListItem from "../ListItem";
import { isLiveStyle } from "../Pool";

export default function PresaleTokenomics({details}){
    const {isLive, tint} = isLiveStyle(details)
    return (
        <div className="rounded-2xl border border-border-color my-1">
            <ListItem left={"Status"} right={<p className={`text-${tint}`}>{isLive}</p>}/>
            <ListItem left={"Mint min Price"} right={`${details.presale.fee} ETHW`}/>
            <ListItem left={"My Order"} right={`${details.paidByUser} ETH = ${details.userOrder} NFTs`}/>
            <ListItem left={"Soft Cap"} right={details.presale.softCap}/>
            {/* <ListItem left={"Unique Orders"} right={details.presaleCount} noBorder/> */}
        </div>
    )
}