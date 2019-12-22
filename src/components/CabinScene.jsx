import React from 'react'
import { createPortal } from 'react-dom'

import { Snowflakes } from './Snowflakes'

import CabinSVG from '../../images/cabin.inline.svg'

import './cabinscene.css'

export function CabinScene() {
  return (
    <>
      <div className='absolute w-full h-screen inset-0 -z-10'>
        <div className='cabin'>
          <CabinSVG />
        </div>
      </div>
      {document.body && createPortal(<Snowflakes />, document.body)}
    </>
  )
}
