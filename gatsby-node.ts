import path from 'path'
import { GatsbyNode } from 'gatsby'
import { postsPathPrefix } from './src/utils/globals'
import { createFilePath } from 'gatsby-source-filesystem'
import { convertOrgMDForRemark } from './convertOrgMD'
import { AllMdRemarkQuery } from './@types/generated'
import { reporter } from 'gatsby-cli/lib/reporter/reporter'

const MDFILE_TYPE = 'MDFile'

export const createPages: GatsbyNode['createPages'] = async ({
    actions,
    graphql,
}) => {
    const { createPage } = actions

    const blogPostTemplate = path.resolve(`src/templates/blog.tsx`)

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
    const {
        data,
        errors,
    }: { data?: AllMdRemarkQuery; errors?: any } = await graphql(query)

    if (errors) {
        reporter.panicOnBuild('Error with markdown query:', errors)
    }

    //@ts-ignore
    data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
            path: node.fields.slug,
            component: blogPostTemplate,
            context: {
                id: node.id,
            },
        })
    })
}

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
    node,
    getNode,
    actions,
    createNodeId,
}) => {
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
                content: convertOrgMDForRemark(node.internal.content),
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

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
    actions, plugins, stage, getConfig,
}) => {
    actions.setWebpackConfig({
        devtool: 'eval-source-map',
        resolve: {
            alias: {
                path: require.resolve('path-browserify'),
            },
        },
    })
    // Fix for poorly rendered CSS svgs from
    // https://github.com/gatsbyjs/gatsby/issues/31878#issuecomment-860578064
    // override config only during production JS & CSS build
    if (stage === 'build-javascript') {
        // get current webpack config
        const config = getConfig()

        const options = {
            minimizerOptions: {
                preset: [
                    `default`,
                    {
                        svgo: {
                            full: true,
                            plugins: [
                                // potentially destructive plugins removed - see https://github.com/gatsbyjs/gatsby/issues/15629
                                // use correct config format and remove plugins requiring specific params - see https://github.com/gatsbyjs/gatsby/issues/31619
                                `removeUselessDefs`,
                                `cleanupAttrs`,
                                `cleanupEnableBackground`,
                                `cleanupIDs`,
                                `cleanupListOfValues`,
                                `cleanupNumericValues`,
                                `collapseGroups`,
                                `convertColors`,
                                `convertPathData`,
                                `convertStyleToAttrs`,
                                `convertTransform`,
                                `inlineStyles`,
                                `mergePaths`,
                                `minifyStyles`,
                                `moveElemsAttrsToGroup`,
                                `moveGroupAttrsToElems`,
                                `prefixIds`,
                                `removeComments`,
                                `removeDesc`,
                                `removeDimensions`,
                                `removeDoctype`,
                                `removeEditorsNSData`,
                                `removeEmptyAttrs`,
                                `removeEmptyContainers`,
                                `removeEmptyText`,
                                `removeHiddenElems`,
                                `removeMetadata`,
                                `removeNonInheritableGroupAttrs`,
                                `removeOffCanvasPaths`,
                                `removeRasterImages`,
                                `removeScriptElement`,
                                // `removeStyleElement`,
                                `removeTitle`,
                                `removeUnknownsAndDefaults`,
                                `removeUnusedNS`,
                                `removeUselessStrokeAndFill`,
                                `removeXMLProcInst`,
                                `reusePaths`,
                                `sortAttrs`,
                            ],
                        },
                    },
                ],
            }
        }
        // find CSS minimizer
        const minifyCssIndex = config.optimization.minimizer.findIndex(
            minimizer => minimizer.constructor.name ===
                'CssMinimizerPlugin'
        )
        // if found, overwrite existing CSS minimizer with the new one
        if (minifyCssIndex > -1) {
            config.optimization.minimizer[minifyCssIndex] =
                plugins.minifyCss(options)
        }
        // replace webpack config with the modified object
        actions.replaceWebpackConfig(config)
    }
}
