import React from 'react'
import styles from './index.module.css'
import WhiteSpeachbubble from "../../images/whiteSpeachbubble.png"

const PageInfoHeader = ({ headline }) => (
  <div className={styles.outerContainer}>
    <div className={styles.titleWrapper}>
      <img src={WhiteSpeachbubble} alt="" className={styles.whiteSpeachbubble} />
      <h1>{headline}</h1>
    </div>
  </div>
)

export default PageInfoHeader