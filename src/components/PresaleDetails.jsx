import React, { useCallback, useEffect } from "react"
import { useState, useRef } from "react"
import { uploadToIpfs } from "../ipfs/nft.storage"
import { createNFTCollectionWithPresale } from "../nft-contract/createNFTCollectionWithPresale"

import styles from "./css/drop-details.module.css"
import InputShell, {
  FileInput,
  SelectOption,
  TextArea,
  TextInput,
} from "./Inputs/inputShell"

function PresaleDetails({ form, errors, deployContract, setForm, errorMsg }) {
  const [focused, setFocused] = useState({})
  useEffect(() => {
    // console.log("rendered");
  })
  return (
    <div className={styles.container}>
      {errorMsg && <p className="text-[red]">Errors: {errorMsg}</p>}
      <div className={styles.border}>
        <InputShell
          label={"Collection Name"}
          required
          outline
          isError={errors.current.collectionName}
        >
          <TextInput
            placeholder={"collection name.."}
            name="collectionName"
            form={form}
            setForm={setForm}
            errors={errors}
            required
          />
        </InputShell>
        <InputShell label={"Symbol"} required isError={errors.current.symbol}>
          <TextInput
            placeholder={"Symbol.."}
            name="symbol"
            form={form}
            setForm={setForm}
            errors={errors}
            required
          />
        </InputShell>
        <InputShell
          label={"Metadata"}
          required
          isError={errors.current.metadata}
        >
          <FileInput
            placeholder={"metadata.."}
            name="metadata"
            form={form}
            setForm={setForm}
            errors={errors}
            accept={"application/json"}
            required
          />
        </InputShell>

        <div className="flex justify-between">
          {/* First Column */}
          <div className="flex-1">
            {/* <InputShell label={"Mint Price"} required isError={errors.current.mintPrice}>
              <TextInput placeholder={"Mint price in ETH"} type={"number"} name="mintPrice" form={form} setForm={setForm} errors={errors} required/>
            </InputShell> */}

            <InputShell
              label={"Soft Cap"}
              required
              outline
              isError={errors.current.softCap}
            >
              <TextInput
                placeholder={"soft cap..."}
                type="number"
                name="softCap"
                form={form}
                setForm={setForm}
                errors={errors}
                required
              />
            </InputShell>

            <InputShell
              label={"Presale Price"}
              required
              isError={errors.current.fee}
            >
              <TextInput
                placeholder={"presale price in ETH"}
                type={"number"}
                name="fee"
                form={form}
                setForm={setForm}
                errors={errors}
                required
              />
            </InputShell>

            {/* <InputShell label={"Burn/Refund"} required outline>
              <SelectOption options={["burn", "refund"]} name="burnOrRefund" form={form} setForm={setForm} errors={errors}/>
            </InputShell> */}

            {/* <InputShell label={"Funding Token"} required>
            <SelectOption options={["BUSD","ETH","USTD","BNB"]}/>
            </InputShell> */}
          </div>

          <div className="w-5"></div>

          {/* Second Column */}
          <div className="flex-1">
            <InputShell
              label={"Max Per Wallet"}
              required
              outline
              isError={errors.current.maxPerWallet}
            >
              {/* <SelectOption options={[1,5,10]} name="maxPerWallet" form={form} setForm={setForm} errors={errors}/> */}
              <TextInput
                placeholder={"Max per wallet"}
                type={"number"}
                name="maxPerWallet"
                form={form}
                setForm={setForm}
                errors={errors}
                required
              />
            </InputShell>

            <InputShell
              label={"Max supply"}
              required
              isError={errors.current.maxSupply}
            >
              <TextInput
                placeholder={"max supply..."}
                type={"number"}
                name="maxSupply"
                form={form}
                setForm={setForm}
                errors={errors}
                required
              />
            </InputShell>

            {/* <InputShell label={"List On"} required outline>
            <SelectOption options={["Opensea","Gamma","Solsea"]}/>
            </InputShell> */}
          </div>
        </div>

        <div className="my-2">
          <InputShell
            label={"Description"}
            required
            isError={errors.current.description}
          >
            <TextArea
              placeholder={"Type Here..."}
              name="description"
              form={form}
              setForm={setForm}
              errors={errors}
              required
            />
          </InputShell>
        </div>

        <div className="flex justify-between">
          {/* First Column */}
          <div className="flex-1">
            <InputShell
              label={"Start Time"}
              required
              outline
              isError={errors.current.startAt}
            >
              <TextInput
                placeholder={"durations in days"}
                type="datetime-local"
                name="startAt"
                form={form}
                setForm={setForm}
                errors={errors}
                min={0}
                max={100}
                required
              />
            </InputShell>

            <InputShell
              label={"End Time"}
              required
              outline
              isError={errors.current.endAt}
            >
              <TextInput
                placeholder={"contract address"}
                type="datetime-local"
                name="endAt"
                form={form}
                setForm={setForm}
                errors={errors}
                required
              />
            </InputShell>

            {/* <InputShell label={"Twitter"} required outline>
              <TextInput placeholder={"@username"} />
            </InputShell> */}
          </div>

          <div className="w-5"></div>

          {/* Second Column */}
          <div className="flex-1">
            <InputShell
              label={"Platform Fee Type"}
              required
              outline
              isError={errors.current.platformFeeType}
            >
              <SelectOption
                options={["2% From Raised Funds", "1% + 1% Of NFTs"]}
                values={[2, 1]}
                name="platformFeeType"
                form={form}
                setForm={setForm}
                errors={errors}
                required
              />
            </InputShell>

            <InputShell
              label={"Free/Public/Whitelist"}
              required
              outline
              isError={errors.current.presaleType}
            >
              <SelectOption
                options={["public"]}
                name="presaleType"
                form={form}
                setForm={setForm}
                errors={errors}
                required
              />
            </InputShell>

            {/* <InputShell label={"Soft Cap"} required outline>
              <TextInput placeholder={"soft cap..."} type="number" name="softCap" form={form} setForm={setForm} errors={errors} />
            </InputShell> */}

            {/* <InputShell label={"Telegram"} required outline>
              <TextInput placeholder={"@username"} />
            </InputShell>

            <InputShell label={"Discord"} required outline>
              <TextInput placeholder={"username#XXXX"} />
            </InputShell> */}
          </div>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button
          onClick={() => {
            console.log(form, errors.current)
            deployContract()
          }}
          //  disabled={formErrors}
        >
          Create Presale
        </button>
      </div>
    </div>
  )
}

export default PresaleDetails
