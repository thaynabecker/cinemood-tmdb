<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/plugins/axios'
import NavBar from '@/components/NavBar.vue'
import SideBar from '@/components/SideBar.vue'
import PopularCarousel from '@/components/PopularCarousel.vue'
import FooterComponent from '@/components/FooterComponent.vue'

const movies = ref([])
const series = ref([])
const selectedMovie = ref(null)

/* ---------------- CARROSSEL ---------------- */
const currentIndex = ref(0)
const itemsPerPage = 5

// array filmes e séries
const combinedItems = computed(() => [...movies.value, ...series.value])

const visibleMovies = computed(() => combinedItems.value.slice(currentIndex.value, currentIndex.value + itemsPerPage))

const canGoNext = computed(() => currentIndex.value + itemsPerPage < combinedItems.value.length)
const canGoPrev = computed(() => currentIndex.value > 0)

function next() {
  if (canGoNext.value) currentIndex.value++
}
function prev() {
  if (canGoPrev.value) currentIndex.value--
}

/* ------------------------------------------- */

async function fetchPopular() {
  try {
    const resMovies = await api.get("movie/popular?language=pt-BR&page=1")
    movies.value = resMovies.data.results || []

    const resSeries = await api.get("tv/popular?language=pt-BR&page=1")
    series.value = resSeries.data.results || []

    if (combinedItems.value.length && !selectedMovie.value) {
      selectedMovie.value = combinedItems.value[0]
    }
  } catch (error) {
    console.error("Erro ao carregar filmes/séries:", error)
  }
}

function selectMovie(item) {
  selectedMovie.value = item
}

onMounted(() => fetchPopular())

const selectedGenres = computed(() => {
  if (!selectedMovie.value) return ''
  const genresMap = {
    28:'Ação',12:'Aventura',16:'Animação',35:'Comédia',80:'Crime',
    99:'Documentário',18:'Drama',10751:'Família',14:'Fantasia',36:'História',
    27:'Terror',10402:'Música',9648:'Mistério',10749:'Romance',878:'Ficção Científica',
    10770:'Cinema TV',53:'Thriller',10752:'Guerra',37:'Faroeste'
  }
  return (selectedMovie.value.genre_ids || []).map(id => genresMap[id]).join(', ')
})

const formattedDate = computed(() => {
  if (!selectedMovie.value) return ''
  const dateStr = selectedMovie.value.release_date || selectedMovie.value.first_air_date
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return new Intl.DateTimeFormat('pt-BR').format(date)
})
</script>

<template>
  <div class="app">
    <nav><NavBar /></nav>
    <SideBar />

    <!-- BANNER -->
    <div class="banner" v-if="selectedMovie" :style="{ backgroundImage: 'url(https://image.tmdb.org/t/p/original' + selectedMovie.backdrop_path + ')' }">
      <div class="banner-content">
        <h1>{{ selectedMovie.title || selectedMovie.name }}</h1>
        <p>{{ selectedMovie.overview }}</p>
        <p>{{ formattedDate }} - {{ selectedGenres }}</p>
      </div>
    </div>

    <!-- CARROSSEL-->
    <div class="cards-wrapper">
      <button v-if="canGoPrev" class="prev-btn" @click="prev">‹</button>

      <div class="cards-list">
        <div v-for="movie in visibleMovies" :key="movie.id" class="mini-card"
          :class="{ active: movie.id === selectedMovie.id }" @click="selectMovie(movie)">
          <img :src="'https://image.tmdb.org/t/p/w200' + movie.poster_path" />
        </div>
      </div>

      <button v-if="canGoNext" class="next-btn" @click="next">›</button>
    </div>

    <!--TOP 10 POPULARES-->
    <div class="list-movies">
      <PopularCarousel type="series" />
      <PopularCarousel type="movies" />
    </div>

    <FooterComponent />
  </div>
</template>

<style scoped>
  .app {
    color: white;
    background: #0a0a0a;
    min-height: 100vh;
  }

  /* ---------------- BANNER ---------------- */

  .banner {
    height: 100vh;
    background-size: cover;
    background-position: center;
    position: relative;
    display: flex;
    align-items: flex-end;
    padding: 40px;
    overflow: hidden;
  }

  .banner::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent 35%);
  }

  .banner-content {
    position: relative;
    z-index: 2;
    background: none;
    padding: 20px;
    max-width: 650px;
  }

  .banner-content h1 {
    color: #ffffff;
    font-family: "Georgia";
    font-size: 3vw;
  }

  /* ---------------- CARROSSEL ---------------- */

  .cards-wrapper {
    position: absolute;
    bottom: 22px;
    left: 50%;
    /* começa do meio da tela */
    display: flex;
    align-items: center;
    gap: 12px;
    z-index: 4;
    transform: none;
    /* remove o translateX(-50%) para não centralizar */
  }

  .cards-list {
    display: flex;
    gap: 12px;
  }

  .mini-card {
    width: 140px;
    height: 190px;
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    border: 2px solid transparent;
    transition: 0.18s ease;
  }

  .mini-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .mini-card.active {
    border-color: #24b1bb;
    transform: translateY(-6px);
  }

  /* ---------------- SETAS ---------------- */

  .cards-wrapper button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    border: none;
    color: white;
    font-size: 30px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    z-index: 10;
  }

  .cards-wrapper:hover button {
    opacity: 1;
  }

  .prev-btn {
    left: -20px;
  }

  .next-btn {
    right: -20px;
  }

  /* ---------------- Responsividade ---------------- */

  @media (max-width: 900px) {
    .banner {
      height: 60vh;
    }

    .mini-card {
      width: 90px;
      height: 130px;
    }
  }

  @media (max-width: 520px) {
    .banner {
      height: 50vh;
    }

    .mini-card {
      width: 70px;
      height: 100px;
    }
  }
</style>
