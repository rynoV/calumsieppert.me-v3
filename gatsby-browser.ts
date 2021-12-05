import './src/utils/globals.css'

export function onClientEntry() {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
}
