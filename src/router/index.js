import { createRouter, createWebHashHistory } from 'vue-router'
import HelloWorld from '../views/HelloWorld.vue'
import OtherPlace from '../views/OtherPlace.vue' 
import NewPage from '../views/NewPage.vue' 
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HelloWorld,
  },
  {
    path: '/other-place',
    name: 'Other place',
    component: OtherPlace,
  },
  {
    path: '/new-page',
    name: 'New Page',
    component: NewPage,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
