import registry from '@lithium/registry/data'

export function GET() {
  return Response.json(registry, { headers: { 'cache-control': 'public, max-age=300, stale-while-revalidate=86400' } })
}
