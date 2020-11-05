function convertOrgMDForRemark(content) {
    return (
        content
            // Match anything within \(\), where ? indicates lazy so that it
            // stops at the first \)
            .replace(/\\\((.+?)\\\)/g, '$$$1$$')
            // Note: the 's' flag is necessary for '.' to include newlines
            .replace(/\\\[(.+?)\\\]/gs, '$$$$$1$$$$')
            // Add a # onto any sequence of 1 to 5 #s at the start of any line
            // ('m' flag necessary) followed by one or more spaces. The title will
            // be the h1 but it is written in the yaml frontmatter so the
            // subheadings are one level too high, and this fixes that.
            .replace(/(^#{1,5})\s+/gm, '$1#')
            // Looks for the date frontmatter containing the Org mode formatted
            // date (e.g. <2020-10-30 Fri>) and replaces it with just the first
            // part (2020-10-30) wrapped in double quotes
            .replace(/(^date:\s*)["']?<([\w-]+)\s\w*>["']?/gm, '$1"$2"')
    )
}

export { convertOrgMDForRemark }
