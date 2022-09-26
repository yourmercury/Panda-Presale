import React from "react"

import styles from "./css/header.module.css"

function Header({ account, onConnect }) {
  return (
    <div className={styles.header}>
      <div>Header</div>
      {account ? (
        <div>
          {account.slice(0, 5)}...{account.slice(-4)}
        </div>
      ) : (
        <button onClick={onConnect}>Connect Wallet</button>
      )}
    </div>
  )
}

export default Header
