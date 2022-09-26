import React, { useCallback, useState } from "react"
import { toast } from "react-toastify"

import { storeFiles, storeNFTMetadatas } from "../ipfs/storage"
import { createNFTCollection } from "../nft-contract/createNFTCollection"

import DropDetails from "../components/DropDetails"
import UploadNFT from "../components/UploadNFT"

import styles from "./css/create-drop.module.css"

function CreateDrop(props) {
  const [images, setImages] = useState([])
  const [dropInput, setDropInput] = useState({
    name: "",
    symbol: "",
    metadata: null,
  })

  const handleImageSelected = useCallback(
    ({ target }) => {
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

  const validateForm = useCallback(() => {
    if (dropInput.name === "" || dropInput.symbol === "") {
      toast.error("Please fill all feilds")
      return false
    }
    if (
      images.length > 0 &&
      dropInput.metadata &&
      images.length === dropInput.metadata.length
    )
      return true
    else {
      toast.error("Number of Images must equal the JSON metadata objects")
      return false
    }
  }, [dropInput, images])

  const handleCreateDrop = useCallback(async () => {
    if (!validateForm()) return
    // store images to ipfs
    const ipfsImagesLinks = await toast.promise(storeFiles(images), {
      pending: "Storing NFT images and Metadata to IPFS",
      success: "Success Storing!",
      error: "Error Storing",
    })
    // create array of metadata objects
    const nftMetadatas = ipfsImagesLinks.map((image, index) => ({
      image,
      ...dropInput.metadata[index],
    }))
    // store metadatas to ipfs
    const uris = await toast.promise(storeNFTMetadatas(nftMetadatas), {
      pending: "Storing NFT metadatas to IPFS",
      success: "Success Storing!",
      error: "Error Storing",
    })
    const { name, symbol } = dropInput
    const collectionAddress = await toast.promise(
      createNFTCollection(uris, name, symbol),
      {
        pending: "Creating Collection",
        success: "Success Creating NFT Collection!",
        error: "Error Creating NFT Collection",
      }
    )
    toast.success(
      <div>
        <div>NFT collection created!</div>
        <div>{collectionAddress}</div>
      </div>
    )
  }, [dropInput, images, validateForm])

  return (
    <div className={styles.container}>
      <UploadNFT
        images={images}
        onImageSelected={handleImageSelected}
        onRemoveImage={handleRemoveImage}
      />
      <DropDetails
        dropInput={dropInput}
        setDropInput={setDropInput}
        onCreateDrop={handleCreateDrop}
      />
    </div>
  )
}

export default CreateDrop
