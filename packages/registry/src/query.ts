import type { AccessLevel, PublishedResource, Registry, ResourceKind, ResourceStatus } from './schema.js'

export type ResourceFilters = {
  kind?: ResourceKind
  category?: string
  status?: ResourceStatus
  access?: AccessLevel
}

const matchesFilters = (resource: PublishedResource, filters: ResourceFilters) =>
  (!filters.kind || resource.kind === filters.kind) &&
  (!filters.category || resource.category === filters.category) &&
  (!filters.status || resource.status === filters.status) &&
  (!filters.access || resource.access === filters.access)

export function getResource(registry: Registry, id: string) {
  return registry.resources.find((resource) => resource.id === id)
}

export function listResources(registry: Registry, filters: ResourceFilters = {}) {
  return registry.resources.filter((resource) => matchesFilters(resource, filters))
}

export function searchResources(registry: Registry, query: string, filters: ResourceFilters = {}) {
  const terms = query.toLocaleLowerCase('en').trim().split(/\s+/).filter(Boolean)
  if (terms.length === 0) return listResources(registry, filters)

  return listResources(registry, filters)
    .map((resource) => {
      const id = resource.id.toLocaleLowerCase('en')
      const title = resource.title.toLocaleLowerCase('en')
      const text = resource.searchText.toLocaleLowerCase('en')
      const score = terms.reduce((total, term) => total +
        (id === term ? 12 : 0) +
        (title.includes(term) ? 8 : 0) +
        (resource.discovery.intents.some((intent) => intent.toLocaleLowerCase('en').includes(term)) ? 5 : 0) +
        (resource.discovery.useFor.some((use) => use.toLocaleLowerCase('en').includes(term)) ? 4 : 0) +
        (resource.discovery.keywords.some((keyword) => keyword.toLocaleLowerCase('en').includes(term)) ? 3 : 0) +
        (text.includes(term) ? 1 : 0), 0)
      return { resource, score }
    })
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score || left.resource.id.localeCompare(right.resource.id))
}
