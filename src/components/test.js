const path = require('path')
const postsPathPrefix = 'posts'
const data = {
  allOrgContent: {
    nodes: [
      {
        fields: {
          slug: '/posts/test/',
        },
        metadata: {
          title: 'Test',
        },
      },
      {
        fields: {
          slug: '/posts/emacs/emacs-test/',
        },
        metadata: {
          title: 'Untitled',
        },
      },
      {
        fields: {
          slug: '/posts/emacs/test-dir/test-file/',
        },
        metadata: {
          title: 'Untitled',
        },
      },
      {
        fields: {
          slug: '/posts/test2/',
        },
        metadata: {
          title: 'Untitled',
        },
      },
    ],
  },
}

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
    if (!dirs.length) {
      dirs.unshift('/')
    }

    const file = {
      slug: fileNode.fields.slug,
      title: fileNode.metadata.title,
    }

    return {
      dirs,
      file,
    }
  })

  return files.reduce((acc, cur) => {
    console.log(cur)
    acc = createFileStructure(cur, acc)
    return acc
  }, {})
}

function createFileStructure(file, acc, dir = '') {
  // Create an object with the top level directory as a key, remove that
  // directory from the list, then repeat until no directories remain. At that
  // point put the file info in an object
  if (!file.dirs.length) {
    const fileList = !acc ? [file.file] : [...acc, file.file]
    return fileList
  }
  dir = file.dirs.shift()
  acc[dir] = createFileStructure(file, acc[dir], dir)
  return acc
}

const test = createBlogStructure(data.allOrgContent.nodes)
console.log(test)
