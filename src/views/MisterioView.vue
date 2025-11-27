<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'
import FooterComponent from '@/components/FooterComponent.vue'
import HeaderMComponent from '@/components/HeaderMComponent.vue'

const mysteryMovies = ref([])
const featuredMovie = ref(null)
const cast = ref([])
const trailer = ref(null)

// trocar filme ao clicar
async function selectMovie(movie) {
  featuredMovie.value = movie

  const movieId = movie.id

  const [credits, videos] = await Promise.all([
    api.get(`movie/${movieId}/credits`, {
      params: { language: 'pt-BR' },
    }),
    api.get(`movie/${movieId}/videos`, {
      params: { language: 'pt-BR' },
    }),
  ])

  cast.value = credits.data.cast.slice(0, 5)
  trailer.value = videos.data.results.find((v) => v.type === 'Trailer')

  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// buscar mistério
onMounted(async () => {
  try {
    const response = await api.get('discover/movie', {
      params: {
        with_genres: 9648, // MISTÉRIO
        sort_by: 'popularity.desc',
        'vote_count.gte': 600,
        include_adult: false,
        language: 'pt-BR',
        page: 1,
      },
    })

    mysteryMovies.value = response.data.results.filter((m) => m.poster_path)

    featuredMovie.value = mysteryMovies.value[0]

    if (featuredMovie.value) {
      await selectMovie(featuredMovie.value)
    }
  } catch (error) {
    console.error('Erro ao buscar filmes de mistério:', error)
  }
})
</script>

<template>
  <section>
    <head>
      <link href="https://fonts.googleapis.com/css2?family=Amarante&display=swap" rel="stylesheet">

    </head>
    <header>
      <HeaderMComponent />
    </header>
  </section>

  <section class="mystery">
    <!-- HERO -->
    <main v-if="featuredMovie" class="featured">
      <img
        class="featured-bg"
        :src="`https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`"
        alt="Capa"
      />

      <div class="fog-overlay"></div>

      <div class="featured-info">
        <h2 class="featured-title">{{ featuredMovie.title }}</h2>
        <p class="featured-desc">{{ featuredMovie.overview }}</p>
        <p class="featured-genre">Gênero: Mistério</p>
      </div>
    </main>

    <!-- TRAILER + ELENCO -->
    <section v-if="featuredMovie" class="details">
      <!-- trailer -->
      <div class="trailer" v-if="trailer">
        <iframe
          width="100%"
          height="250"
          :src="`https://www.youtube.com/embed/${trailer.key}`"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>

      <!-- elenco -->
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

    <!-- LISTA -->
    <section class="movie-section">
      <h2>Filmes de Mistério</h2>

      <div class="movie-list">
        <div
          v-for="movie in mysteryMovies"
          :key="movie.id"
          class="movie-card"
          @click="selectMovie(movie)"
        >
          <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title" />

          <p class="movie-title">{{ movie.title }}</p>
        </div>
      </div>
    </section>

    <footer>
      <FooterComponent />
    </footer>
  </section>
</template>

<style scoped>
.mystery {
  background: #03030f;
  min-height: 100vh;
  color: #fff;
  overflow-x: hidden;
  position: relative;
  font-family: 'Poppins', sans-serif;
}

/* ==== HERO ==== */
.featured {
  position: relative;
  height: 70vh;
  display: flex;
  align-items: flex-end;
  padding: 3rem;
}

.featured-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.35);
}

.fog-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(10, 10, 25, 0.3),
    rgba(3, 3, 15, 0.9)
  );
}

.featured-info {
  position: relative;
  z-index: 2;
  max-width: 45%;
}

.featured-title {
  font-size: 3rem;
  font-weight: 700;
  color: #6a5acd;
  text-shadow: 0 0 25px #2e1f70;
}

.featured-desc {
  margin: 1rem 0;
  opacity: 0.9;
}

.featured-genre {
  color: #8b7bff;
  font-weight: bold;
}

/* ==== DETALHES ==== */
.details {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  background: #0b0b1a;
  margin: 2vw;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 20px #2e1f70;
}

.trailer {
  flex: 1 1 450px;
  box-shadow: 0 0 20px #4b3ac2;
  overflow: hidden;
  border-radius: 0.8rem;
}

.cast h3 {
  color: #6a5acd;
}

.cast-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.cast-card {
  width: 100px;
  text-align: center;
}

.cast-card img {
  width: 100%;
  border-radius: 0.5rem;
  filter: brightness(0.8);
}

.cast-name {
  margin-top: 5px;
  font-size: 0.85rem;
}

.cast-role {
  font-size: 0.75rem;
  opacity: 0.7;
}

/* ==== LISTA ==== */
.movie-section {
  padding: 2rem 3rem 4rem;
  text-align: center;
}

.movie-section h2 {
  color: #8b7bff;
  text-shadow: 0 0 10px #3a2b8a;
}

.movie-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
}

.movie-card {
  background: #111122;
  border-radius: 0.8rem;
  overflow: hidden;
  cursor: pointer;
  transition: 0.25s;
  border: 2px solid #2b2466;
}

.movie-card:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px #6a5acd;
}

.movie-card img {
  width: 100%;
  height: 230px;
  object-fit: cover;
  filter: brightness(0.75);
}

.movie-title {
  padding: 0.5rem;
}
</style>
