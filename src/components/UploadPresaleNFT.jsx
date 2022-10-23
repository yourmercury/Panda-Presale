import React, { useRef, useState } from "react"

import UIConstants from "../ui-constants.json"
import uploadIcon from "../assets/upload-icon.svg"
import styles from "./css/upload-nft.module.css"
import formStyles from "./css/drop-details.module.css"
import InputShell, { TextInput } from "./Inputs/inputShell"

function UploadPresaleNFT({ images, onImageSelected, onRemoveImage, imageError }) {

  return (
    <div className={imageError? styles.containerError : styles.container}>
      <div>Upload NFTs</div>
      {imageError && <p className="text-[red]">Error: {imageError}</p>}
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
      {/* <div className={[formStyles.formElement]}>
          <label className="">Imgae Url <span className="text-[red]">*</span></label>
          <input
            placeholder="www."
            className=""
          />
        </div> */}
        {/* <InputShell label={"Image Url"} required>
          <TextInput placeholder={"www."}/>
        </InputShell> */}
      {images && (
        <div className={styles.imageContainer}>
          {images.length >= 3 ? (
            <>
              {images.slice(-3).map((image, index) => (
                <div
                  className={styles.image}
                  key={index}
                  onClick={() => onRemoveImage(images.length - index + 1)}
                >
                  <img alt="" src={URL.createObjectURL(image)} />
                </div>
              ))}
              {images.length - 3 ? (
                <>...and {images.length - 3} other NFT images</>
              ) : (
                ""
              )}
            </>
          ) : (
            images.map((image, index) => (
              <div
                className={styles.image}
                key={index}
                onClick={() => onRemoveImage(index)}
              >
                <img alt="" src={URL.createObjectURL(image)} />
              </div>
            ))
          )}
        </div>
      )}
      <div className={styles.feeDiv}>
        Fee: {UIConstants.dropFee} {UIConstants.dropToken}
      </div>
    </div>
  )
}

export default UploadPresaleNFT
