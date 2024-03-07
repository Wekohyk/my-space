import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Home.vue'),
      meta: { title: 'Home' },
    },
    {
      path: '/blog',
      component: () => import('@/views/Blog.vue'),
      meta: { title: 'Blog' },
    },
    {
      path: '/note',
      component: () => import('@/views/Note.vue'),
      meta: { title: 'Note' },
    },
  ],
});

export default router;
