<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/plugins/axios'
import NavBar from '@/components/NavBar.vue'
import SideBar from '@/components/SideBar.vue'
import FooterComponent from '@/components/FooterComponent.vue'

const query = ref('')
const movies = ref([])
const series = ref([])
const selectedItem = ref(null)
const genresMap = ref({})

// Mapeando gêneros para mostrar nomes
async function fetchGenres() {
  try {
    const movieRes = await api.get('genre/movie/list?language=pt-BR')
    const tvRes = await api.get('genre/tv/list?language=pt-BR')
    const allGenres = [...movieRes.data.genres, ...tvRes.data.genres]
    genresMap.value = allGenres.reduce((acc, g) => {
      acc[g.id] = g.name
      return acc
    }, {})
  } catch(e) {
    console.error(e)
  }
}

const allItems = computed(() => [...movies.value, ...series.value])

const filteredItems = computed(() => {
  if (!query.value) return allItems.value
  return allItems.value.filter(item => {
    const title = item.title || item.name
    return title.toLowerCase().includes(query.value.toLowerCase())
  })
})

async function fetchData() {
  try {
    const moviesPages = [1, 2, 3, 4, 5];
    const seriesPages = [1, 2, 3, 4, 5];

    let allMovies = [];
    for (const page of moviesPages) {
      const res = await api.get(`movie/popular?language=pt-BR&page=${page}`);
      allMovies = allMovies.concat(res.data.results);
    }
    movies.value = allMovies;

    let allSeries = [];
    for (const page of seriesPages) {
      const res = await api.get(`tv/popular?language=pt-BR&page=${page}`);
      allSeries = allSeries.concat(res.data.results);
    }
    series.value = allSeries;

    await fetchGenres()
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
  }
}

function selectItem(item) {
  selectedItem.value = item
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => fetchData())
</script>

<template>
  <div class="app">
    <nav><NavBar /></nav>
    <SideBar />

    <!-- BARRA DE PESQUISA -->
    <div class="search-bar-wrapper">
      <input
        type="text"
        v-model="query"
        placeholder="Pesquise por filmes ou séries..."
        class="search-bar"
      />
    </div>

    <!-- MINI BANNER CENTRALIZADO -->
    <div v-if="selectedItem" class="mini-banner">
      <div class="mini-banner-bg" :style="{ backgroundImage: 'url(https://image.tmdb.org/t/p/original' + (selectedItem.backdrop_path || selectedItem.poster_path) + ')' }"></div>
      <div class="mini-banner-content">
        <h2>{{ selectedItem.title || selectedItem.name }}</h2>
        <p class="info">{{ selectedItem.release_date || selectedItem.first_air_date }} • 
          {{ (selectedItem.genre_ids || []).map(id => genresMap[id]).join(', ') }}
        </p>
        <p class="overview">{{ selectedItem.overview }}</p>
      </div>
    </div>

    <!-- GRID DE RESULTADOS -->
    <div class="all-movies">
      <div class="movie-grid">
        <div v-for="item in filteredItems" :key="item.id" class="grid-card"
          @click="selectItem(item)">
          <img :src="'https://image.tmdb.org/t/p/w300' + item.poster_path" />
          <p>{{ item.title || item.name }}</p>
        </div>
      </div>
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

/* ---------------- BARRA DE PESQUISA ---------------- */
.search-bar-wrapper {
  display: flex;
  justify-content: center;
  margin: 100px 20px 40px 20px; /* barra mais para baixo */
  background-color: black;
}

.search-bar {
  width: 90%;
  max-width: 900px;
  height: 50px;
  padding: 0 20px;
  font-size: 18px;
  border: 2px solid #24b1bb;
  background: #0a0a0a;
  color: white;
  border-radius: 4px;
  outline: none;
  transition: 0.2s;
}

.search-bar:focus {
  box-shadow: 0 0 8px #24b1bb;
}

/* ---------------- MINI BANNER ---------------- */
.mini-banner {
  position: relative;
  width: 90%;
  max-width: 1000px;
  height: 300px;
  margin: 20px auto 50px auto;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  color: white;
}

.mini-banner-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: brightness(0.5);
}

.mini-banner-bg::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent 50%);
}

.mini-banner-content {
  position: relative;
  z-index: 2;
  padding: 20px;
  max-width: 700px;
}

.mini-banner-content h2 {
  margin: 0 0 5px 0;
  font-size: 24px;
}

.mini-banner-content .info {
  margin: 0 0 3cap 0;
  font-size: 14px;
  color: #ccc;
}

.mini-banner-content .overview {
  font-size: 16px;
  margin: 0 0 30px 0;
  max-height: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ---------------- GRID DE RESULTADOS ---------------- */
.all-movies {
  margin: 0 20px 40px 20px;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 40px;
  justify-items: center;
}

.grid-card {
  position: relative;
  width: 180px;
  height: 270px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.grid-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.grid-card p {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin: 0;
  padding: 10px;
  background: rgba(0,0,0,0.5);
  color: white;
  text-align: center;
  opacity: 0;
  transition: opacity 0.2s;
}

.grid-card:hover p {
  opacity: 1;
}

.grid-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.5);
}

/* Responsivo */
@media (max-width: 1200px) {
  .movie-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .movie-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .movie-grid {
    grid-template-columns: 1fr;
  }

  .mini-banner {
    height: 180px;
  }

  .mini-banner-content .overview {
    max-height: 40px;
  }
}
</style>
