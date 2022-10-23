import React, { useEffect, useState } from "react"
import { Link, useNavigation } from "react-router-dom"
import { getPresaleDetails } from "../../nft-contract/connectToContract"
import ProgressBar from "./ProgressBar"

export default function Pool({ contract, handler }) {
    const [details, setDetails] = useState(null);
    const [isLoaded, load] = useState(false);
    let { isLive, tint } = isLiveStyle(details);

  useEffect(()=>{
    if(!isLoaded) {
        load(true);
        return;
    }

    getPresaleDetails(contract.address)
    .then((detail)=>{
        setDetails(detail);
    })
    .catch((error)=>{
        console.log(error);
    })

  }, [isLoaded])
  return (
    <div className="border border-border-color rounded-xl p-2">
      {details && <div>
      <div>
        <p className={`text-sm m-0 text-${tint}`}>{isLive}</p>
      </div>
      <div className="my-2">
        <h3 className="text-xl m-0">
          {details.name} ({details.symbol})
        </h3>
        <p className="text-sm m-0">presale</p>
      </div>
      <p>Soft cap: {details.presale.softCap}</p>
      <ProgressBar
        softCap={details.presale.softCap}
        ordered={details.presaleCount}
      />
      <div className="flex justify-between">
        <span>fee: {details.presale.fee}ETHW</span>
        <Link to={`/${handler? "deployed":"launchpad"}/${details.contract}`}>
          <button className="bg-btn-green text-[white] px-1 rounded">
            {handler? "Handle":"View"}
          </button>
        </Link>
      </div>
      </div>}
    </div>
  )
}

export function isLiveStyle(details) {
    if(!details) return {isLive: null, tint: null}
  let isLive = details.presale.startAt * 1000 > Date.now() ? "pending" : false

  isLive =
    isLive == false && details.presale.endAt * 1000 > Date.now()
      ? "live"
      : isLive

  //   console.log(isLive)
  isLive =
    isLive == false && details.presale.endAt * 1000 < Date.now()
      ? false
      : isLive

  isLive =
    isLive == false && details.presaleCount >= details.presale.softCap
      ? "complete"
      : isLive

  isLive =
    isLive == false && details.presaleCount < details.presale.softCap
      ? "cancelled"
      : isLive

  let tint = ""

  if (isLive == "complete") tint = "btn-green"
  if (isLive == "failed") tint = "err-red"
  if (isLive == "pending") tint = "orange"

  return { isLive, tint }
}
