import React from 'react'
import { graphql } from 'gatsby'

import { Layout } from '../components/Layout'
import { GitHubProjects } from '../components/GitHubProjects'

export default function ProjectsPage({ location, data }) {
    const {
        site: { siteMetadata },
    } = data

    return (
        <Layout title='Projects' currentPath={location.pathname}>
            <h1 className='text-gray-100 text-3xl sm:text-4xl'>Projects</h1>
            <p className='text-gray-300 sm:text-lg mb-8'>
                These are some of my projects from <a href={siteMetadata.authorGitHub}>my GitHub</a>, click on them to learn more!
            </p>
            <GitHubProjects username={siteMetadata.authorGitHubUsername} />
        </Layout>
    )
}

export const query = graphql`
    query Projects {
        site {
            siteMetadata {
                authorLinkedIn
                authorGitHubUsername
                authorGitHub
                authorTwitter
            }
        }
    }
`
