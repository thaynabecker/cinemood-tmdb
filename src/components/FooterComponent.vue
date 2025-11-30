<script setup>
import { useRoute } from 'vue-router'

// Para detectar a rota ativa
const route = useRoute()
</script>

<template>
  <footer class="footer">
    <!-- LOGO -->
    <img src="/img/cinemood.png" alt="logo-cinemood" class="logo">

    <!-- LINHA -->
    <hr class="footer-line" />

    <!-- DIREITOS -->
    <p class="copyright">
      © 2025 BeckAnd CineMood. Todos os direitos reservados.
    </p>
  </footer>
</template>

<style scoped>
.footer {
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  color: white;
  text-align: center;
  padding: 40px 20px;
}

.footer .logo {
  width: 140px;
  height: 140px;
  margin: 0 auto 20px;
  cursor: pointer;
  display: block;
}


/* LINHA */
.footer-line {
  border: 0;
  height: 1px;
  background-color: #24b1bb;
  margin: 20px 0;
  width: 80%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.footer .copyright {
  font-size: 14px;
  color: #ccc;
}

/* HOVER */
.nav-link:hover {
  opacity: 1;
}

/* RESPONSIVO */
@media (max-width: 768px) {
  .nav-links {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
