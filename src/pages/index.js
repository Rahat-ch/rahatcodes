import React from "react"

import SEO from "../components/seo"
import Layout from "../components/layout"
import Featured from "../components/featured"
import EpisodeList from "../components/episodeList"

const IndexPage = () => (

  <Layout>
    <SEO title="Home" />
    <Featured />
    <EpisodeList />
  </Layout>


)

export default IndexPage
