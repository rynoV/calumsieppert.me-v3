import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import path from 'path'

import { postsPathPrefix } from '../utils/globals'
import { File } from './File'

export function CategoryListing() {
    const data = useStaticQuery(graphql`
        {
            allMarkdownRemark(
                filter: { fields: { isBlogPost: { eq: true } } }
                sort: { fields: frontmatter___date, order: DESC }
            ) {
                edges {
                    node {
                        fields {
                            slug
                        }
                        frontmatter {
                            title
                            date
                        }
                    }
                }
            }
        }
    `)

    const mostRecent = data.allMarkdownRemark.edges[0].node

    return (
        <>
            {getCategoryListingJSX(
                createBlogStructure(data.allMarkdownRemark.edges)
            )}
            <span>Most recent post: </span>
            <File
                slug={mostRecent.fields.slug}
                title={mostRecent.frontmatter.title}
                date={mostRecent.frontmatter.date}
            />
        </>
    )
}

function Directory({ name, children }) {
    return (
        <details className='pl-6 my-6 border-l capitalize' key={name}>
            <summary className='text-xl'>{name}</summary>
            {children}
        </details>
    )
}

function getCategoryListingJSX(blogStructure) {
    // Return an array of jsx elements For each file in the current directory
    // level append a file link For each directory in the current directory level
    // append a directory element and pass it children by means of getCategoryListingJSX with the new
    // directory as an argument
    // getCategoryListingJSX always needs to return either jsx or an array of jsx elements
    const files = blogStructure.files
        ? blogStructure.files.map(file => {
              return File({ key: file.title, ...file })
          })
        : []
    const dirs =
        blogStructure.dirs !== {}
            ? Object.entries(blogStructure.dirs).map(([name, dir]) => {
                  return Directory({
                      key: name,
                      name,
                      children: getCategoryListingJSX(dir),
                  })
              })
            : []
    return dirs.concat(files)
}

/**
 * Parses through the fileNodes to create the structure of the blog
 * @param {Type of fileNodes} fileNodes
 * @returns {Type of blogStructure} object representing the blog post heirarchy
 */
function createBlogStructure(fileNodes) {
    // Grab the files and their containing directories
    const files = fileNodes.map(({ node: fileNode }) => {
        // Break up the slug at the path seperator and remove empty strings and the
        // posts slug prefix
        const dirs = fileNode.fields.slug
            .split(path.sep)
            .filter(dirName => dirName !== postsPathPrefix && dirName !== '')
        // Remove the file name
        dirs.pop()

        const file = {
            slug: fileNode.fields.slug,
            title: fileNode.frontmatter.title,
            date: fileNode.frontmatter.date,
        }

        return {
            dirs,
            file,
        }
    })

    // Create the file structure object by recursively adding to an object for
    // each file
    return files.reduce(
        (fileStructure, currentFile) => {
            return createFileStructure(currentFile, fileStructure)
        },
        {
            files: [],
            dirs: {},
        }
    )
}

/**
 * Mutates the given file and fileStructure by recursively adding directory
 * nodes based on the directories of the file.
 * @param {Type of file} file - File node to update fileStructure with.
 * @param {Type of fileStructure} fileStructure - File structure to update.
 * @returns {Type of fileStructure} returns the fileStructure.
 */
function createFileStructure(file, fileStructure) {
    if (!file.dirs.length) {
        // Add file to current directory's file list once because we have reached the
        // final directory
        fileStructure.files.push(file.file)
        // Return the fileStructure of the current directory, setting the value of
        // its root parent as the recursive calls return, or simply surfacing the
        // new fileStructure if this was a top level file
        return fileStructure
    } else {
        // Remove a directory from the front of the list
        const dir = file.dirs.shift()
        // Initialize the next directory if it has not been initialized already
        fileStructure.dirs[dir] = !fileStructure.dirs[dir]
            ? { files: [], dirs: {} }
            : fileStructure.dirs[dir]
        // Update the value of the next directory by creating another fileStructure
        // for it
        fileStructure.dirs[dir] = createFileStructure(
            file,
            fileStructure.dirs[dir]
        )
        // Surface the value of the updated file structure
        return fileStructure
    }
}