import registry from '@lithium/registry/data'

export function GET() {
  const body = [
    '# Lithium UI',
    '',
    'Lithium is an AI-native design-system foundation.',
    `Registry version: ${registry.registryVersion}`,
    'Discover exact resources: /registry/v1/index.json',
    'Search by task intent: /api/search?q=<query>',
    '',
    registry.resources.length === 0
      ? 'No components are published yet. The foundation is awaiting vertical-slice approval.'
      : registry.resources.map((resource) => `- ${resource.id}: ${resource.summary}`).join('\n'),
  ].join('\n')
  return new Response(`${body}\n`, { headers: { 'content-type': 'text/plain; charset=utf-8' } })
}
