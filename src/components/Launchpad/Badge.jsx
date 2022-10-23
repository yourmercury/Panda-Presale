import React from "react"

export default function Badge({ danger, children }) {
//   let color = danger ? "red-400" : "lime-300"
  let color = danger ? "red-600" : "lime-600";

  return (
    <div
      className={`px-1 bg-${color+"/[.06]"} text-${color} rounded-xl`}
    >
        {children}
    </div>
  )
}
