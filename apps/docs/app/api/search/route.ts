import registry from '@lithium/registry/data'
import { searchResources } from '@lithium/registry'

export function GET(request: Request) {
  const query = new URL(request.url).searchParams.get('q') ?? ''
  return Response.json({ schemaVersion: 1, query, results: searchResources(registry, query) })
}
