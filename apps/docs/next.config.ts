import type { NextConfig } from 'next'

const config: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  transpilePackages: ['@lithium/registry', '@lithium/tokens', '@lithium/ui'],
  async rewrites() {
    return [{ source: '/registry/v1/resources/:id.json', destination: '/registry/v1/resources/:id' }]
  },
}

export default config
