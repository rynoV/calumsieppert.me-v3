import React, { useEffect, useState } from 'react'
import { mapConnectionList } from '../utils/utils'
import { Project } from './Project'

export function GitHubProjects({ username }: { username: string }) {
    const projects = useProjects(username)
    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4`}>
            {projects === null ? (
                <div>Loading...</div>
            ) : (
                projects.map(project => (
                    <Project key={project.name} project={project} />
                ))
            )}
        </div>
    )
}

const gitHubProjectsQuery = `
query GitHubProjectsQuery($username: String!) {
    user(login: $username) {
        pinnedItems(first: 10) {
            edges {
                node {
                    ... on Repository {
                        url
                        nameWithOwner
                        descriptionHTML
                        stargazerCount
                        primaryLanguage {
                            color
                            name
                        }
                        repositoryTopics(first: 10) {
                            edges {
                                node {
                                    topic {
                                        name
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
`

function useProjects(username: string): Project[] {
    const [projects, setProjects] = useState<Project[]>(null)
    useEffect(() => {
        ;(async () => {
            const headers = new Headers()
            headers.append(
                'Authorization',
                `Bearer ${process.env.GATSBY_GH_API_KEY}`
            )
            headers.append('Content-Type', 'application/json')

            const graphql = JSON.stringify({
                query: gitHubProjectsQuery,
                variables: { username },
            })

            try {
                const test = false
                const requestOptions = {
                    method: 'POST',
                    headers: headers,
                    body: graphql,
                }
                const response = await fetch(
                    test
                        ? './gh-api-sample.json'
                        : 'https://api.github.com/graphql',
                    test ? {} : requestOptions
                )
                
                if (response.status !== 200) {
                    console.log(
                        `Received status code ${response.status} from GitHub API with status text ${response.statusText}`
                    )
                }
                const responseJson = await response.json()
                if (responseJson.errors) {
                    console.log(
                        `Received errors from the GitHub API:\n`,
                        responseJson.errors
                    )
                }
                setProjects(
                    mapConnectionList<Project>(p => {
                        const project: Project = {
                            name: p.nameWithOwner,
                            descriptionHTML: p.descriptionHTML,
                            primaryLanguage: p.primaryLanguage,
                            starCount: p.stargazerCount,
                            url: p.url,
                            topics: mapConnectionList<string>(
                                t => t.topic.name,
                                p.repositoryTopics
                            ),
                        }
                        return project
                    }, responseJson.data.user.pinnedItems)
                )
            } catch (error) {
                console.log('Error loading from GitHub API:\n', error)
            }
        })()
    }, [])
    return projects
}
