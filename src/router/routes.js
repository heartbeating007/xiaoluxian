import Home from '../views/home.vue';
import { useUserStore } from '@/store/user';
export default [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Course',
    name: 'Course',
    component: () => import('../views/Course.vue')
  },
  {
    path: '/CourseInfo/:id',
    name: 'CourseInfo',
    component: () => import('../views/CourseInfo.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/coursePlay/:courseId/:chapterId',
    name: 'coursePlay',
    component: () => import('../views/coursePlay.vue')
  },
  {
    path: '/Cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue'),
    beforeEnter: (to, from, next) => {
      if (useUserStore().userInfo.id) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/ConfirmOrder',
    name: 'ConfirmOrder',
    component: () => import('../views/ConfirmOrder.vue'),
    beforeEnter: (to, from, next) => {
      if (useUserStore().userInfo.id) {
        next();
      } else {
        next('/login');
      }
    }
  }
];
