<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'
import FooterComponent from '@/components/FooterComponent.vue'
import HeaderFComponent from '@/components/HeaderFComponent.vue'

const sciFiMovies = ref([])
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

  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(async () => {
  try {
    const response = await api.get('discover/movie', {
      params: {
        with_genres: 878,               // Sci-Fi
        sort_by: 'popularity.desc',
        'vote_count.gte': 700,
        include_adult: false,
        include_video: false,
        language: 'pt-BR',
        page: 1,
      },
    });

    sciFiMovies.value = response.data.results.filter(
      (m) => m.poster_path
    );

    featuredMovie.value = sciFiMovies.value[0];

    if (featuredMovie.value) {
      await selectMovie(featuredMovie.value);
    }

  } catch (error) {
    console.error('Erro ao buscar filmes de Sci-Fi:', error);
  }
});
</script>

<template>
  <section>
    <header>
      <HeaderFComponent />
    </header>
  </section>

  <section class="scifi">
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
        <p class="featured-genre">Gênero: Ficção Científica</p>
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

    <section class="movie-section">
      <h2>Mais filmes de Ficção Científica</h2>

      <div class="movie-list">
        <div
          v-for="movie in sciFiMovies"
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

  <section>
    <footer>
      <FooterComponent />
    </footer>
  </section>
</template>

<style scoped>
.scifi {
  background: linear-gradient(
    180deg,
    #1a2035 10%,
    #1c3c64 35%,
    #155e75 60%,
    #0a0f19 100%
  );
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
  font-family: 'Poppins', sans-serif;
  color: #fff;
}

/* =========================
        FEATURED
===========================*/
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

.featured-info {
  position: relative;
  z-index: 2;
  max-width: 45%;
}

.featured-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.featured-desc {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #dbeafe;
}

.featured-genre {
  font-weight: 600;
  color: #7dd3fc;
}

/* ============================= */
/*  TRAILER + ELENCO             */
/* ============================= */
.details {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  padding: 2rem 3rem;
  background-color: #0f172a;
  margin: 2vw;
  border-radius: 2vw;
}

.trailer {
  flex: 1 1 450px;
  box-shadow: 0 0 20px #38bdf880;
  overflow: hidden;
  border-radius: 0.8rem;
}

.cast {
  flex: 1 1 450px;
}

.cast h3 {
  color: #ffffff;
  margin-bottom: 1rem;
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
}

.cast-name {
  font-weight: 600;
  font-size: 0.9rem;
  color: #ffffff;
}

.cast-role {
  font-size: 0.8rem;
  color: #e2e8f0;
}

/* ============================= */
/*   FILMES RECOMENDADOS         */
/* ============================= */
.movie-section {
  padding: 1.5rem 3rem 4rem;
  text-align: center;
}

.movie-section h2 {
  color: #38bdf8;
  margin-bottom: 1rem;
}

.movie-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 0.8rem;
}

.movie-card {
  background-color: #1e293b;
  border-radius: 0.8rem;
  overflow: hidden;
  width: 150px;
  cursor: pointer;
  transition: 0.3s;
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-card img {
  width: 100%;
  height: 230px;
  object-fit: cover;
}

.movie-title {
  padding: 0.5rem;
  font-size: 0.9rem;
  text-align: center;
  color: #e2e8f0;
}
</style>
