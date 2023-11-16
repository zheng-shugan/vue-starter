import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import type { PageConfig } from '@/types'

const pages: Record<string, any> = import.meta.glob('../views/**/page.ts', {
  eager: true,
  import: 'default',
})

const pagesComponents = import.meta.glob('../views/**/index.vue', {
  eager: true,
  import: 'default',
})

/**
 * create route from page.ts
 * @param path route path
 * @param meta route meta info
 */
const createRoute = (path: string, meta: PageConfig | undefined) => {
  const pathTSPath = path
  path = path.replace('../views', '').replace('/page.ts', '') || '/'

  const name = path.split('/').filter(Boolean).join('-') || 'index'
  const componentPath = pathTSPath.replace('page.ts', 'index.vue')

  const val = {
    path,
    name,
    component: pagesComponents[componentPath],
    meta,
  } as RouteRecordRaw

  if ((meta as PageConfig).hasChildren)
    val.children = []
  if ((meta as PageConfig).props)
    val.props = true

  return val
}

// create a map
const sortPages = new Map()
// sort by index
const sortKey = Object.keys(pages).sort((a, b) => {
  return pages[a].index - pages[b].index
})
// set items to map
sortKey.forEach((key) => {
  sortPages.set(key, pages[key])
})
// create routes
const routes: RouteRecordRaw[] = [] as RouteRecordRaw[]
for (const [path, meta] of sortPages.entries()) {
  // first level route
  if (meta.index === 1)
    routes.push(createRoute(path, meta))

  // two level route
  if (meta.index === 2 && meta.parent) {
    const parent = routes.find(item => item.name === meta.parent)
    if (parent)
      parent.children?.push(createRoute(path, meta))
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// router.beforeEach((to, from, next) => {
//   document.title = to.meta.title as string || 'Untitled Page'
//
//   next()
// })

export default router
export { PageConfig, router }
