import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/filmes',
    name: 'Movies',
    component: () => import('../views/MoviesView.vue'),
  },
  {
    path: '/tv',
    name: 'TV',
    component: () => import('../views/TvView.vue'),
  },
   {
    path: '/romance',
    name: 'Romance',
    component: () => import('../views/RomanceView.vue'),
  },
  {
    path: '/terror',
    name: 'Terror',
    component: () => import('../views/TerrorView.vue'),
  },
  {
    path: '/misterio',
    name: 'Misterio',
    component: () => import('../views/MisterioView.vue'),
  },
  {
    path: '/drama',
    name: 'Drama',
    component: () => import('../views/DramaView.vue'),
  },
  {
    path: '/comedia',
    name: 'Comedia',
    component: () => import('../views/ComediaView.vue'),
  },
  {
    path: '/ficcao',
    name: 'Ficcao',
    component: () => import('../views/FiccaoView.vue'),
  },






];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
