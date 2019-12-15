import React from "react"
import YouTube from "react-youtube"
import styles from "./index.module.css"

const SingleVideo = ({ title, subtitle, body, link }) => {
  const opts = {
    height: '390',
    width: '640',
  }
  return (
    <main className={styles.episodePage}>
      <YouTube
        videoId={link}
        opts={opts}
        className={styles.video}
      />
      <div className={styles.episodeContent}>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <p>{body.body}</p>
      </div>
    </main>
  )
}

export default SingleVideo