<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'
import NavBar from '@/components/NavBar.vue'
import SideBar from '@/components/SideBar.vue'
import FooterComponent from '@/components/FooterComponent.vue'

const dramaMovies = ref([])  // alterado de romanceMovies
const featuredMovie = ref(null)
const cast = ref([])
const trailer = ref(null)

async function selectMovie(movie) {
  featuredMovie.value = movie

  const movieId = movie.id

  const [credits, videos] = await Promise.all([
    api.get(`movie/${movieId}/credits`, {
      params: { language: 'pt-BR' }
    }),
    api.get(`movie/${movieId}/videos`, {
      params: { language: 'pt-BR' }
    })
  ])

  cast.value = credits.data.cast.slice(0, 5)
  trailer.value = videos.data.results.find(v => v.type === 'Trailer')

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

onMounted(async () => {
  try {
    const response = await api.get('discover/movie', {
      params: {
        with_genres: 18,              // DRAMA
        sort_by: 'popularity.desc',
        'vote_count.gte': 700,
        include_adult: false,
        include_video: false,
        language: 'pt-BR',
        page: 1,
      },
    });

    dramaMovies.value = response.data.results.filter(
      (m) => m.poster_path
    );

    featuredMovie.value = dramaMovies.value[0];

    if (featuredMovie.value) {
      await selectMovie(featuredMovie.value);
    }

  } catch (error) {
    console.error('Erro ao buscar filmes de drama:', error);
  }
});
</script>

<template>
  <nav><NavBar /></nav>
  <SideBar />

  <section class="romance">

    <!-- TITULO -->
    <h1 class="page-title">Drama</h1>

    <!-- BANNER PRINCIPAL -->
    <main v-if="featuredMovie" class="featured">
      <img
        class="featured-bg"
        :src="`https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`"
        alt="Capa"
      />
      <div class="overlay"></div>

      <div class="featured-info">
        <h2 class="featured-title">{{ featuredMovie.title }}</h2>
        <p class="featured-desc">{{ featuredMovie.overview }}</p>
        <p class="featured-genre">Gêneros: Drama</p>
      </div>
    </main>

    <!-- DETALHES: TRAILER + ELENCO -->
    <section v-if="featuredMovie" class="details">
      <div class="trailer" v-if="trailer">
        <iframe
          width="100%"
          height="250"
          :src="`https://www.youtube.com/embed/${trailer.key}`"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
      <div class="romance-gradient-bar"></div>
      <div class="cast" v-if="cast.length">
        <h3>Elenco principal</h3>
        <div class="cast-list">
          <div v-for="person in cast" :key="person.id" class="cast-card">
            <img
              v-if="person.profile_path"
              :src="`https://image.tmdb.org/t/p/w200${person.profile_path}`"
              :alt="person.name"
            />
            <div class="cast-name">{{ person.name }}</div>
            <div class="cast-role">{{ person.character }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- FILMES EM GRID -->
    <section class="movie-section">
        <div class="movie-list">
      <div
        v-for="movie in dramaMovies"
        :key="movie.id"
        class="movie-card"
        @click="selectMovie(movie)"
      >
        <img
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
          :alt="movie.title"
        />
        <p class="movie-title">{{ movie.title }}</p>
      </div>
    </div>
    </section>
  </section>

  <FooterComponent />
</template>

<style scoped>
.romance {
  background: linear-gradient(
    180deg,
    #4f5297 0%,
    #253368 30%,
    #0b1e45 60%,
    #000000 100%
  );
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
  font-family: 'Poppins', sans-serif;
  color: #fff;
  padding-top: 3rem;
}

.page-title {
  font-family: "Rubik Wet Paint", system-ui;
  font-weight: 500;
  text-align: center;
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: #171d2f;
}

/* BANNER DIMINUÍDO */
.featured {
   position: relative;
  height: 50vh; /* altura menor */
  display: flex;
  align-items: flex-end;
  padding: 2rem 3rem;
  margin: 0 auto 2rem auto; /* centraliza horizontalmente */
  max-width: 1250px; /* ajusta a largura do banner */
  border-radius: 1rem;
}

.featured-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.55);
  border-radius: 1rem;
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  border-radius: 1rem;
}

.featured-info {
  position: relative;
  z-index: 2;
  max-width: 45%;
}

.featured-title {
  font-size: 1.6rem; /* menor que 2rem */
  font-weight: 700;
  margin-bottom: 0.3rem;
}

.featured-desc {
  font-size: 0.85rem; /* menor e proporcional */
  margin-bottom: 0.3rem;
  color: #f3f3f3;
}

.featured-genre {
  font-weight: 600;
  font-size: 0.9rem; /* proporcional ao banner menor */
  color: #9da4e6;
}

/* DETALHES */
.details { 
  display: flex; 
  flex-wrap: wrap; 
  flex: 1 1 300px;
  justify-content: center; 
  gap: 2rem; padding: 2rem 3rem; 
  background-color: #212944; margin: 2vw; 
  border-radius: 2vw;
 } 

/* TRAILER */
  .trailer { 
  flex: 1 1 450px; 
  box-shadow: 0 0 20px; 
  overflow: hidden; 
  border-radius: 0.8rem;
  background-color: transparent;
 }

.cast {
  flex: 1 1 300px; /* menor largura */
}

.cast-list {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem; /* menor gap */
  justify-content: flex-start; /* alinhamento melhor */
}

.cast-card {
  width: 80px; /* menor que 80px */
  text-align: center;
}

.cast-card img {
  width: 100%;
  height: 100px; /* define altura fixa proporcional */
  object-fit: cover;
  border-radius: 0.4rem;
}

.cast-name {
  font-size: 0.75rem;
  font-weight: 500;
  color: #fff;
}

.cast-role {
  font-size: 0.65rem;
  color: #ddd;
}


/* GRID DE FILMES RETO */
.movie-section {
  padding: 1.5rem 3rem 4rem;
  text-align: center;
}

.movie-list {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 40px;
  justify-items: center;
}

.movie-card {
  position: relative;
  width: 150px;
  cursor: pointer;
  overflow: hidden;
}

.movie-card img {
  width: 100%;
  height: 230px;
  object-fit: cover;
  display: block;
}

/* NOME APARECE SÓ NO HOVER */
.movie-title {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin: 0;
  padding: 5px;
  background: rgba(0,0,0,0.6);
  color: white;
  text-align: center;
  opacity: 0;
  transition: opacity 0.2s;
}

.movie-card:hover .movie-title {
  opacity: 1;
}



@keyframes fall {
  0% {
    transform: translateY(-10vh) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateY(110vh) scale(0.8);
    opacity: 0;
  }
}

/* RESPONSIVO */
@media (max-width: 768px) {
  .featured {
    height: 40vh;
    padding: 1rem 2rem;
  }
}
</style>
