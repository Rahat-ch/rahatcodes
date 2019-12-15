import React from 'react'
import styles from './index.module.css'
import whitespeachbubble from "../../images/whitespeachbubble.png"

const PageInfoHeader = ({ headline }) => (
  <div className={styles.outerContainer}>
    <div className={styles.titleWrapper}>
      <img src={whitespeachbubble} alt="" className={styles.whiteSpeachbubble} />
      <h1>{headline}</h1>
    </div>
  </div>
)

export default PageInfoHeader