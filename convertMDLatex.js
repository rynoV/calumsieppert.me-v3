function convertMDLatex(content) {
    return content
        .replace(/\\\((.*)\\\)/g, '$$$1$$')
        .replace(/\\\[(.*)\\\]/gs, '$$$$$1$$$$')
}

module.exports = convertMDLatex
