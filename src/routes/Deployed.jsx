import React, { useEffect, useState } from "react";
import styles from "./css/create-drop.module.css";
import Pool from "../components/Launchpad/Pool";
import { getAddress, getPresaleDetails } from "../nft-contract/connectToContract";
import { getMyContracts } from "../firebase";
import { toast } from "react-toastify";

export default function Deployed() {
    const [isLoaded, load] = useState(false);
    const [details, setDetails] = useState([]);
    const [contracts, setContracts] = useState([]);
  
    async function resloveContracts() {
      try {
        let contracts = await getMyContracts(await getAddress());
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
        contracts.map((contract, index) => <Pool contract={contract} key={index} handler />)
      ) : (
        <p></p>
      )}
    </div>
  )
}