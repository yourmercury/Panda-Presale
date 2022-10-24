import React, { useState, useCallback, useRef } from "react"
import { toast, ToastContainer } from "react-toastify"

import UploadPresaleNFT from "../components/UploadPresaleNFT"

import styles from "./css/create-drop.module.css"
import PresaleDetails from "../components/PresaleDetails"
import { uploadToIpfs } from "../ipfs/nft.storage"
import { createNFTCollectionWithPresale } from "../nft-contract/createNFTCollectionWithPresale"
import { stageContract } from "../firebase"

export default function CreatePresale() {
  const [images, setImages] = useState([])
  const [errorMsg, writeErrorMsg] = useState("")
  const [imageError, writeImageError] = useState("")
  const [error, setError] = useState(false)
  const [form, setForm] = useState({
    collectionName: "",
    symbol: "",
    metadata: "",
    maxSupply: "",
    mintPrice: "",
    fee: "",
    maxPerWallet: "",
    softCap: "",
    // burnOrRefund: "",
    // fundingToken: "",
    presaleType: "",
    description: "",
    startAt: "",
    endAt: "",
    platformFeeType: "1",
  })

  const errors = useRef({
    collectionName: false,
    symbol: false,
    metadata: false,
    maxSupply: false,
    mintPrice: false,
    fee: false,
    maxPerWallet: false,
    softCap: false,
    // burnOrRefund: false,
    // fundingToken: false,
    presaleType: false,
    description: false,
    startAt: false,
    endAt: false,
    platformFeeType: false,
  })

  const handleImageSelected = useCallback(
    ({ target }) => {
      writeImageError("")
      setImages([...images, ...target.files])
    },
    [images]
  )

  const handleRemoveImage = useCallback(
    (indexToRemove) => {
      setImages(images.filter((_, index) => index !== indexToRemove))
    },
    [images]
  )

  function validateForm() {
    // setError(false);
    let formValues = Object.values(form)
    let formKeys = Object.keys(form)
    let isError = !(validateMetadata() && validateImages())
    for (let i = 0; i < formValues.length; i++) {
      if (!formValues[i]) {
        errors.current[formKeys[i]] = true
        isError = true
      } else {
        errors.current[formKeys[i]] = false
      }
    }
    isError ? setError(true) : setError(false)
    return isError
  }

  function validateMetadata() {
    let isEqual = form.metadata.length == images.length
    console.log(isEqual)
    if (!isEqual) {
      writeErrorMsg(
        "Make sure your Metadata is an array, and is of the same length with the amount of images supplied."
      )
    } else {
      writeErrorMsg("")
    }
    return isEqual
  }

  function validateImages() {
    if (!images.length) {
      writeImageError("please select images")
    } else {
      writeImageError("")
    }
    return Boolean(images.length)
  }

  async function deployContract() {
    let isError = validateForm()
    if (isError) throw("Complete the Form");
    try {
      let baseURI = await uploadToIpfs(form.metadata, images)
      if(!baseURI) throw("Upload to IPFS failed");
      // let baseURI;
      let {address, deployer} = await createNFTCollectionWithPresale(
        baseURI,
        form.collectionName,
        form.symbol,
        form
      )
      console.log(address)
      if(!address){
        throw("deployment failed");
      }
      await stageContract(address, deployer, form.description);
      return address;
    } catch (error) {
      console.log(error)
      throw(error);
    }
  }

  function runDeployOnToast(){
    toast.promise(
      deployContract,
      {
        pending: 'Deploying Contract',
        success: {
          render({data}){
            return `Deployment Complete. \n contract address: ${data}`;
          }
        },
        error: {
          render({data}){
            if(typeof data == "string") return `Oops! ${data}`;
            else {
              return "Oops! Deploment failed."
            }
          }
        }
      }
  )
  }

  return (
    <div className={styles.container}>
      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      /> */}
      <UploadPresaleNFT
        images={images}
        onImageSelected={handleImageSelected}
        onRemoveImage={handleRemoveImage}
        imageError={imageError}
      />
      <PresaleDetails
        form={form}
        setForm={setForm}
        errors={errors}
        deployContract={runDeployOnToast}
        errorMsg={errorMsg}
      />
    </div>
  )
}
