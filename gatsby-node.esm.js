import path from 'path'
import { postsPathPrefix } from './src/utils/globals'
import { createFilePath } from 'gatsby-source-filesystem'

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`src/templates/blog.jsx`)

  const result = await graphql(`
    {
      allOrgContent {
        nodes {
          id
          fields {
            slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allOrgContent.nodes.forEach(node => {
    createPage({
      path: node.fields.slug,
      component: blogPostTemplate,
      context: {
        id: node.id,
      },
    })
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'OrgContent') {
    // Generate a slug for each org file and make it accessible in Gatsby's
    // graphql api
    const slug = createFilePath({ node, getNode, basePath: `posts` })
    createNodeField({
      node,
      name: `slug`,
      value: `/${postsPathPrefix}${slug}`,
    })
  }
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    devtool: 'eval-source-map',
  })
}
