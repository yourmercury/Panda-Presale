import React from "react";
import ListItem from "../ListItem";

export default function Tokenomics({details}){
    return (
        <div className="rounded-2xl border border-border-color my-1 relative">
            <ListItem left="NFT Contract" right={details.contract}/>
            <ListItem left="Token Name" right={details.name}/>
            <ListItem left="Token Symbol" right={details.symbol}/>
            <ListItem left="Max Supply" right={details.maxSupply}/>
            <ListItem left="Total Supply" right={details.totalSupply} noBorder/>
        </div>
    )
}