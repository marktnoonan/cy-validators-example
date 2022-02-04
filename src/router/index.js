import { createRouter, createWebHashHistory } from 'vue-router'
import HelloWorld from "../views/HelloWorld.vue"
import OtherPlace from "../views/OtherPlace.vue"
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HelloWorld,
  },
  {
    path: '/other-place',
    name: 'Other place',
    component: OtherPlace
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
