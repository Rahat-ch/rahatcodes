import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import Img from "gatsby-image"
import styles from './index.module.css'
import blackSpeachbubble from "../../images/blackSpeachbubble.png"


const Featured = () => {
  const data = useStaticQuery(graphql`
  query featureQuery{
    allContentfulVideo(filter: {featured: {eq: true}}){
      edges{
      node{
        title
        subtitle
        slug
        body{
          body
        }
        heroImage{
            sizes(resizingBehavior:SCALE){
              ...GatsbyContentfulSizes
            }
        }
      }
    }
    }
  }
  `)
  const { title, heroImage, subtitle, body, slug } = data.allContentfulVideo.edges[0].node;
  const { sizes } = heroImage;
  console.log(data.allContentfulVideo.edges[0].node)
  return (
    <div className={styles.featureWrapper}>
      <div className={styles.titleWrapper}>
        <img src={blackSpeachbubble} alt="" className={styles.blackSpeachbubble} />
        <h1 className={styles.title}>Featured Episode</h1>
      </div>
      <div className={styles.contentWrapper}>
        <Link to={slug} className={styles.heroImagelink}>
          <Img
            sizes={sizes}
            className={styles.heroImage}
          />
        </Link>
        <main className={styles.content}>
          <h2>{title}</h2>
          <h3>{subtitle}</h3>
          <p>{body.body}</p>
          <Link to={slug} className={styles.episodeLink}>
            Watch episode →
          </Link>
        </main>
      </div>
    </div>
  )
}

export default Featured;