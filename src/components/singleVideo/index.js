import React from "react"
import YouTube from "react-youtube"
import styles from "./index.module.css"
import SEO from "../seo"

const SingleVideo = ({ title, subtitle, body, link, heroImage }) => {
  const opts = {
    height: '390',
    width: '640',
  }
  const socialImage = heroImage.fluid.src;
  return (
    <main className={styles.episodePage}>
      <SEO
        title={title}
        description={body.body}
        image={socialImage}
      />
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