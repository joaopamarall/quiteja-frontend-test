import Vue from 'vue'
import VueRouter from 'vue-router'
import UserListView from '@/views/UserListView.vue'
import UserDetailView from '@/views/UserDetailView.vue'
import HomeView from '@/views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
  },
  {
    path: '/user',
    name: 'UserList',
    component: UserListView,
  },
  {
    path: '/user/:id',
    name: 'UserDetail',
    component: UserDetailView,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
