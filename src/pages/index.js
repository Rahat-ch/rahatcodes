import React from "react"
import { Link } from "gatsby"

import SEO from "../components/seo"
import Layout from "../components/layout"
import Featured from "../components/featured"

const IndexPage = () => (

  <Layout>
    <SEO title="Home" />
    <Featured />
  </Layout>


)

export default IndexPage
