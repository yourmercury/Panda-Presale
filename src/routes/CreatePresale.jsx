import React, { useState, useCallback } from "react"
import { toast } from "react-toastify"

import { storeFiles, storeNFTMetadatas } from "../ipfs/storage"
import { createNFTCollection } from "../nft-contract/createNFTCollection"

import DropDetails from "../components/DropDetails"
import UploadNFT from "../components/UploadNFT";
import UploadPresaleNFT from "../components/UploadPresaleNFT"

import styles from "./css/create-drop.module.css"
import PresaleDetails from "../components/PresaleDetails"

export default function CreatePresale() {
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

  return (
    <div className={styles.container}>
      <UploadPresaleNFT
        images={images}
        onImageSelected={handleImageSelected}
        onRemoveImage={handleRemoveImage}
      />
      <PresaleDetails
        dropInput={dropInput}
        setDropInput={setDropInput}
        // onCreateDrop={handleCreateDrop}
        // formErrors={formErrors}
      />
    </div>
  )
}
