import React from "react"

import styles from "./css/upload-nft.module.css"

function UploadNFT({ images, onImageSelected }) {
  return (
    <div>
      <div>Upload NFTs</div>
      <input type="file" multiple accept="image/*" onChange={onImageSelected} />
      {images && (
        <div className={styles.imageContainer}>
          {images.map((image, index) => (
            <div className={styles.image} key={index}>
              <img alt="" src={URL.createObjectURL(image)} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UploadNFT
