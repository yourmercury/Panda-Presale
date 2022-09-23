import { ethers } from "ethers"
import { useCallback, useState } from "react"
import { Route, Routes } from "react-router-dom"

import CreateDrop from "./routes/CreateDrop"
import Home from "./routes/Home"

import Header from "./components/Header"
import Sidebar from "./components/Sidebar"

import styles from "./App.module.css"

function App() {
  const [account, setAccount] = useState()

  const handleConnect = useCallback(async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const accounts = await provider.send("eth_requestAccounts", [])
    setAccount(accounts[0])
  }, [])

  return (
    <div className={styles.container}>
      <Header account={account} onConnect={handleConnect} />
      <Sidebar />
      <div className={styles.main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="create-drop" element={<CreateDrop />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
