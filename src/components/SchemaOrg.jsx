/** From
 * https://github.com/jlengstorf/gatsby-theme-jason-blog/blob/e6d25ca927afdc75c759e611d4ba6ba086452bb8/src/components/SEO/SEO.js
 */

import React from 'react'
import { Helmet } from 'react-helmet'

export default React.memo(
    ({
        author,
        siteUrl,
        datePublished,
        defaultTitle,
        description,
        image,
        isBlogPost,
        title,
        url,
        organization,
    }) => {
        const baseSchema = [
            {
                '@context': 'http://schema.org',
                '@type': 'WebSite',
                url,
                name: title,
                alternateName: defaultTitle,
            },
        ]

        const schema = isBlogPost
            ? [
                  ...baseSchema,
                  {
                      '@context': 'http://schema.org',
                      '@type': 'BreadcrumbList',
                      itemListElement: [
                          {
                              '@type': 'ListItem',
                              position: 1,
                              item: {
                                  '@id': url,
                                  name: title,
                                  image,
                              },
                          },
                      ],
                  },
                  {
                      '@context': 'http://schema.org',
                      '@type': 'BlogPosting',
                      url,
                      name: title,
                      alternateName: defaultTitle,
                      headline: title,
                      image: {
                          '@type': 'ImageObject',
                          url: image,
                      },
                      description,
                      author: {
                          '@type': 'Person',
                          name: author.name,
                      },
                      publisher: {
                          '@type': 'Organization',
                          url: organization.url,
                          logo: {
                              '@type': 'ImageObject',
                              url: organization.logo,
                          },
                          name: organization.name,
                      },
                      mainEntityOfPage: {
                          '@type': 'WebSite',
                          '@id': siteUrl,
                      },
                      datePublished,
                  },
              ]
            : baseSchema

        return (
            <Helmet>
                {/* Schema.org tags */}
                <script type='application/ld+json'>
                    {JSON.stringify(schema)}
                </script>
            </Helmet>
        )
    }
)
