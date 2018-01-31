import Vue from 'vue'
import Router from 'vue-router'

const routerOptions = [
  { path: '/', component: 'Landing' },
  { path: '/dice', component: 'DiceRoller' },
  { path: '/sob', component: 'ShadowsOfBrimstone' },
  { path: '/som', component: 'ShadowsOfMalice' }
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
