import { z } from 'zod'

export const resourceKinds = ['component', 'pattern', 'template'] as const
export const statuses = ['experimental', 'beta', 'stable', 'deprecated'] as const
export const accessLevels = ['free', 'pro', 'preview'] as const
export const relationTypes = ['requires', 'recommended-with', 'alternative-to', 'composes', 'replaces'] as const

const resourceId = z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/)
const nonEmptyStrings = z.array(z.string().trim().min(1))

export const authoredResourceSchema = z.object({
  schemaVersion: z.literal(1),
  id: resourceId,
  kind: z.enum(resourceKinds),
  title: z.string().trim().min(1),
  category: z.string().trim().min(1),
  summary: z.string().trim().min(1),
  status: z.enum(statuses),
  access: z.enum(accessLevels),
  discovery: z.object({
    intents: nonEmptyStrings,
    useFor: nonEmptyStrings,
    avoidFor: nonEmptyStrings,
    keywords: nonEmptyStrings,
  }).strict(),
  composition: z.object({
    accepts: z.array(resourceId).optional(),
    requires: z.array(resourceId).optional(),
    slots: z.array(z.object({
      id: resourceId,
      description: z.string().trim().min(1),
      accepts: z.array(resourceId),
      required: z.boolean(),
      multiple: z.boolean(),
    }).strict()).optional(),
  }).strict(),
  relations: z.array(z.object({ type: z.enum(relationTypes), target: resourceId }).strict()),
  accessibility: z.object({
    requirements: nonEmptyStrings,
    dynamicContent: nonEmptyStrings.optional(),
    keyboard: nonEmptyStrings.optional(),
  }).strict(),
  guidance: z.object({
    design: nonEmptyStrings,
    implementation: nonEmptyStrings,
    commonMistakes: nonEmptyStrings,
  }).strict(),
  exampleIds: z.array(resourceId),
  figma: z.object({
    fileKey: z.string(),
    nodeId: z.string(),
    componentKey: z.string().optional(),
  }).strict().optional(),
  deprecation: z.object({
    replacementId: resourceId.optional(),
    message: z.string().trim().min(1),
  }).strict().optional(),
}).strict().superRefine((resource, context) => {
  if (resource.status === 'deprecated' && !resource.deprecation) {
    context.addIssue({ code: z.ZodIssueCode.custom, message: 'Deprecated resources require deprecation guidance.', path: ['deprecation'] })
  }
  if (resource.status === 'stable' && (!resource.figma?.fileKey || !resource.figma.nodeId)) {
    context.addIssue({ code: z.ZodIssueCode.custom, message: 'Stable resources require a Figma mapping.', path: ['figma'] })
  }
})

export type AuthoredResource = z.infer<typeof authoredResourceSchema>
export type ResourceKind = (typeof resourceKinds)[number]
export type ResourceStatus = (typeof statuses)[number]
export type AccessLevel = (typeof accessLevels)[number]

export type ComponentContract = {
  packageName: string
  exportName: string
  importPath: string
  props: Array<{ name: string; type: string; required: boolean; defaultValue?: string; description?: string }>
  variants: Array<{ name: string; values: string[] }>
  sourcePath: string
}

export type PublishedResource = AuthoredResource & {
  registryVersion: '1.0.0'
  contract?: ComponentContract
  examples: Array<{ id: string; title: string; sourcePath: string; code: string }>
  installation?: { packageName: string; command: string; importStatement: string }
  searchText: string
}

export type Registry = {
  schemaVersion: 1
  registryVersion: '1.0.0'
  resources: PublishedResource[]
}
