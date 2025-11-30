<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/plugins/axios'
import NavBar from '@/components/NavBar.vue'
import SideBar from '@/components/SideBar.vue'
import PopularCarousel from '@/components/PopularCarousel.vue'
import FooterComponent from '@/components/FooterComponent.vue'

const series = ref([]) // séries
const selectedSeries = ref(null)

/* ---------------- CARROSSEL ---------------- */
const currentIndex = ref(0)
const itemsPerPage = 5

const visibleSeries = computed(() => {
  return series.value.slice(currentIndex.value, currentIndex.value + itemsPerPage)
})

const canGoNext = computed(() => {
  return currentIndex.value + itemsPerPage < series.value.length
})

const canGoPrev = computed(() => {
  return currentIndex.value > 0
})

function next() {
  if (canGoNext.value) currentIndex.value++
}

function prev() {
  if (canGoPrev.value) currentIndex.value--
}

/* ------------------------------------------- */

async function fetchSeries() {
  try {
    const res = await api.get("tv/popular?language=pt-BR&page=1")
    series.value = res.data.results || []

    if (series.value.length && !selectedSeries.value) {
      selectedSeries.value = series.value[0]
    }

  } catch (error) {
    console.error("Erro ao carregar séries:", error)
  }
}

function selectSeries(seriesItem) {
  selectedSeries.value = seriesItem
}

function selectSeriesAndScroll(seriesItem) {
  selectedSeries.value = seriesItem
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
const selectedGenres = computed(() => {
  if (!selectedSeries.value) return ''
  const genresMap = {
    28:'Ação',12:'Aventura',16:'Animação',35:'Comédia',80:'Crime',
    99:'Documentário',18:'Drama',10751:'Família',14:'Fantasia',36:'História',
    27:'Terror',10402:'Música',9648:'Mistério',10749:'Romance',878:'Ficção Científica',
    10770:'Cinema TV',53:'Thriller',10752:'Guerra',37:'Faroeste'
  }
  return (selectedSeries.value.genre_ids || []).map(id => genresMap[id]).join(', ')
})

const formattedDate = computed(() => {
  if (!selectedSeries.value) return ''
  const dateStr = selectedSeries.value.release_date || selectedSeries.value.first_air_date
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return new Intl.DateTimeFormat('pt-BR').format(date)
})
onMounted(() => fetchSeries())
</script>

<template>
  <div class="app">
    <nav><NavBar /></nav>
    <SideBar />

    <!-- BANNER -->
    <div class="banner" v-if="selectedSeries" :style="{
      backgroundImage: 'url(https://image.tmdb.org/t/p/original' + selectedSeries.backdrop_path + ')'
    }">
      <div class="banner-content">
        <h1>{{ selectedSeries.title || selectedSeries.name }}</h1>
        <p>{{ selectedSeries.overview }}</p>
        <p>{{ formattedDate }} - {{ selectedGenres }}</p>
      </div>
    </div>
    <PopularCarousel type="series" />
    <!-- GRID DE SÉRIES -->
    <div class="all-movies">
      <h2>TODAS AS SÉRIES</h2>
      <div class="movie-grid">
        <div v-for="seriesItem in series.slice(0,30)" :key="seriesItem.id" class="grid-card"
          @click="selectSeriesAndScroll(seriesItem)">
          <img :src="'https://image.tmdb.org/t/p/w300' + seriesItem.poster_path" />
          <p>{{ seriesItem.name }}</p>
        </div>
      </div>
    </div>

    <FooterComponent />
  </div>
</template>

<style scoped>
/* mantém exatamente os mesmos estilos do seu código atual, só aplicando para séries */
.app {
  color: white;
  background: #0a0a0a;
  min-height: 100vh;
}

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

.all-movies {
  margin: 40px 20px;
}

.all-movies h2 {
  padding: 0 0 30px 0;
  text-align: center;
  margin-bottom: 20px;
  font-size: 30px;
  font-family: "Train One", system-ui;
  font-weight: 400;
  color: #ffffff;
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
}
</style>
