<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'
import FooterComponent from '@/components/FooterComponent.vue'
import HeaderTComponent from '@/components/HeaderTComponent.vue'

const terrorMovies = ref([])
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

// buscar terror
onMounted(async () => {
  try {
    const response = await api.get('discover/movie', {
      params: {
        with_genres: 27, // TERROR
        sort_by: 'popularity.desc',
        'vote_count.gte': 600,
        include_adult: false,
        language: 'pt-BR',
        page: 1,
      },
    })

    terrorMovies.value = response.data.results.filter((m) => m.poster_path)

    featuredMovie.value = terrorMovies.value[0]

    if (featuredMovie.value) {
      await selectMovie(featuredMovie.value)
    }
  } catch (error) {
    console.error('Erro ao buscar filmes de terror:', error)
  }
})
</script>

<template>
  <section>
    <header>
      <HeaderTComponent />
    </header>
  </section>
  <section class="terror">
    <!-- HERO: filme em destaque -->
    <main v-if="featuredMovie" class="featured">
      <img
        class="featured-bg"
        :src="`https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`"
        alt="Capa"
      />

      <div class="blood-overlay"></div>

      <div class="featured-info">
        <h2 class="featured-title">{{ featuredMovie.title }}</h2>
        <p class="featured-desc">{{ featuredMovie.overview }}</p>
        <p class="featured-genre">Gênero: Terror</p>
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

    <!-- LISTA DE TERROR -->
    <section class="movie-section">
      <h2>Ver mais filmes de terror</h2>

      <div class="movie-list">
        <div
          v-for="movie in terrorMovies"
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
.terror {
  background: #000;
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

/* info do destaque */
.featured-info {
  position: relative;
  z-index: 2;
  max-width: 45%;
}

.featured-title {
  font-size: 3rem;
  font-weight: 700;
  color: #ff1a1a;
  text-shadow: 0 0 25px #840000;
}

.featured-desc {
  margin: 1rem 0;
  opacity: 0.9;
}

.featured-genre {
  color: #ff6b6b;
  font-weight: bold;
}

/* ==== SEÇÃO DETALHES ==== */
.details {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  background: #0a0a0a;
  margin: 2vw;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 20px #500000;
}

.trailer {
  flex: 1 1 450px;
  box-shadow: 0 0 20px #900000;
  overflow: hidden;
  border-radius: 0.8rem;
}

.cast h3 {
  color: #ff1a1a;
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

/* ==== GRID FILMES ==== */
.movie-section {
  padding: 2rem 3rem 4rem;
  text-align: center;
}

.movie-section h2 {
  color: #ff1a1a;
  text-shadow: 0 0 10px #600000;
}

.movie-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
}

.movie-card {
  background: #111;
  border-radius: 0.8rem;
  overflow: hidden;
  cursor: pointer;
  transition: 0.25s;
  border: 2px solid #2a0000;
}

.movie-card:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px #b30000;
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
