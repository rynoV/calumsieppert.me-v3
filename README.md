# [calumsieppert.me](https://calumsieppert.me)

My personal website

## TODO

-   [ ] Move to TypeScript
    -   [ ] Move gatsby files to TS, at least gatsby-node, hopefully gatsby-config
    -   [ ] Rename other files to ts/tsx
    -   [ ] Add types in code
-   [ ] Add blog description
-   [ ] Show 'last updated' status on posts
-   [ ] Add tags to post
    -   [ ] Allow to search by tag
    -   [ ] Use most frequent tags in description of blog, e.g. "I write about
            many things, including tag1, tag2, and tag3."
-   [ ] Add resume
-   [ ] Switch background colour to #2E3440 (from vscode nord theme)
-   [ ] Try yarn 2

## Errors

Got

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

## GraphQL

-   Use magic comment as described
    [here](https://graphql-code-generator.com/docs/getting-started/documents-field/#graphql-tag-pluck)
    to ensure a template string is picked up by code generator
