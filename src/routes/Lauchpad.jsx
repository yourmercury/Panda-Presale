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

export default function Launchpad() {
  const [isLoaded, load] = useState(false)
  const [details, setDetails] = useState(null)
  const [isError, setIsError] = useState(false)
  const { contract } = useParams()
  console.log(contract)

  async function loadPresale() {
    try {
    //   let isAddress = ethers.utils.isAddress(contract)
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
    // loadPresale()
  }, [isLoaded])
  return (
    <div className={styles.container}>
      {isLoaded && !details && <div>Loading...</div>}
      {isLoaded && details && (
        <LaunchpadPreview details={details} reload={loadPresale} />
      )}
      {isLoaded && isError && <div>Not Found...</div>}
    </div>
  )
}

//https://bafybeic2ktd23y2negt3emih763hqxcfaq5ivpmqnwlnzfmxlkr2xylrfi.ipfs.nftstorage.link/

//0x3D8b9EF94a77696623316C6eCDD2B755f2436252

//0xc705e11F971EdAdF4D2Abe89CA74907d68dc50F6
