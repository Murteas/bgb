import Vue from 'vue'
import Router from 'vue-router'

const routerOptions = [
  { path: '/', component: 'Landing' },
  { path: '/sob', component: 'ShadowsOfBrimstone' },
  { path: '/gh', component: 'Gloomhaven' },
  { path: '/hex', component: 'HexploreIt' },
  { path: '/aeon', component: 'AeonsEnd' }
]

const routes = routerOptions.map(route => {
  return {
    path: route.path,
    component: () => import(`@/components/${route.component}.vue`)
  }
})

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes
})
