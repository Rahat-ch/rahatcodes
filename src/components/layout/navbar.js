import React from "react"
import { Link } from "gatsby"
import classNames from "classnames"
import styles from "./navbar.module.css"

const navData = [
  ["Episodes", "/"],
  ["Coming Soon", "/soon"],
  ["About", "/about"],
  ["Pair With Rahat", "/pair"],
]

const navbar = () => {
  const isMenuItemPath = itemPath => {
    if (typeof window !== "undefined") {
      if (window.location.pathname === itemPath) {
        return true
      }
    }
  }
  return (
    <nav className={styles.nav}>
      {navData.map(item => (
        <Link
          className={classNames({
            [styles.navItem]: !isMenuItemPath(item[1]),
            [styles.navItemCurrent]: isMenuItemPath(item[1]),
          })}
          to={item[1]}
        >
          {item[0]}
        </Link>
      ))}
    </nav>
  )
}

export default navbar
