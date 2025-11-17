<template>
  <footer class="cine-footer">
  <div class="footer-content">
    <h2 class="logo">CineMood</h2>

    <p class="desc">
      Sua plataforma de filmes favorita — trailers, elencos e descobertas diárias.
    </p>

    <div class="links">
      <a href="#">Início</a>
      <a href="#">Catálogo</a>
      <a href="#">Gêneros</a>
      <a href="#">Contato</a>
    </div>

    <p class="copy">© 2025 CineMood — Todos os direitos reservados.</p>
  </div>
</footer>

</template>
<style scoped>
.cine-footer {
  background: #05060a; /* azul MUITO escuro, quase preto */
  padding: 40px 20px;

  color: #cdd3df;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.cine-footer .logo {
  font-size: 32px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 2px;
  margin-bottom: 10px;
}

.cine-footer .desc {
  max-width: 500px;
  margin: 0 auto 20px;
  font-size: 14px;
  opacity: 0.8;
}

.cine-footer .links {
  display: flex;
  justify-content: center;
  gap: 25px;
  margin-bottom: 20px;
}

.cine-footer .links a {
  color: #dbe2ef;
  text-decoration: none;
  font-size: 14px;
  transition: 0.3s;
}

.cine-footer .links a:hover {
  color: #ffffff;
  text-shadow: 0 0 6px rgba(255, 255, 255, 0.4);
}

.cine-footer .copy {
  font-size: 12px;
  opacity: 0.6;
}
</style>
