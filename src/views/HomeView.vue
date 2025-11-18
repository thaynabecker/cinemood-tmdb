<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import { useRouter } from 'vue-router';

const router = useRouter();


const movies = ref([]);

const emojiGenres = [
  { image: '/img/emojiromance.png', name: 'Romance', id: 1 },
  { image: '/img/emojicomedia.png', name: 'Comédia', id: 2 },
  { image: '/img/emojiterror.png', name: 'Terror', id: 3 },
  { image: '/img/emojificcao.png', name: 'Ficção Científica', id: 4 },
  { image: '/img/emojimisterio.png', name: 'Mistério', id: 5 },
];

onMounted(async () => {
  const response = await api.get('movie/popular?language=pt-BR');
  movies.value = response.data.results;
});

const goToGenre = (genreId) => {
  router.push({ name: 'Filmes', query: { genre: genreId } });
};
</script>

<template>
  <section class="home">
    <div class="inicio">
      <img src="/img/cinemood.png" alt="logo">
      <h1 class="title">Recomendações <br></br>cinematográficas <br>baseadas no seu <br>humor.</h1>
    </div>

    <div class="emoji-section">
      <div v-for="item in emojiGenres" :key="item.id" class="emoji-card" @click="goToGenre(item.id)">
        <img :src="item.image" class="emoji" />
        <p>{{ item.name }}</p>
      </div>
    </div>
    <button class="botao-emocoes">COMBINAR EMOÇÕES</button>

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
.inicio {
  margin: 0 0vw 0 25vw;
  padding: 0 3vw 0 0;
  display: flex;
  align-items: center; /* deixa eles alinhadinhos na vertical */
  gap: 1rem; /* dá espaço entre a imagem e o h1 */
}
.inicio img {
  width: 25vw;  /* coloca o tamanho que quiser */
  height: auto;
}

.title {
  font-size: 2rem;
}

.cinemood {
  color: #52fff6;
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
  margin: 2rem 0 0 0;
}

.emoji-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: 0.3s ease;
}

/* remove bordas, fundo, tudo */
.emoji-card {
  background: none;
  box-shadow: none;
  padding: 0;
}

/* só o emoji aparece inicialmente */
.emoji-card p {
  margin-top: 0.5rem;
  color: #b5b5b5; /* cinza */
  opacity: 0;     /* começa invisível */
  transition: 0.3s ease;
}

/* o emoji */
.emoji {
  width: 70px;
  height: 70px;
  transition: 0.3s ease;
  border-radius: 50%;
}

/* quando passa o mouse */
.emoji-card:hover .emoji {
  transform: scale(1.15);
  box-shadow: 0 0 20px 8px #52fff6; /* glow verde água suave */
  background: radial-gradient(circle, #52fff620 0%, #00000000 70%);
}

/* aparece a escrita só no hover */
.emoji-card:hover p {
  opacity: 1;
}

.botao-emocoes {
  margin: 4vw 40vw 4vw 40vw;
  padding: 0.5vw 0 0.5vw 0;
  background-color: #52fff6;
  border-radius: 100vw;
  color: black;
  font-size: medium;
  font-weight: bolder;
}

.movie-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  border-radius: 100px;
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
