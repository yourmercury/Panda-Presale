import React from "react"

import uploadIcon from "../assets/upload-icon.svg"
import styles from "./css/upload-nft.module.css"

function UploadNFT({ images, onImageSelected, onRemoveImage }) {
  return (
    <div className={styles.container}>
      <div>Upload NFTs</div>
      <div className={styles.dragArea}>
        <div className={styles.icon}>
          <img alt="Upload Icon" src={uploadIcon} />
        </div>
        <header>Drag & Drop Here</header>
        <span>OR</span>
        <button>BROWSE FILE</button>
        <input
          type="file"
          className={styles.fileUpload}
          multiple
          accept="image/*"
          onChange={onImageSelected}
        />
      </div>
      {images && (
        <div className={styles.imageContainer}>
          {images.map((image, index) => (
            <div
              className={styles.image}
              key={index}
              onClick={() => onRemoveImage(index)}
            >
              <img alt="" src={URL.createObjectURL(image)} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UploadNFT
