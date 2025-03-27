import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/folder/Scans',
  },
  {
    path: '/folder/:id',
    component: () => import ('../views/FolderPage.vue'),
  },
  {
    path: '/Account',
    component: () => import ('../views/AccountPage.vue'),
  },
  {
    path: '/login',
    component: () => import ('../views/LoginPage.vue'),
    meta: { hideMenu: true }
  }

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
