import React from 'react'
import { graphql, useStaticQuery, Link } from "gatsby"
import Img from "gatsby-image"
import styles from "./index.module.css"
import PageInfoHeader from "../pageInfoHeader"

const EpisodeList = () => {
  const data = useStaticQuery(graphql`
    query allProjectsQuery {
      allContentfulVideo(sort: {order: DESC, fields: createdAt}) {
        edges {
          node {
            title
            subtitle
            slug
            heroImage {
              sizes (resizingBehavior:SCALE) {
                ...GatsbyContentfulSizes
                }
              }
            }
          }
        }
      }
    `)

  const videos = data.allContentfulVideo.edges;

  return (
    <>
      <PageInfoHeader headline="All episodes" />
      <div className={styles.videoGrid}>
        {videos.map((node) => {
          const { title, subtitle, slug, heroImage } = node.node
          return (
            <div key={title} className={styles.videoCard}>
              <Link to={slug}>
                <Img className={styles.vidImg} sizes={heroImage.sizes} alt={`Link to ${title}`} />
              </Link>
              <h3>{title}</h3>
              <h4>{subtitle}</h4>
              <Link to={slug} className={styles.episodeLink}>Watch this episode →</Link>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default EpisodeList