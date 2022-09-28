import React from "react"

import styles from "./css/header.module.css"

function Header({ account, onConnect, onDisconnect }) {
  return (
    <div className={styles.header}>
      <div>Header</div>
      {account ? (
        <button onClick={onDisconnect} title="Disconnect Wallet">
          {account.slice(0, 5)}...{account.slice(-4)}
        </button>
      ) : (
        <button onClick={onConnect} title="Connect Wallet">
          Connect Wallet
        </button>
      )}
    </div>
  )
}

export default Header
