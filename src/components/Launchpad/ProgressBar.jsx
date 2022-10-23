import React from "react"

export default function ProgressBar({ softCap, ordered }) {
  let perc = Math.floor((ordered / softCap) * 100);

  return (
    <div className="my-[10px]">
      {/* This is the progress bar */}
      <div className="flex justify-between">
        <p>Progress</p>

        <p>{perc}%</p>
      </div>
      <div className="h-[7px] w-full bg-[grey] relative rounded-xl">
        <div className={`h-[100%] bg-btn-green rounded-xl`}
            style={{
                width: perc <= 100 ? perc+"%": "100%"
            }}
        ></div>
      </div>
      <div className="flex justify-between">
        <p>{ordered} Tokens</p>

        <p>{softCap} Tokens</p>
      </div>
    </div>
  )
}
