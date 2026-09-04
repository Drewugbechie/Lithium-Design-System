import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { authoredResourceSchema, type PublishedResource, type Registry } from '../src/schema.js'

const packageRoot = new URL('../', import.meta.url)
const resourcesDirectory = new URL('src/resources/', packageRoot)
const outputDirectory = new URL('dist/registry/v1/', packageRoot)

const filenames = (await readdir(resourcesDirectory))
  .filter((filename) => filename.endsWith('.json'))
  .sort((left, right) => left.localeCompare(right))

const authored = await Promise.all(filenames.map(async (filename) => {
  const input = JSON.parse(await readFile(new URL(filename, resourcesDirectory), 'utf8')) as unknown
  return authoredResourceSchema.parse(input)
}))

const ids = new Set<string>()
for (const resource of authored) {
  if (ids.has(resource.id)) throw new Error(`Duplicate resource ID: ${resource.id}`)
  ids.add(resource.id)
  if (filenameFor(resource.id) !== filenames[authored.indexOf(resource)]) {
    throw new Error(`Resource ${resource.id} must be stored in ${filenameFor(resource.id)}`)
  }
}

const targets = authored.flatMap((resource) => [
  ...resource.relations.map(({ target }) => ({ owner: resource.id, target })),
  ...(resource.composition.accepts ?? []).map((target) => ({ owner: resource.id, target })),
  ...(resource.composition.requires ?? []).map((target) => ({ owner: resource.id, target })),
  ...(resource.composition.slots ?? []).flatMap((slot) => slot.accepts.map((target) => ({ owner: resource.id, target }))),
])
for (const { owner, target } of targets) {
  if (!ids.has(target)) throw new Error(`${owner} references unknown resource ${target}`)
}

const resources: PublishedResource[] = authored.map((resource) => ({
  ...resource,
  registryVersion: '1.0.0',
  examples: [],
  searchText: [
    resource.id,
    resource.title,
    resource.category,
    resource.summary,
    ...resource.discovery.intents,
    ...resource.discovery.useFor,
    ...resource.discovery.avoidFor,
    ...resource.discovery.keywords,
  ].join(' '),
}))

const registry: Registry = { schemaVersion: 1, registryVersion: '1.0.0', resources }
const json = (value: unknown) => `${JSON.stringify(value, null, 2)}\n`
const registryJson = JSON.stringify(registry, null, 2)

await mkdir(new URL('resources/', outputDirectory), { recursive: true })
await Promise.all([
  writeFile(new URL('index.json', outputDirectory), `${registryJson}\n`),
  writeFile(new URL('data.js', outputDirectory), `/* Generated. Do not edit. */\nexport default ${registryJson}\n`),
  writeFile(new URL('data.d.ts', outputDirectory), "import type { Registry } from '../../lib/index.js'\ndeclare const registry: Registry\nexport default registry\n"),
  writeFile(new URL('search-index.json', outputDirectory), json(resources.map(({ id, kind, title, category, summary, status, access, searchText }) => ({ id, kind, title, category, summary, status, access, searchText })))),
  writeFile(new URL('public-projection.json', outputDirectory), json(registry)),
  ...resources.map((resource) => writeFile(new URL(`resources/${resource.id}.json`, outputDirectory), json(resource))),
])

function filenameFor(id: string) {
  return `${id}.json`
}
