exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
  {
    allContentfulVideo {
      edges {
        node {
          slug
        }
      }
    }
  }
  `)

  if (result.error) {
    reporter.panic(result.error)
    return
  }

  const videos = result.data.allContentfulVideo.edges

  videos.forEach(({ node: video }) => {
    const slug = video.slug

    actions.createPage({
      path: `/${slug}/`,
      component: require.resolve("./src/templates/videopage/index.js"),
      context: { slug },
    })
  })
}