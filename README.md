# [calumsieppert.me](https://calumsieppert.me)

My personal website

## TODO

-   [ ] Move to TypeScript
    -   [x] Move gatsby files to TS, at least gatsby-node, hopefully gatsby-config
    -   [x] Rename other files to ts/tsx
    -   [ ] Add types in code
-   [ ] Add blog description
-   [ ] Show 'last updated' status on posts
-   [ ] Add tags to post
    -   [ ] Allow to search by tag
    -   [ ] Use most frequent tags in description of blog, e.g. "I write about
            many things, including tag1, tag2, and tag3."
-   [ ] Add resume
-   [ ] Try yarn 2
    -   Tried it, got stuck referencing the dependencies in `gatsby-config` for
        `gatsby-plugin-codegen` to pull out GraphQL fragements.
-   [ ] Robots.txt

## Assets

-   When exporting the cabin from Adobe XD, need to delete the `width` and
    `height` attributes from the top level XML tag.

## Errors

- Got

  ```
  Cannot read property 'buildError' of undefined
  ```
  
  from `gatsby-plugin-graphql-codegen` while `documentPaths` included the root
  directory. Specifically the offending path was `./**/*.{ts,tsx,js,jsx}`.
  
  Was also getting this error with GraphQL Code Generator and it seemed to be for
  the same reason. After updating the document paths for that tool I started
  running into a new error
  
  ```
  Identifier `getIterator` already defined
  ```
  
  and gave up.

- Had to pin `remark-mdx`, see [here](https://github.com/gatsbyjs/gatsby/issues/33713)

## GraphQL

-   Use magic comment as described
    [here](https://graphql-code-generator.com/docs/getting-started/documents-field/#graphql-tag-pluck)
    to ensure a template string is picked up by code generator

## Resources

-   [Gatsby files and Typescript](https://www.extensive.one/converting-gatsby-config-and-node-api-to-typescript/)
