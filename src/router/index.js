import Vue from 'vue'
import Router from 'vue-router'

const routerOptions = [
  { path: '/', component: 'About' },
  { path: '/sob', component: 'SoB' },
  { path: '/aeon', component: 'AE' },
  { path: '/hex', component: 'HexploreIt' },
  { path: '/fww', component: 'FWW' }

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
