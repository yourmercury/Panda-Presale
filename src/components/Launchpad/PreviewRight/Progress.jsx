import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import {
    claim,
  dump,
  presaleMint,
  withdraw,
} from "../../../nft-contract/connectToContract"
import { isLiveStyle } from "../Pool"
import ProgressBar from "../ProgressBar"

export default function Progress({ details, reload, handler }) {
  const [minting, mint] = useState(false)
  const [fee, setFee] = useState("")
  const [{isLive, tint}, setLive] = useState(isLiveStyle(details));
  const { d, h, m, s } = useCountDown(
    details, setLive
  )

  function orderToast() {
    toast.promise(
      async () => {
        try {
            if(isLive != "live"){
                throw {
                    custom: `Presale is not Live`,
                  }
            }
          else if (fee < details.presale.fee)
            throw {
              custom: `contribution should be above ${details.presale.fee} ETHW`,
            }
          console.log("ran djndjnusd")
          await presaleMint(fee, details.contract)
        } catch (error) {
          throw error
        }
      },
      {
        pending: "Making Presale Order",
        success: {
          render() {
            reload()
            return `successful`
          },
        },
        error: {
          render({ data }) {
            if (data.custom) return data.custom
            return "Oops! Order failed."
          },
        },
      }
    )
  }

  function dumpToast() {
    toast.promise(
      async () => {
        try {
          if (details.userOrde < 1)
            throw {
              custom: `You made no contributions`,
            }
          await dump(details.contract)
        } catch (error) {
          throw error
        }
      },
      {
        pending: "Jumping ship",
        success: {
          render() {
            reload()
            return `successful`
          },
        },
        error: {
          render({ data }) {
            if (data.custom) return data.custom
            return "Oops! Dump failed."
          },
        },
      }
    )
  }
  function claimToast() {
    toast.promise(
      async () => {
        try {
          if (details.userOrder < 1)
            throw {
              custom: `You made no contributions`,
            }
          await claim(details.contract);
        } catch (error) {
          throw error
        }
      },
      {
        pending: isLive == "complete"? "Claiming NFT(s)": "Withdrawing funds",
        success: {
          render() {
            reload()
            return `successful`
          },
        },
        error: {
          render({ data }) {
            if (data.custom) return data.custom
            return "Oops! failed."
          },
        },
      }
    )
  }

  function withdrawToast() {
    toast.promise(
      async () => {
        try {
          if (details.presale.endAt * 1000 > Date.now())
            throw {
              custom: `Presale has not ended`,
            }
          else if (details.presale.start * 1000 > Date.now())
            throw {
              custom: `Presale has not ended`,
            }
          await withdraw(details.contract)
        } catch (error) {
          throw error
        }
      },
      {
        pending: "Withdrawing",
        success: {
          render() {
            reload()
            return `successful`
          },
        },
        error: {
          render({ data }) {
            if (data.custom) return data.custom
            return "Oops! Withdrawal failed."
          },
        },
      }
    )
  }

  let mint_label;

  switch(isLive) {
    case "live":
        mint_label = "Mint";
        break;
    case "pending": 
        mint_label = "Mint";
        break
    case "complete": 
        mint_label = "Claim NFT";
        break;
    case "cancelled":
        mint_label = "Withdraw Order";
        break;
  }

  console.log(mint_label)

  return (
    <>
      <div className="rounded-2xl border border-border-color py-[10px] px-[20px]">
        <div>
          {/* This is for the presale timer */}
          <h3 className="mb-[20px]">
            Presale {isLive == "pending" ? "live" : "ends"} in
          </h3>
          <div className="flex justify-between">
            <div className="flex flex-col items-center">
              <div className="h-[40px] w-[40px] bg-[grey] rounded-xl text-[white] flex justify-center items-center">
                {d}
              </div>
              <span>Days</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-[40px] w-[40px] bg-[grey] rounded-xl text-[white] flex justify-center items-center">
                {h}
              </div>
              <span>Hours</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-[40px] w-[40px] bg-[grey] rounded-xl text-[white] flex justify-center items-center">
                {m}
              </div>
              <span>Minutes</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-[40px] w-[40px] bg-[grey] rounded-xl text-[white] flex justify-center items-center">
                {s}
              </div>
              <span>Seconds</span>
            </div>
          </div>
        </div>

        <ProgressBar
          ordered={details.presaleCount}
          softCap={details.presale.softCap}
        />

        <div>
          {/* This is for the mint fee */}
          <p>Presale min mint Fee: {details.presale.fee} ETHW</p>
          {!handler && isLive=="live" && (
            <div className="rounded-xl bg-inp-grey flex p-1 py-[5px]">
              <input
                type="number"
                placeholder={`Min ${details.presale.fee} ETHW`}
                name=""
                id=""
                min={0}
                value={fee}
                onChange={(e) => {
                  let value = e.target.value
                  setFee(value)
                }}
                className="outline-none bg-[transparent] border-none p-0 m-0 w-full"
              />
            </div>
          )}
          {!handler && (
            <button
              className="bg-btn-green text-[white] rounded-xl w-full my-1 py-[5px]"
              onClick={() => {
                  if(details.endAt * 1000 < Date.now()){
                      claimToast();
                      return;
                  }
                orderToast()
              }}
            >
              {mint_label}
            </button>
          )}
          {handler && (
            <button
              className="bg-btn-green text-[white] rounded-xl w-full my-1 py-[5px]"
              onClick={() => {
                withdrawToast()
              }}
            >
              Withdraw
            </button>
          )}
          {!handler && isLive=="live" && (
            <button
              className="flex justify-center items-center w-full text-err-red"
              onClick={() => {
                dumpToast()
              }}
            >
              jump ship
            </button>
          )}
        </div>
      </div>
    </>
  )
}

function useCountDown(details, setLive) {
  const [obj, setObj] = useState({ d: 0, h: 0, m: 0, s: 0 })
  const [start, setStart] = useState(false)
  const [isLoaded, load] = useState(false)

  useEffect(() => {
    if (!isLoaded) {
      load(true)
      return
    }
    let interval = setInterval(() => {
        let {isLive, tint} = isLiveStyle(details)
        
        let time = isLive == "pending"
          ? details.presale.startAt
          : isLive == "live"
          ? details.presale.endAt
          : false
    
      if (details.presale.endAt < Date.now() / 1000) {
        setObj({ d: 0, h: 0, m: 0, s: 0 })
        clearInterval(interval)
        setLive({isLive, tint});
        return
      }

      let diff = Math.abs(Date.now() / 1000 - time)
      let d = Math.floor(diff / 60 / 60 / 24)
      let h = Math.floor(diff / 60 / 60)
      let m = Math.floor((diff / 60) % 60)
      let s = Math.floor(diff % 60)

      setObj({ d, h, m, s })
    }, 1000)

    return () => clearInterval(interval)
  }, [isLoaded])

  return { ...obj }
}
