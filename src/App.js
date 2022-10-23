import { ethers } from "ethers"
import { useCallback, useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import CreateDrop from "./routes/CreateDrop"
import Home from "./routes/Home"

import Header from "./components/Header"
import Sidebar from "./components/Sidebar"

import styles from "./App.module.css"
import "react-toastify/dist/ReactToastify.css"
import CreatePresale from "./routes/CreatePresale";
import Launchpad from "./routes/Lauchpad"
import Pools from "./routes/Pools"
import Deployed from "./routes/Deployed"
import DeployedHandler from "./routes/DeployedHandler"

function App() {
  const [account, setAccount] = useState()

  const handleConnect = useCallback(async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const accounts = await provider.send("eth_requestAccounts", [])
    setAccount(accounts[0])
  }, [])

  const handleDisonnect = useCallback(async () => {
    setAccount()
  }, [])

  useEffect(() => {
    window.ethereum.on("accountsChanged", async (accounts) => {
      setAccount(accounts[0])
    })
  }, [])

  return (
    <div className={styles.container}>
      <ToastContainer />
      <Header
        account={account}
        onConnect={handleConnect}
        onDisconnect={handleDisonnect}
      />
      <Sidebar />
      <div className={styles.main}>
        {account ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="create-drop" element={<CreateDrop />} />
            <Route path="create-presale" element={<CreatePresale />} />
            <Route path="launchpad/:contract" element={<Launchpad />} />
            <Route path="pools" element={<Pools />} />
            <Route path="deployed" element={<Deployed />} />
            <Route path="deployed/:contract" element={<DeployedHandler />} />
          </Routes>
        ) : (
          <div className={styles.connectWalletError}>
            Please connect your wallet
          </div>
        )}
      </div>
    </div>
  )
}

export default App
