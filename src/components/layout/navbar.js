import React from "react"
import { Link } from "gatsby"
import classNames from "classnames"
import styles from "./navbar.module.css"

const navData = [
  ["Episodes", "/"],
  ["About", "/about"]
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
      <a href="http://twitch.tv/rahatcodes" target="_blank" rel="noopener noreferrer" className={styles.navItem}>Twitch</a>
    </nav>
  )
}

export default navbar
