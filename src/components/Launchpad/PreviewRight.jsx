import React from "react"
import PresaleTokenomics from "./PreviewRight/PresaleTokenomics"
import Progress from "./PreviewRight/Progress"

export default function PreviewRight({details, reload, handler}) {
  return (
    <>
        <Progress details={details} reload={reload} handler={handler}/>
        <PresaleTokenomics details={details}/>
    </>
  )
}
