import React, { useCallback, useState } from "react"

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

  const handleCreateDrop = useCallback(async () => {
    // store images to ipfs
    const ipfsImagesLinks = await storeFiles(images)
    // create array of metadata objects
    const nftMetadatas = ipfsImagesLinks.map((image, index) => ({
      image,
      ...dropInput.metadata[index],
    }))
    // store metadatas to ipfs
    const uris = await storeNFTMetadatas(nftMetadatas)
    const { name, symbol } = dropInput
    const collectionAddress = await createNFTCollection(uris, name, symbol)
    console.log({ collectionAddress })
  }, [dropInput, images])

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
