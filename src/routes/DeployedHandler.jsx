import { ethers } from "ethers"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import LaunchpadPreview from "../components/Launchpad/Preview"
import { getMyContract } from "../firebase"
import {
  getPresaleDetails,
  whitelistWallet,
} from "../nft-contract/connectToContract"
import styles from "./css/create-drop.module.css"

export default function DeployedHandler() {
  const [isLoaded, load] = useState(false)
  const [details, setDetails] = useState(null)
  const [isError, setIsError] = useState(false)
  const { contract } = useParams()
  console.log(contract)

  async function loadPresale() {
    try {
        let details = await getPresaleDetails(contract)
        let description = (await getMyContract(contract))[0].description;
        console.log(details)
        setDetails({...details, description});
    } catch (error) {
      console.log(error)
      setIsError(true)
    }
  }

  function loadWithToast(){
    toast.promise(
        loadPresale,
        {
          pending: "Loading Contract",
          success: {
            render() {
              return `Loaded`
            },
          },
          error: {
            render() {
              return "Oops! Something went wrong"
            },
          },
        }
      )
  }

  useEffect(() => {
    if (!isLoaded) {
      load(true)
      return
    }

    loadWithToast();
  }, [isLoaded])
  return (
    <div className={styles.container}>
      {isLoaded && !details && <div>Loading...</div>}
      {isLoaded && details && (
        <LaunchpadPreview details={details} reload={loadPresale} handler/>
      )}
      {isLoaded && isError && <div>Not Found...</div>}
    </div>
  )
}
