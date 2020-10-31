function convertOrgMDForRemark(content) {
    return (
        content
            .replace(/\\\((.*)\\\)/g, '$$$1$$')
            // Note: the 's' flag is necessary for '.' to include newlines
            .replace(/\\\[(.*)\\\]/gs, '$$$$$1$$$$')
            // Add a # onto any sequence of 1 to 5 #s at the start of any line
            // ('m' flag necessary) followed by one or more spaces. The title will
            // be the h1 but it is written in the yaml frontmatter so the
            // subheadings are one level too high, and this fixes that.
            .replace(/(^#{1,5})\s+/gm, '$1#')
    )
}

module.exports = convertOrgMDForRemark
