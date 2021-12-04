import React from 'react'

import StarIcon from '../../images/star.inline.svg'

export interface Project {
    url: string
    name: string
    descriptionHTML: string
    starCount: number
    primaryLanguage: {
        color: string
        name: string
    }
    topics: string[]
}

export function Project({ project }: { project: Project }) {
    return (
        <a
            href={project.url}
            className={`text-gray-100 visited:text-gray-100 no-underline`}
        >
            <div
                className={
                    'space-y-2 p-5 border-solid border-2 border-white rounded shadow transform hover:scale-105 hover:shadow-lg duration-200'
                }
            >
                <div className={`text-xl`}>{project.name}</div>
                <div
                    className={`text-gray-500`}
                    dangerouslySetInnerHTML={{
                        __html: project.descriptionHTML,
                    }}
                />
                <div className={`flex justify-between`}>
                    <div style={{ color: project.primaryLanguage.color }}>
                        {project.primaryLanguage.name}
                    </div>
                    {project.starCount > 0 && (
                        <div className={`flex items-end space-x-1`}>
                            <StarIcon className={`inline h-5 w-5 stroke-current`} />
                            <span className={`leading-none`}>{project.starCount}</span>
                        </div>
                    )}
                </div>
                <div className={`space-x-2 text-gray-500`}>
                    {project.topics.map(t => (
                        <span className={`border-solid`}>{t}</span>
                    ))}
                </div>
            </div>
        </a>
    )
}
