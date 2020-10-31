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

        const { date, authorName, authorLink, title } = node.metadata
        createNodeField({
            node,
            name: `date`,
            value: date
                ? new Date(date).toDateString()
                : new Date().toDateString(),
        })
        createNodeField({
            node,
            name: `title`,
            value:
                title.toLowerCase() !== 'untitled'
                    ? title
                    : node.metadata.export_file_name,
        })
        createNodeField({
            node,
            name: `author`,
            value: {
                name: authorName ? authorName : 'Calum Sieppert',
                link: authorLink ? authorLink : 'https://calumsieppert.me',
            },
        })
    }
}

exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        devtool: 'eval-source-map',
    })
}
