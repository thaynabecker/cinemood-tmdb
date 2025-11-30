<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import api from '@/plugins/axios'

const props = defineProps({
  type: { type: String, required: true } // 'movies' ou 'series'
})

const items = ref([])
const carousel = ref(null)
const canScrollPrev = ref(false)
const canScrollNext = ref(true)

const genres = {
  28: 'Ação', 12: 'Aventura', 16: 'Animação', 35: 'Comédia',
  80: 'Crime', 99: 'Documentário', 18: 'Drama', 10751: 'Família',
  14: 'Fantasia', 36: 'História', 27: 'Terror', 10402: 'Música',
  9648: 'Mistério', 10749: 'Romance', 878: 'Ficção Científica',
  10770: 'Cinema TV', 53: 'Thriller', 10752: 'Guerra', 37: 'Faroeste'
}

async function fetchPopular() {
  try {
    const url = props.type === 'movies' ? 'movie/popular' : 'tv/popular';
    const res = await api.get(`${url}?language=pt-BR&page=1`);
    items.value = res.data.results.slice(0, 10);
    checkScroll()
  } catch (error) {
    console.error('Erro ao carregar', props.type, error)
  }
}

function scroll(direction) {
  carousel.value.scrollBy({
    left: direction * 380, // mais espaçamento
    behavior: 'smooth'
  })
  setTimeout(checkScroll, 200) // atualiza estado das setas
}

function checkScroll() {
  if (!carousel.value) return
  canScrollPrev.value = carousel.value.scrollLeft > 0
  canScrollNext.value = carousel.value.scrollLeft + carousel.value.clientWidth < carousel.value.scrollWidth
}

onMounted(() => fetchPopular())
watchEffect(() => checkScroll())
</script>

<template>
  <section class="carousel-section" v-if="items.length">
    <h2 v-if="props.type === 'movies'"><span>TOP 10 </span> FILMES POPULARES</h2>
    <h2 v-else><span>TOP 10 </span> SÉRIES POPULARES</h2>
    <div class="carousel-wrapper">
      <button v-if="canScrollPrev" class="prev-btn" @click="scroll(-1)">‹</button>
      <div class="carousel" ref="carousel">
        <div v-for="(item, index) in items" :key="item.id" class="carousel-card-wrapper">
          <div class="top-number">{{ index + 1 }}</div>
          <div class="carousel-card">
            <img :src="'https://image.tmdb.org/t/p/w300' + item.poster_path" :alt="item.title || item.name">
            <div class="card-info">
              <h3>{{ item.title || item.name }}</h3>
              <p>{{ item.release_date || item.first_air_date }}</p>
              <p>{{item.genre_ids.map(id => genres[id]).join(', ')}}</p>
            </div>
          </div>
        </div>
      </div>
      <button v-if="canScrollNext" class="next-btn" @click="scroll(1)">›</button>
    </div>
  </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Train+One&display=swap');

.carousel-section {
  margin: 30px 0;
  padding: 20px;
  background-color: #0a0a0a;
}

.carousel-section h2 {
  margin: 0 0 1vw 1vw;
  color: white;
  margin-bottom: 15px;
}

.carousel-section h2 span {
  font-size: 40px;
  font-family: "Train One", system-ui;
  font-weight: 400;
  color: #24b1bb;
  margin-bottom: 15px;
}

.carousel-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.carousel {
  display: flex;
  gap: 70px;
  /* espaçamento maior */
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 10px 60px;
  /* mais à direita para ver o número 1 */
}

.carousel::-webkit-scrollbar {
  display: none;
}

/* Wrapper do card + número */
.carousel-card-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

/* Número do top */
.top-number {
  position: absolute;
  left: -50px;
  bottom: 10px;
  font-size: 48px;
  font-family: "Train One", system-ui;
  font-weight: 400;
  color: #24b1bb;
  background: transparent;
  /* sem borda */
  z-index: 1;
  /* atrás do card */
}

/* Card */
.carousel-card {
  min-width: 180px;
  border-radius: 12px;
  overflow: hidden;
  background-color: #111;
  cursor: pointer;
  position: relative;
  transition: transform 0.3s, box-shadow 0.3s;
}

.carousel-card img {
  width: 100%;
  height: 270px;
  object-fit: cover;
}

/* Dados aparecem só no hover */
.card-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.85);
  color: #ccc;
  padding: 10px;
  text-align: center;
  transform: translateY(100%);
  transition: transform 0.3s;
}

.carousel-card:hover .card-info {
  transform: translateY(0);
}

.card-info h3 {
  font-size: 16px;
  margin-bottom: 4px;
}

.card-info p {
  font-size: 12px;
  margin: 2px 0;
}

/* Hover no card */
.carousel-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
}

/* Setas */
.carousel-wrapper .prev-btn,
.carousel-wrapper .next-btn {
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
  z-index: 10;
}

.carousel-wrapper .prev-btn {
  left: -20px;
}

.carousel-wrapper .next-btn {
  right: -20px;
}
</style>
