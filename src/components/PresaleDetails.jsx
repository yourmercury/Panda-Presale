import React, { useCallback } from "react"
import { useState } from "react"

import styles from "./css/drop-details.module.css"
import InputShell, { SelectOption, TextArea, TextInput } from "./Inputs/inputShell"

function PresaleDetails({ dropInput, setDropInput, onCreateDrop, formErrors }) {
  const [focused, setFocused] = useState({})

  const handleMetadataSelected = useCallback(
    ({ target }) => {
      const filereader = new FileReader()
      filereader.readAsText(target.files[0], "UTF-8")
      filereader.onload = ({ target }) => {
        setDropInput({
          ...dropInput,
          metadata: JSON.parse(target.result),
        })
      }
    },
    [dropInput, setDropInput]
  )

  return (
    <div className={styles.container}>
      <div className={styles.border}>
        <InputShell label={"NFT Address"} required>
          <TextInput placeholder={"contract address"} />
        </InputShell>

        <div className="flex justify-between">
          {/* First Column */}
          <div className="flex-1">
            <InputShell label={"Mint Price"} required>
              <TextInput placeholder={"Mint price in ETH"} type={"number"} />
            </InputShell>

            <InputShell label={"Burn/Refund"} required outline>
              <SelectOption options={["burn", "refund"]}/>
            </InputShell>

            <InputShell label={"Funding Token"} required>
            <SelectOption options={["BUSD","ETH","USTD","BNB"]}/>
            </InputShell>
          </div>

          <div className="w-5"></div>

          {/* Second Column */}
          <div className="flex-1">
            <InputShell label={"Max Per Wallet"} required outline>
              <SelectOption options={[1,5,10]}/>
            </InputShell>

            <InputShell label={"Free/Public/Whitelist"} required outline>
            <SelectOption options={["Free","Public","Whitelist"]}/>
            </InputShell>

            <InputShell label={"List On"} required outline>
            <SelectOption options={["Opensea","Gamma","Solsea"]}/>
            </InputShell>
          </div>
        </div>

        <div className="my-2">
          <InputShell label={"Collection Description"} required>
            <TextArea placeholder={"Type Here..."}/>
          </InputShell>
        </div>

        <div className="flex justify-between">
          {/* First Column */}
          <div className="flex-1">
          <InputShell label={"Start Time"} required outline>
              <TextInput placeholder={"contract address"} type="date" />
            </InputShell>

            <InputShell label={"Twitter"} required outline>
              <TextInput placeholder={"@username"} />
            </InputShell>

            <InputShell label={"Platform Fee Type"} required outline>
            <SelectOption options={["2% From Raised Funds", "1% + 1% Of NFTs"]}/>
            </InputShell>
          </div>

          <div className="w-5"></div>

          {/* Second Column */}
          <div className="flex-1">
            <InputShell label={"End Time"} required outline>
              <TextInput placeholder={"contract address"} type="date" />
            </InputShell>

            <InputShell label={"Telegram"} required outline>
              <TextInput placeholder={"@username"} />
            </InputShell>

            <InputShell label={"Discord"} required outline>
              <TextInput placeholder={"username#XXXX"} />
            </InputShell>
          </div>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={onCreateDrop} disabled={formErrors}>
          Create Presale
        </button>
      </div>
    </div>
  )
}

export default PresaleDetails
