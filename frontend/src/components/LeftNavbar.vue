<template>
  <div id="leftnavbar">
    <div v-for="(categoria, index) in categorias" :key="index">
        <div @click="$emit('mudarCategoria', categoria.valor)" class="categoria">
            {{categoria.nome}}
        </div>
    </div>
    
  </div>
</template>

<script>
export default {
    name: "Leftnavbar",
    props: {
        categorias: Array
    },
    emits: ['mudarCategoria']
}
</script>

<style scoped>
    #leftnavbar {
        min-width: 10vw;
        height: 90vh;
        overflow: auto;
        color: #FFF;
        background-color: rgb(138, 7, 7);
    }

    .categoria {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100px;
        width: 100%;
        border-bottom: 1px solid #cccccc4f;
    }

    .categoria a {
        color: #FFF;
        text-decoration: none;
        margin: 10px 20px;
    }

    .categoria:hover {
        cursor: pointer;
        background-color: rgb(109, 8, 8);
    }
</style>