export interface PageConfig {
  name: string
  title?: string
  index: number
  parent?: string
  hasChildren?: boolean
  meta?: {
    access: string
  }
  props?: boolean
}
