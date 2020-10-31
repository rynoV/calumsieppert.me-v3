import React from 'react'
import { createPortal } from 'react-dom'

import { Snowflakes } from './Snowflakes'
import { documentGlobal } from '../utils/globals'

import CabinSVG from '../../images/cabin.inline.svg'

import './cabinscene.css'

export function CabinScene() {
    return (
        <>
            <div className='absolute w-full h-full inset-0 -z-10'>
                <div className='cabin'>
                    <CabinSVG />
                </div>
            </div>
            {documentGlobal &&
                createPortal(<Snowflakes />, documentGlobal.body)}
        </>
    )
}
