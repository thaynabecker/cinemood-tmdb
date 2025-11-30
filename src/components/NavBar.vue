<script setup>
import { useRoute } from 'vue-router'

// Para detectar a rota ativa
const route = useRoute()
</script>
<template>
    <nav class="navbar">
        <!-- LOGO -->
        <img src="/img/cinemood.png" alt="logo-cinemood" class="logo">
        <!-- LINKS -->
        <ul class="nav-links">
            <li>
                <router-link to="/" class="nav-link" :class="{ active: route.path === '/' }">
                    Início
                    <span class="underline" v-if="route.path === '/'"></span>
                </router-link>
            </li>
            <li>
                <router-link to="/filmes" class="nav-link" :class="{ active: route.path === '/filmes' }">
                    Filmes
                    <span class="underline" v-if="route.path === '/filmes'"></span>
                </router-link>
            </li>
            <li>
                <router-link to="/series" class="nav-link" :class="{ active: route.path === '/series' }">
                    Séries
                    <span class="underline" v-if="route.path === '/series'"></span>
                </router-link>
            </li>
        </ul>
        <div class="sobre-nos" @click="$router.push('/sobre')" :class="{ active: route.path === '/sobre' }">
            <p>Sobre Nós</p>
        </div>

        <div class="barra-pesquisa" @click="$router.push('/search')" :class="{ active: route.path === '/search' }">
            <span class="material-symbols-outlined">search</span>
        </div>
    </nav>
</template>

<style scoped>
/* ---------------- NAVBAR ---------------- */
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* centraliza a UL */
    padding: 0 40px;
    z-index: 1000;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), transparent);
}

/* LOGO */
.logo {
    position: absolute;
    left: 30px;
    height: 130px;
    width: 130px;
    cursor: pointer;
}

/* LINKS */
.nav-links {
    display: flex;
    gap: 50px;
    list-style: none;
    justify-content: center;
    margin: 0 auto;
    /* garante centralização */
    padding: 0;
}

.nav-link {
    position: relative;
    color: white;
    font-size: 18px;
    font-weight: 500;
    text-decoration: none;
    opacity: 0.5;
    transition: opacity 0.2s ease-in-out;
}

.nav-link.active {
    opacity: 1;
}

/* LINHA EMBAIXO DO LINK ATIVO */
.nav-link .underline {
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background: white;
    border-radius: 1px;
}

/* HOVER opcional */
.nav-link:hover {
    opacity: 1;
}

/* SOBRE NÓS */
.sobre-nos {
    position: relative;
    right: 40px;
    font-size: 16px;
    font-weight: 500;
    /* distância da borda direita */
    display: flex;
    align-items: center;
    cursor: pointer;
    color: white;
    opacity: 0.5;
    transition: opacity 0.2s ease-in-out;
}

.sobre-nos:hover {
    opacity: 1;
}

.sobre-nos:hover span {
    color: white;
}

/* ÍCONE/PESQUISA no canto direito */
.barra-pesquisa {
    position: absolute;
    right: 40px;
    /* distância da borda direita */
    display: flex;
    align-items: center;
    cursor: pointer;
    color: white;
    opacity: 0.5;
    transition: opacity 0.2s ease-in-out;
}

.barra-pesquisa:hover {
    opacity: 1;
}

.barra-pesquisa:hover span {
    color: white;
}
.sobre-nos.active,
.barra-pesquisa.active {
    opacity: 1 !important;
    color: white !important;
}

.barra-pesquisa.active span {
    color: white !important;
}

.sobre-nos.active p {
    color: white !important;
}

/* RESPONSIVO */
@media (max-width: 768px) {
    .nav-links {
        gap: 20px;
    }

    .barra-pesquisa {
        right: 20px;
    }
}
</style>
