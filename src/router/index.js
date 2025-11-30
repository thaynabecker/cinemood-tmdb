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
    path: '/series',
    name: 'Series',
    component: () => import('../views/SeriesView.vue'),
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
    path: '/search',
    name: 'Search',
    component: () => import('../views/SearchView.vue'),
  },
  {
    path: '/sobre',
    name: 'Sobre',
    component: () => import('../views/SobreView.vue'),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
