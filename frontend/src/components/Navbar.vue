<template>
  <nav>
    <router-link to="/" id="logo-url">
        <img :src="logo" :alt="alt" id="logo">
    </router-link>
    <router-link to="/home">Home</router-link> 
    <router-link to="/projects">Projects</router-link>
    <router-link to="/colaboradores">Employees</router-link>
    <router-link to="/estoque">Stock</router-link>
    <div class="logout-btn" @click="$emit('logout')">Sair</div>
    <!-- <router-link to="/frota">Frota</router-link> -->
  </nav>
</template>

<script>
export default {
    name: 'Navbar',
    props: ['logo', 'alt'],
    emits: ["logout"]
}
</script>

<style scoped>
    nav {
        height: 5vh;
        background-color: #222;
        border-bottom: 4px solid #111;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

   #logo-url {
        margin: auto;
        margin-left: 0;
    }

    #logo {
        width: 1.5vw;
        height: 3vh;
        margin: 1vh;
    }

    nav a {
        color: #FFF;
        text-decoration: none;
        margin: 12px;
        transition: 0.3s;
    }

    nav a:hover {
        color: rgb(150, 7, 7);
    }

    .logout-btn {
        color: #FFF;
        text-decoration: none;
        margin: 12px;
        transition: 0.3s;
    }

    .logout-btn:hover {
        color: rgb(150, 7, 7);
        cursor: pointer;
    }
</style>