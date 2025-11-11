<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'

const romanceMovies = ref([])
const featuredMovie = ref(null)

// Função para buscar filmes de romance
onMounted(async () => {
  try {
    const response = await api.get('discover/movie', {
      params: {
        with_genres: 10749, // ID de romance
        language: 'pt-BR',
        page: 1,
      },
    })
    romanceMovies.value = response.data.results
    featuredMovie.value = romanceMovies.value[0]
    createHearts()
  } catch (error) {
    console.error('Erro ao buscar filmes de romance:', error)
  }
})

// Função para criar corações animados
function createHearts() {
  const container = document.querySelector('.hearts')
  if (!container) return

  for (let i = 0; i < 30; i++) {
    const heart = document.createElement('span')
    heart.classList.add('heart')
    heart.style.left = Math.random() * 100 + 'vw'
    heart.style.animationDuration = Math.random() * 3 + 2 + 's'
    container.appendChild(heart)

    setTimeout(() => {
      heart.remove()
    }, 5000)
  }

  setInterval(createHearts, 4000)
}
</script>

<template>
  <section class="romance">
    <div class="hearts"></div>

    <header class="header">
      <h1 class="logo">Romance</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/tv">TV Show</a>
        <a href="/filmes">Movies</a>
      </nav>
    </header>

    <main v-if="featuredMovie" class="featured">
      <img
        class="featured-bg"
        :src="`https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`"
        alt="Capa"
      />
      <div class="featured-info">
        <h2 class="featured-title">{{ featuredMovie.title }}</h2>
        <p class="featured-desc">{{ featuredMovie.overview }}</p>
        <p class="featured-genre">Gênero: Romance</p>
      </div>
    </main>

    <section class="movie-section">
      <h2>💖 Ver mais filmes recomendados</h2>
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
  background: linear-gradient(180deg, #f5a3c7, #fbd0e2);
  min-height: 100vh;
  color: #fff;
  overflow-x: hidden;
  position: relative;
  font-family: 'Poppins', sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.logo {
  font-family: 'Great Vibes', cursive;
  font-size: 2rem;
  color: #fff;
}

nav a {
  color: white;
  margin-left: 1.5rem;
  text-decoration: none;
  font-weight: 500;
}

.featured {
  position: relative;
  text-align: left;
  padding: 2rem;
  color: white;
}

.featured-bg {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 1rem;
  filter: brightness(0.6);
}

.featured-info {
  position: absolute;
  top: 40%;
  left: 3rem;
  max-width: 40%;
}

.featured-title {
  font-size: 3rem;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
}

.featured-desc {
  margin-top: 1rem;
  font-size: 1rem;
  color: #f9f9f9;
}

.featured-genre {
  margin-top: 0.5rem;
  font-weight: 600;
}

.movie-section {
  padding: 2rem;
  text-align: center;
}

.movie-section h2 {
  color: #6b0035;
  margin-bottom: 1.5rem;
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
  text-align: center;
}

/* corações animados */
.hearts {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
