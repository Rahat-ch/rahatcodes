import { Link } from "gatsby"
import React from "react"
import HeaderLogo from "../../images/headerlogo.png"
import styles from "./header.module.css"
import Navbar from "./navbar"


const Header = () => (
  <header className={styles.header}>
    <h1 className={styles.headerWrapper}>
      <Link to="/">
        <img src={HeaderLogo} alt="logo - link to home" className={styles.logo} />
      </Link>
      <Navbar />
    </h1>
  </header>
)

export default Header