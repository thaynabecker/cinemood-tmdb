<template>
  <head>
    <link
      href="https://fonts.googleapis.com/css2?family=Parisienne&display=swap"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=search"
    />
  </head>

  <header class="header">
    <div class="logo"><img src="#" alt=""></div>

   <nav class="nav">
  <router-link to="/" class="nav-item" active-class="active">HOME</router-link>
  <router-link to="/tv" class="nav-item" active-class="active">TV SHOW</router-link>
  <router-link to="/filmes" class="nav-item" active-class="active">MOVIES</router-link>
  <router-link to="/new" class="nav-item" active-class="active">NEW</router-link>
</nav>

    <div class="actions">
      <div class="search-box">
        <input type="text" placeholder="SEARCH" />
        <i class="icon-search"><span class="material-symbols-outlined"> search </span></i>
      </div>
      <i class="icon"></i>
      <i class="icon"></i>

      <img class="user-avatar" src="https://i.pravatar.cc/40" alt="User" />
    </div>
  </header>
</template>
<style>
.header {
  width: 100%;
  padding: 5px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
background: linear-gradient(90deg, #000000, rgba(0, 239, 255, 0.753));

  color: white;
  font-family: 'Poppins', sans-serif;
}
.logo {
  font-family: 'Parisienne', cursive;
  font-size: 38px;
  font-weight: 400;
  letter-spacing: 1.5px;
  color: #fff;
}

/* MENU */
.nav {
  display: flex;
  gap: 65px;
}

.nav a {
  font-size: 13px;
  letter-spacing: 1px;
  color: #dcdcdc;
  text-decoration: none;
  transition: 0.3s;
}

.nav a:hover,
.nav a.active {
  color: white;
}

/* AÇÕES */
.actions {
  display: flex;
  align-items: center;
  gap: 18px;
}

/* SEARCH BOX */
.search-box {
  position: relative;
  background: rgba(255, 255, 255, 0.12);
  padding: 6px 12px;
  border-radius: 20px;
}

.search-box input {
  border: none;
  background: transparent;
  outline: none;
  color: white;
  font-size: 13px;
  width: 160px;
}

.search-box .icon-search {
  position: absolute;
  right: 10px;
  top: 6px;
  pointer-events: none;
}

/* ÍCONES */
.icon {
  font-size: 18px;
  cursor: pointer;
  opacity: 0.85;
  transition: 0.2s;
}

.icon:hover {
  opacity: 1;
}

/* AVATAR */
.user-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 2px solid white;
}
</style>
