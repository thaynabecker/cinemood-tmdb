<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import { useRoute } from 'vue-router';

const route = useRoute();
const movies = ref([]);
const genreId = route.query.genre;

onMounted(async () => {
  const response = await api.get('discover/movie', {
    params: {
      with_genres: genreId,
      language: 'pt-BR'
    }
  });
  movies.value = response.data.results;
});
</script>

<template>
  <section class="filmes">
    <h1>🎥 Filmes por Tema</h1>
    <div class="movie-list">
      <div v-for="movie in movies" :key="movie.id" class="movie-card">
        <img
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
          :alt="movie.title"
        />
        <p class="movie-title">{{ movie.title }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.filmes {
  background-color: #0f0f1b;
  color: white;
  padding: 2rem;
  text-align: center;
}

.movie-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.movie-card {
  background-color: #1e1e2f;
  border-radius: 0.8rem;
  overflow: hidden;
  width: 180px;
  transition: 0.3s;
}

.movie-card:hover {
  transform: scale(1.05);
  box-shadow: 0 0 1rem #e83e8c60;
}

.movie-card img {
  width: 100%;
  height: 270px;
  object-fit: cover;
}

.movie-title {
  padding: 0.5rem;
  font-size: 0.9rem;
}
</style>
