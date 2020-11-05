import path from 'path'
import { postsPathPrefix } from './src/utils/globals'
import { createFilePath } from 'gatsby-source-filesystem'
import convertOrgMD from './convertOrgMD'

const MDFILE_TYPE = 'MDFile'

exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions

    const blogPostTemplate = path.resolve(`src/templates/blog.jsx`)

    const query = /* GraphQL */ `
        query AllMDRemark {
            allMarkdownRemark(
                filter: { fields: { isBlogPost: { eq: true } } }
            ) {
                edges {
                    node {
                        fields {
                            slug
                        }
                        id
                    }
                }
            }
        }
    `
    const result = await graphql(query)

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
            path: node.fields.slug,
            component: blogPostTemplate,
            context: {
                id: node.id,
            },
        })
    })
}

exports.onCreateNode = ({ node, getNode, actions, createNodeId }) => {
    const { createNode, createNodeField } = actions
    // Create a new node for each markdown file with the latex blocks converted
    // so remark processes them
    if (
        node.internal.type === 'File' &&
        (node.internal.mediaType === 'text/markdown' ||
            node.internal.mediaType === 'text/x-markdown')
    ) {
        createNode({
            ...node,
            id: createNodeId(node.id),
            internal: {
                contentDigest: node.internal.contentDigest,
                type: MDFILE_TYPE,
                mediaType: node.internal.mediaType,
                description: node.internal.description,
                content: convertOrgMD(node.internal.content),
            },
        })
    }
    if (
        node.internal.type === 'MarkdownRemark' &&
        getNode(node.parent).internal.type === MDFILE_TYPE
    ) {
        // Generate a slug for each mdfile file and make it accessible in Gatsby's
        // graphql api
        const slug = createFilePath({
            node,
            getNode,
            basePath: postsPathPrefix,
        })
        createNodeField({
            node,
            name: `slug`,
            value: `/${postsPathPrefix}${slug}`,
        })
        createNodeField({
            node,
            name: `isBlogPost`,
            value: true,
        })
    }
}

exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        devtool: 'eval-source-map',
    })
}
