import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import path from 'path'

import { postsPathPrefix } from '../utils/globals'

export function BlogListing() {
  const data = useStaticQuery(graphql`
    {
      allOrgContent {
        nodes {
          fields {
            slug
          }
          metadata {
            title
          }
        }
      }
    }
  `)

  return getBlogListingJSX(createBlogStructure(data.allOrgContent.nodes))
}

function Directory({ name, children }) {
  return (
    <div>
      <h1>{name}</h1>
      {children}
    </div>
  )
}

function File({ title, slug }) {
  return (
    <div>
      <Link to={slug}>{title}</Link>
    </div>
  )
}

function getBlogListingJSX(blogStructure) {
  // Return an array of jsx elements For each file in the current directory
  // level append a file link For each directory in the current directory level
  // append a directory element and pass it children by means of getBlogListingJSX with the new
  // directory as an argument
  // getBlogListingJSX always needs to return either jsx or an array of jsx elements
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
            children: getBlogListingJSX(dir),
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
  const files = fileNodes.map(fileNode => {
    // Break up the slug at the path seperator and remove empty strings and the
    // posts slug prefix
    const dirs = fileNode.fields.slug
      .split(path.sep)
      .filter(dirName => dirName !== postsPathPrefix && dirName !== '')
    // Remove the file name
    dirs.pop()

    const file = {
      slug: fileNode.fields.slug,
      title: fileNode.metadata.title,
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
    fileStructure.dirs[dir] = createFileStructure(file, fileStructure.dirs[dir])
    // Surface the value of the updated file structure
    return fileStructure
  }
}
