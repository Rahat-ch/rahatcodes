import React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/layout"
import SingleVideo from "../../components/singleVideo"

export const query = graphql`
  query($slug: String!) {
    contentfulVideo(slug: { eq: $slug }){
    title
    subtitle
    body{
      body
    }
    link
    heroImage {
      fluid {
        src
      }
    }
  }
  }
`

const VideoPage = ({ data }) => {
  const videoProps = data.contentfulVideo
  return (
    <Layout>
      <SingleVideo {...videoProps} />
    </Layout>
  )
}

export default VideoPage