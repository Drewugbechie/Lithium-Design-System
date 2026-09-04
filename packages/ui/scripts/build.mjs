import { copyFile, mkdir } from 'node:fs/promises'
import { URL } from 'node:url'

const root = new URL('../', import.meta.url)
await mkdir(new URL('dist/', root), { recursive: true })
await copyFile(new URL('src/styles.css', root), new URL('dist/styles.css', root))
