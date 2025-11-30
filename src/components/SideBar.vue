<script setup>
</script>

<template>
    <section class="sidebar">
        <ul class="side-links">
            <li>
                <router-link to="/romance">
                   <img src="/img/emojiromance.png" alt="emoji-romance">
                </router-link>
            </li>
            <li>
               <router-link to="/comedia">
                   <img src="/img/emojicomedia.png" alt="emoji-comedia">
                </router-link>
            </li>
            <li>
                <router-link to="/terror">
                   <img src="/img/emojiterror.png" alt="emoji-terror">
                </router-link>
            </li>
            <li>
                <router-link to="/drama">
                   <img src="/img/emojidrama.png" alt="emoji-drama">
                </router-link>
            </li>
        </ul>
    </section>
</template>

<style scoped>
/* ---------------- SIDEBAR ---------------- */
.sidebar {
    position: absolute; /* fica sobre o banner */
    top: 40%; /* centraliza verticalmente */
    left: 20px; /* distância da borda esquerda */
    transform: translateY(-50%);
    background-color: rgba(0,0,0,0.3); /* transparente */
    border: 1px solid #24b1bb; /* verde água */
    border-radius: 15px; /* bordas arredondadas */
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 5; /* acima do banner */
}

/* Lista de links */
.side-links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 15px; /* espaço entre emojis */
}

/* Emojis */
.side-links li img {
    width: 50px;
    height: 50px;
    cursor: pointer;
    transition: transform 0.2s, opacity 0.2s;
}

.side-links li img:hover {
    transform: scale(1.2); /* aumenta no hover */
    opacity: 1;
}
/* Aplica sombra verde água quando o link estiver ativo */
.side-links li .router-link-exact-active img {
    box-shadow: 0 0 10px 3px #24b1bb;
    border-radius: 50%; /* mantém arredondado */
}

</style>
