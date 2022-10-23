import React, { useEffect, useState } from "react";
import styles from "./css/create-drop.module.css";
import Pool from "../components/Launchpad/Pool";
import { getPresaleDetails } from "../nft-contract/connectToContract";
import { getContracts } from "../firebase";
import { toast } from "react-toastify";

export default function Pools() {
  const [isLoaded, load] = useState(false);
  const [details, setDetails] = useState([]);
  const [contracts, setContracts] = useState([]);

  async function resloveContracts() {
    try {
      let contracts = await getContracts();
      let arr = [];
    setContracts(contracts);
    } catch (error) {
      console.log(error)
    }
  }

  function resloverToast(){
    toast.promise(
        resloveContracts,
        {
          pending: "Loading Pool",
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
      load(true);
      return
    }

    resloverToast();
  }, [isLoaded])

  return (
    <div className={"grid grid-cols-4 gap-4"}>
      {contracts.length > 0 ? (
        contracts.map((contract, index) => <Pool contract={contract} key={index} />)
      ) : (
        <p>No Presale</p>
      )}
    </div>
  )
}

// getPresaleDetails("0xf87A33922bAE785b3CA07E8792C581056d6bbD2C")
// getPresaleDetails("0x15CA91C1D9E46Ab3938eBAD9E5C1F7f0c9d710Bb")
// getPresaleDetails("0x3D8b9EF94a77696623316C6eCDD2B755f2436252")
// getPresaleDetails("0x3D8b9EF94a77696623316C6eCDD2B755f2436252")
// getPresaleDetails("0x7b64542C50a29869245998819F5256E7B7DDf71A")
