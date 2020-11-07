import path from 'path'
import fs from 'fs'

const p = path.dirname(require.resolve('gatsby-transformer-sharp'))

console.log(p)
console.log(path.dirname(p))

const files = fs.readdirSync(path.dirname(p))
console.log(files)
