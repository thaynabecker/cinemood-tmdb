<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'
import FooterComponent from '@/components/FooterComponent.vue'
import HeaderCComponent from '@/components/HeaderCComponent.vue'

const comedyMovies = ref([])
const featuredMovie = ref(null)
const cast = ref([])
const trailer = ref(null)

async function selectMovie(movie) {
  try {
    featuredMovie.value = movie
    const movieId = movie.id

    const [credits, videos] = await Promise.all([
      api.get(`movie/${movieId}/credits`, { params: { language: 'pt-BR' } }),
      api.get(`movie/${movieId}/videos`, { params: { language: 'pt-BR' } })
    ])

    cast.value = credits.data.cast.slice(0, 5) || []
    trailer.value = videos.data.results.find(v => v.type === 'Trailer') || null

    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (err) {
    console.error('Erro ao selecionar filme:', err)
  }
}

onMounted(async () => {
  try {
    const response = await api.get('discover/movie', {
      params: {
        with_genres: 35,
        sort_by: 'popularity.desc',
        'vote_count.gte': 700,
        include_adult: false,
        language: 'pt-BR',
        page: 1,
      }
    })

    comedyMovies.value = response.data.results.filter(m => m.poster_path)

    if (comedyMovies.value.length > 0) {
      await selectMovie(comedyMovies.value[0])
    }

  } catch (error) {
    console.error('Erro ao buscar filmes de comédia:', error)
  }
})
</script>

<template>
  <section>
    <header><HeaderCComponent /></header>
  </section>

  <section class="comedy">
    <main v-if="featuredMovie" class="featured">
      <img class="featured-bg" :src="`https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`" />
      <div class="overlay"></div>

      <div class="featured-info">
        <h2 class="featured-title">{{ featuredMovie.title }}</h2>
        <p class="featured-desc">{{ featuredMovie.overview }}</p>
        <p class="featured-genre">Comédia</p>
      </div>
    </main>

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

      <div class="cast" v-if="cast.length">
        <h3>Elenco principal</h3>
        <div class="cast-list">
          <div v-for="person in cast" :key="person.id" class="cast-card">
            <img v-if="person.profile_path" :src="`https://image.tmdb.org/t/p/w200${person.profile_path}`" />
            <div class="cast-name">{{ person.name }}</div>
            <div class="cast-role">{{ person.character }}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="movie-section">
      <h2>Mais filmes de comédia</h2>

      <div class="movie-list">
        <div v-for="movie in comedyMovies" :key="movie.id" class="movie-card" @click="selectMovie(movie)">
          <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" />
          <p class="movie-title">{{ movie.title }}</p>
        </div>
      </div>
    </section>
  </section>

  <footer><FooterComponent /></footer>
</template>

<style scoped>
.comedy {
  background: linear-gradient(180deg, #ffe9b3, #ffcf70, #ffb300, #0f0f1b);
  min-height: 100vh;
  color: #fff;
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
  font-family: 'Poppins', sans-serif;
  color: #fff;
}

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
  filter: brightness(0.55);
  border-radius: 0 0 2rem 2rem;
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  border-radius: 0 0 2rem 2rem;
}


.featured-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
}
.featured-info {
  position: relative;
  max-width: 45%;
}
.details {
  padding: 20px;
  margin-top: 20px;
}
.featured-genre {
  font-weight: 600;
  color: #eee7c9;
}

.trailer {
  flex: 1 1 450px;
  box-shadow: 0 0 20px #e83e8c80;
  overflow: hidden;
  border-radius: 0.8rem;
}

/* Barra de gradiente – versão comédia */
.comedy-gradient-bar {
  width: 100%;
  height: 4px;
  background: linear-gradient(to right, #ff66c4, #ff2e63);
  margin: 15px 0;
  border-radius: 4px;
}

/* Título elenco */
.cast h3 {
  font-size: 1.3rem;
  margin-bottom: 10px;
}

/* Lista do elenco organizada */
.cast-list {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

/* Card do ator */
.cast-card {
  width: 120px;
  text-align: center;
}

.cast-card img {
  width: 100%;
  border-radius: 10px;
}

.cast-name {
  margin-top: 5px;
  font-weight: 600;
}

.cast-role {
  font-size: 0.85rem;
  color: #888;
}

.details {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 2rem;
  background: #f8ad32;
  margin: 2vw;
  border-radius: 2vw;
}

.movie-section h2 { color: #f8ad32; }

.movie-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1.2rem;
  padding: 1rem;
}

.movie-card {
  width: 160px;
  background: #3a2200;
  border-radius: 0.8rem;
  overflow: hidden;
  cursor: pointer;
  transition: 0.3s;
}

.movie-card img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}
.movie-title {
  padding: 0.5rem;
  font-size: 0.9rem;
  text-align: center;
}

</style>
