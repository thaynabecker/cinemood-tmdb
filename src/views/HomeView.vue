<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const genres = ref([]);
const movies = ref([]);

// Emojis associados a gêneros populares
const emojiGenres = [
  { emoji: '😍', name: 'Romance', id: 10749 },
  { emoji: '😂', name: 'Comédia', id: 35 },
  { emoji: '😱', name: 'Terror', id: 27 },
  { emoji: '🚀', name: 'Ficção Científica', id: 878 },
  { emoji: '🕵️‍♀️', name: 'Mistério', id: 9648 },
  { emoji: '⚔️', name: 'Ação', id: 28 },
];

// Carregar filmes populares
onMounted(async () => {
  const response = await api.get('movie/popular?language=pt-BR');
  movies.value = response.data.results;
});

// Redireciona ao clicar no emoji
const goToGenre = (genreId) => {
  router.push({ name: 'Filmes', query: { genre: genreId } });
};
</script>

<template>
  <section class="home">
    <div class="intro">
      <h1 class="title">🎬 Bem-vindo(a) ao <span class="cinemood">CineMood</span>!</h1>
      <p class="subtitle">Escolha um tema e descubra o clima do seu filme 😍</p>
    </div>

    <div class="emoji-section">
      <div
        v-for="item in emojiGenres"
        :key="item.id"
        class="emoji-card"
        @click="goToGenre(item.id)"
      >
        <span class="emoji">{{ item.emoji }}</span>
        <p>{{ item.name }}</p>
      </div>
    </div>

    <h2 class="movie-section-title">🔥 Filmes Populares</h2>
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
.home {
  text-align: center;
  background-color: #0f0f1b;
  color: #fff;
  padding: 2rem;
}

.title {
  font-size: 2rem;
}

.cinemood {
  color: #e83e8c;
}

.subtitle {
  margin-top: 0.5rem;
  font-size: 1.2rem;
  color: #ccc;
}

.emoji-section {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin: 2rem 0;
}

.emoji-card {
  background-color: #1e1e2f;
  border-radius: 1rem;
  padding: 1rem;
  cursor: pointer;
  width: 6rem;
  transition: 0.3s;
  box-shadow: 0 0 10px #e83e8c50;
}

.emoji-card:hover {
  transform: scale(1.1);
  background-color: #e83e8c;
  color: #fff;
}

.emoji {
  font-size: 2rem;
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
