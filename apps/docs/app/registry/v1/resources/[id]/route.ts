import registry from '@lithium/registry/data'
import { getResource } from '@lithium/registry'

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  const resource = getResource(registry, (await context.params).id)
  return resource
    ? Response.json(resource, { headers: { 'cache-control': 'public, max-age=300, stale-while-revalidate=86400' } })
    : Response.json({ error: 'Resource not found' }, { status: 404 })
}
