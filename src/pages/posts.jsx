import React from 'react'

import { Layout } from '../components/Layout'
import { CategoryListing } from '../components/CategoryListing'
import { ChronListing } from '../components/ChronListing'
import { useState } from 'react'

const displayTypes = { recent: 'Recent', category: 'Category' }

export default function IndexPage({ location }) {
    const [displayType, setDisplayType] = useState(displayTypes.recent)

    function handleDisplayTypeChange({ target }) {
        setDisplayType(target.value)
    }

    return (
        <Layout title='Posts' currentPath={location.pathname}>
            <header className='flex justify-between'>
                <span className='uppercase text-gray-400'>All posts:</span>
                <select
                    defaultValue={displayType}
                    onBlur={handleDisplayTypeChange}
                    onChange={handleDisplayTypeChange}
                    className='bg-primary border-b'
                >
                    <option value={displayTypes.recent}>
                        {displayTypes.recent}
                    </option>
                    <option value={displayTypes.category}>
                        {displayTypes.category}
                    </option>
                </select>
            </header>
            {displayType === displayTypes.category ? (
                <CategoryListing />
            ) : (
                <ChronListing />
            )}
        </Layout>
    )
}
