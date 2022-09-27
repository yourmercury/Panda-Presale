import React, { useCallback } from "react"
import { useState } from "react"

import styles from "./css/drop-details.module.css"

function DropDetails({ dropInput, setDropInput, onCreateDrop, formErrors }) {
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
        <div className={styles.formElement}>
          <label>Collection Name</label>
          <input
            placeholder="Name"
            value={dropInput.name}
            className={
              focused.inputs &&
              formErrors &&
              formErrors.inputs &&
              styles.inputError
            }
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
            className={
              focused.inputs &&
              formErrors &&
              formErrors.inputs &&
              styles.inputError
            }
            onBlur={() => setFocused({ ...focused, inputs: true })}
            onChange={({ target }) =>
              setDropInput({ ...dropInput, symbol: target.value })
            }
          />
          {focused.inputs && formErrors && formErrors.inputs && (
            <div className={styles.formError}>{formErrors.inputs}</div>
          )}
        </div>

        <div className={styles.formElement}>
          <label>
            Metadata{" "}
            {dropInput.metadata && dropInput.metadata.length && (
              <i>({dropInput.metadata.length} metadatas in the file)</i>
            )}
          </label>
          <input
            type="file"
            accept="application/json"
            placeholder="Json file for metadatas"
            className={
              focused.metadata &&
              formErrors &&
              formErrors.metadata &&
              styles.inputError
            }
            onBlur={() => setFocused({ ...focused, metadata: true })}
            onChange={handleMetadataSelected}
          />
          {focused.metadata && formErrors && formErrors.metadata && (
            <div className={styles.formError}>{formErrors.metadata}</div>
          )}
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={onCreateDrop} disabled={formErrors}>
          Create Drop
        </button>
      </div>
    </div>
  )
}

export default DropDetails
