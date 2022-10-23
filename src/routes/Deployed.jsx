import React, { useEffect, useState } from "react";
import styles from "./css/create-drop.module.css";
import Pool from "../components/Launchpad/Pool";
import { getAddress, getPresaleDetails } from "../nft-contract/connectToContract";
import { getMyContracts } from "../firebase";
import { toast } from "react-toastify";

export default function Deployed() {
  const [isLoaded, load] = useState(false);
  const [details, setDetails] = useState([]);

  async function resloveContracts() {
    try {
        let addr = await getAddress()
      let contracts = await getMyContracts(addr);
      let arr = []
      for (let i = 0; i < contracts.length; i++) {
        try {
          let detail = await getPresaleDetails(contracts[i].address);
          arr.push(detail)
        } catch {
          continue
        }
      }

      setDetails([...arr]);
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
      {details.length > 0 ? (
        details.map((detail, index) => <Pool details={detail} key={index} handler />)
      ) : (
        <p></p>
      )}
    </div>
  )
}