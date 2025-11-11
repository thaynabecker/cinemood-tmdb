<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'

const romanceMovies = ref([])
const featuredMovie = ref(null)
const cast = ref([])
const trailer = ref(null)

onMounted(async () => {
  try {
    // Busca filmes de romance
    const response = await api.get('discover/movie', {
      params: {
        with_genres: 10749, // romance
        language: 'pt-BR',
        page: 1,
      },
    })
    romanceMovies.value = response.data.results
    featuredMovie.value = romanceMovies.value[0]

    // Busca detalhes do filme principal
    if (featuredMovie.value) {
      const movieId = featuredMovie.value.id

      const [credits, videos] = await Promise.all([
        api.get(`movie/${movieId}/credits`, { params: { language: 'pt-BR' } }),
        api.get(`movie/${movieId}/videos`, { params: { language: 'pt-BR' } }),
      ])

      cast.value = credits.data.cast.slice(0, 5)
      trailer.value = videos.data.results.find(v => v.type === 'Trailer')
    }

    createHearts()
  } catch (error) {
    console.error('Erro ao buscar filmes de romance:', error)
  }
})

function createHearts() {
  const container = document.querySelector('.hearts')
  if (!container) return

  for (let i = 0; i < 25; i++) {
    const heart = document.createElement('span')
    heart.classList.add('heart')
    heart.style.left = Math.random() * 100 + 'vw'
    heart.style.animationDuration = Math.random() * 3 + 2 + 's'
    container.appendChild(heart)
    setTimeout(() => heart.remove(), 5000)
  }

  setInterval(createHearts, 4000)
}
</script>

<template>
  <section class="romance">
    <div class="hearts"></div>

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
        <p class="featured-genre">Gêneros: Romance</p>
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
      <h2>Ver mais filmes recomendados</h2>
      <div class="movie-list">
        <div v-for="movie in romanceMovies" :key="movie.id" class="movie-card">
          <img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            :alt="movie.title"
          />
          <p class="movie-title">{{ movie.title }}</p>
        </div>
      </div>
    </section>
  </section>
</template>

<style scoped>
.romance {
  background: linear-gradient(180deg, #ffb3d1 0%, #fdd6eb 40%, #fff0f7 100%);
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
  justify-content: start;
  padding: 3rem;
}

.featured-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.5);
  border-radius: 0 0 2rem 2rem;
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
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
  color: #f3f3f3;
}

.featured-genre {
  font-weight: 600;
  color: #ffd6e9;
}

.details {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  padding: 2rem 3rem;
}

.trailer {
  flex: 1 1 450px;
  max-width: 550px;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 0 20px #e83e8c80;
}

.cast {
  flex: 1 1 450px;
}

.cast h3 {
  color: #6b0035;
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
  color: #6b0035;
}

.cast-role {
  font-size: 0.8rem;
  color: #b73f7e;
}

.movie-section {
  padding: 1.5rem 3rem 4rem;
  text-align: center;
}

.movie-section h2 {
  color: #6b0035;
  margin-bottom: 1rem;
}

.movie-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 0.8rem;
  justify-items: center;
}

.movie-card {
  background-color: #2a0f1f;
  border-radius: 0.8rem;
  overflow: hidden;
  width: 150px;
  transition: 0.3s;
}

.movie-card:hover {
  transform: scale(1.06);
  box-shadow: 0 0 1rem #e83e8c60;
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
}

/* corações animados */
.hearts {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.heart {
  position: absolute;
  color: #ffb6c1;
  font-size: 1.2rem;
  animation: fall 5s linear forwards;
}

.heart::before {
  content: '💖';
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
</style>
