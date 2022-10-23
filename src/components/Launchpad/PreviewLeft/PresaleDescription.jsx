import React from "react"

export default function PresaleDescription({details}) {
  return (
    <div className="w-[90%] mx-auto border border-border-color rounded-xl p-1 bg-[white]">
      <h1 className="font-bold mb-2">{details.name} Presale</h1>
      <div className="flex"></div>

      <div>
        {details.description}
      </div>
    </div>
  )
}
