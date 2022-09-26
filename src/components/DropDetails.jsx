import React, { useCallback } from "react"

import styles from "./css/drop-details.module.css"

function DropDetails({ dropInput, setDropInput, onCreateDrop }) {
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
        <div className={styles.formElement}>
          <label>Collection Name</label>
          <input
            placeholder="Name"
            value={dropInput.name}
            onChange={({ target }) =>
              setDropInput({ ...dropInput, name: target.value })
            }
          />
        </div>
        <div className={styles.formElement}>
          <label>Symbol</label>
          <input
            placeholder="Your collection Symbol"
            value={dropInput.symbol}
            onChange={({ target }) =>
              setDropInput({ ...dropInput, symbol: target.value })
            }
          />
        </div>

        <div className={styles.formElement}>
          <label>Metadata</label>
          <input
            type="file"
            accept="application/json"
            placeholder="Json file for metadatas"
            onChange={handleMetadataSelected}
          />
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={onCreateDrop}>Create Drop</button>
      </div>
    </div>
  )
}

export default DropDetails
