import React from "react"
import { Link } from "react-router-dom"

import logo from "../assets/pandalogo.svg"
import styles from "./css/sidebar.module.css"

function Sidebar(props) {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <img alt="Pandasale Logo" src={logo} />
      </div>
      <Link to="/">
        <div className={styles.navItem}>Home</div>
      </Link>
      <Link to="create-drop">
        <div className={styles.navItem}>Create Drop</div>
      </Link>
      <Link to="create-presale">
        <div className={styles.navItem}>Create Presale</div>
      </Link>
    </nav>
  )
}

export default Sidebar
