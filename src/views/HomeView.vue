<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const movies = ref([]);

const emojiGenres = [
  { image: '/img/emojiromance.png', name: 'Romance', id: 10749 },
  { image: '/img/emojicomedia.png', name: 'Comédia', id: 35 },
  { image: '/img/emojiterror.png', name: 'Terror', id: 27 },
  { image: '/img/emojificcao.png', name: 'Ficção Científica', id: 878 },
  { image: '/img/emojimisterio.png', name: 'Mistério', id: 9648 },
];


const selectedGenres = ref([]);

onMounted(async () => {
  const response = await api.get('movie/popular?language=pt-BR');
  movies.value = response.data.results;
});

const toggleGenre = (id) => {
  if (selectedGenres.value.includes(id)) {
    selectedGenres.value = selectedGenres.value.filter(g => g !== id);
  } else {
    selectedGenres.value.push(id);
  }
};

function goToGenre(id) {
  router.push(`/genero/${id}`)
}

</script>

<template>
  <section class="home">
    <div class="inicio">
      <h1 class="title">Recomendações <br>cinematográficas <br>baseadas no seu <br>humor.</h1>
    </div>

    <div class="emoji-section">
      <p>COMO VOCÊ QUER SE SENTIR HOJE?</p>
      <div
        v-for="item in emojiGenres"
        :key="item.id"
        class="emoji-card"
        :class="{ selected: selectedGenres.includes(item.id) }"
        @click="toggleGenre(item.id)"
      >
        <img :src="item.image" class="emoji" />
        <p>{{ item.name }}</p>
      </div>
    </div>

    <div class="movie-list">
      <h2 class="movie-section-title">Filmes Populares</h2>
      <div v-for="movie in movies" :key="movie.id" class="movie-card">
        <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title" />
        <p class="movie-title">{{ movie.title }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home {
  text-align: center;
  background-color: #000000;
  color: #fff;
  padding: 2rem;
}

.montserrat {
  font-family: "Montserrat", sans-serif;
  font-optical-sizing: auto;
  font-style: bold;
}

.inicio {
  margin: 5vw 0vw 5vw 25vw;
  padding: 0 3vw 0 0;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.inicio img {
  width: 25vw;
  height: auto;
}

.title {
  font-size: 2rem;
}

.emoji-section {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 4rem;
  margin: 4vw 0 8vw 0;
  background-color: black;
}
.emoji-section p {
  width: 100%;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #b5b5b5;
}
.emoji-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: 0.3s ease;
  background: none;
  box-shadow: none;
  padding: 0;
}

.emoji-card p {
  margin-top: 0.5rem;
  color: #b5b5b5;
  opacity: 0;
  transition: 0.3s ease;
}

.emoji {
  width: 110px;
  height: 110px;
  transition: 0.3s ease;
  border-radius: 10%;
}


.emoji-card:hover p,
.emoji-card.selected p {
  opacity: 1;
}

.movie-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  background-color: #24b1bb60;
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
  box-shadow: 0 0 1rem #24b1bb60;
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
