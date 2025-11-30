<script setup>
import NavBar from '@/components/NavBar.vue'
import SideBar from '@/components/SideBar.vue'
import FooterComponent from '@/components/FooterComponent.vue'
</script>
<template>
    <nav>
        <NavBar />
    </nav>
    <div class="about-page">
        <section class="hero">
            <h1>Sobre Nós</h1>
            <p>Nossa plataforma de filmes - seu MOOD</p>
        </section>

        <section class="about-content">
            <div class="card">
                <h2>Nossa História</h2>
                <div class="card-text">
                <p>
                    O projeto CineMood surgiu a partir de uma experiência pessoal da equipe: muitas vezes enfrentamos
                    dificuldades para escolher um filme ou série para assistir, especialmente diante da grande
                    quantidade de opções disponíveis em plataformas de streaming.
                    Diante desse problema, a equipe decidiu desenvolver uma solução que tornasse a escolha de filmes
                    mais rápida, divertida e personalizada, considerando o humor do usuário no momento da decisão.
                </p>
                </div>
            </div>

            <div class="card">
                <h2>O que fazemos</h2>
                <div class="card-text">
                <p>
                    O CineMood é uma plataforma web interativa desenvolvida com o objetivo de ajudar usuários indecisos
                    a escolherem filmes de acordo com o seu humor do momento. Em um mundo com milhões de opções
                    disponíveis em serviços de streaming e catálogos digitais, muitas pessoas passam mais tempo
                    decidindo o que assistir do que, de fato, assistindo algo. Essa indecisão, causada pelo excesso de
                    opções e pela falta de direcionamento emocional, é conhecida como “paradoxo da escolha” — e é
                    exatamente esse o problema que o CineMood pretende resolver.

                </p>
                </div>
            </div>
            <div class="card">
                <h2>Nossa Missão</h2>
                <div class="card-text">
                <p>
                    O objetivo principal do projeto CineMood é criar uma plataforma interativa capaz de recomendar
                    filmes com base no humor do usuário, proporcionando uma experiência de escolha mais personalizada,
                    intuitiva e emocional.
                    Dessa forma, tornar o ato de escolher um filme algo prazeroso, rápido e imersivo, utilizando
                    tecnologia, design e emoção para criar uma experiência personalizada e interativa para o usuário.

                </p>
                </div>
            </div>
        </section>
        <section class="team-section">
            <h2 class="section-title">Nossa Equipe</h2>

            <div class="team-cards">
                <!-- Card 1 -->
                <div class="team-card">
                    <div class="team-info">
                        <h3>Thayná Becker</h3>
                        <p>Desenvolvedora & Criativa</p>
                    </div>
                    <img src="/img/thaynacinemood.jpg" alt="foto-thay">
                </div>

                <!-- Card 2 -->
                <div class="team-card">
                    <div class="team-info">
                        <h3>Amanda Andrade</h3>
                        <p>Desenvolvedora & Criativa</p>
                    </div>
                    <img src="/img/amandacinemood.jpg" alt="foto-amanda">
                </div>
            </div>
        </section>

    </div>
    <SideBar />
    <FooterComponent />
</template>
<style scoped>
.about-page {
    background: #0b0b0d;
    color: #eafdfc;
    min-height: 100vh;
    padding-bottom: 50px;
    animation: fadeIn 0.6s ease;
}

/* HERO */
.hero {
    text-align: center;
    padding: 60px 20px;
    background: linear-gradient(180deg, #0e0f12, #0b0b0d);
}

.hero h1 {
    font-family: "Train One", system-ui;
    font-size: 3rem;
    color: #24b1bb;
    margin-bottom: 10px;
}

.hero p {
    font-size: 1.2rem;
    opacity: 0.8;
}

/* CONTENT CARDS */
.about-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 25px;
    padding: 40px 20px;
    max-width: 1100px;
    margin: auto;
}

.card {
    background: #111214;
    padding: 25px;
    border-radius: 14px;
    border: 1px solid #1a1d20;
    box-shadow: 0 0 15px rgba(78, 242, 194, 0.05);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
    transform: translateY(-6px);
    box-shadow: 0 0 25px rgba(78, 242, 194, 0.2);
}

.card h2 {
    color: #24b1bb;
    margin-bottom: 10px;
    
}

.card-text {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: max-height 0.5s ease, opacity 0.4s ease;
}

/* Só o card que está em hover expande */
.card:hover .card-text {
  max-height: 500px;
  opacity: 1;
}

/* Section */
.team-section {
  max-width: 900px;
  margin: 40px auto;
  padding: 20px;
  text-align: center;
}

.section-title {
  font-family: "Train One", system-ui;
  font-size: 3rem;
  color: #24b1bb;
  font-size: 2.3rem;
  margin-bottom: 25px;
}

/* Cards container */
.team-cards {
  display: flex;
  justify-content: center; /* centraliza */
  gap: 25px;
  flex-wrap: wrap; /* caso fique menor no mobile */
}

/* Each card */
.team-card {
  position: relative;
  background: #111214;
  border-radius: 15px;
  border: 1px solid #1a1d20;
  width: 270px;    
  height: 270px; 
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 0 15px rgba(78, 242, 194, 0.07);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

/* Hover effect */
.team-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 0 25px rgba(78, 242, 194, 0.25);
}

/* Name/info part */
.team-info {
  position: absolute;
  inset: 0;
  background: #111214;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #eafdfc;
  padding: 20px;
  text-align: center;
  z-index: 2;

  /* smooth fade when photo appears */
  transition: opacity 0.4s ease;
}

.team-info h3 {
  font-size: 1.8rem;
  color: #24b1bb ;
}

.team-info p {
  opacity: 0.8;
  margin-top: 5px;
}

/* Image */
.team-card img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 1;
}

/* Hover → show photo, hide name */
.team-card:hover img {
  opacity: 1;
}

.team-card:hover .team-info {
  opacity: 0;
}

/* ANIMATION */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>