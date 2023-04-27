<template>
  <div class="searchBar">
    <input type="text" placeholder="Search..." v-model="value">
    <button @click="$emit('search', value)"><font-awesome-icon icon="fa-solid fa-magnifying-glass"/></button>
  </div>
</template>

<script>
export default {
    name: 'SearchBar',
    emits: ['search'],
    data() {
        return {
            value: null
        }
    }
}
</script>

<style>
    .searchBar input{
        width: 400px;
        padding: 5px;
    }

    .searchBar button {
        margin-left: 5px;
        padding: 5px;
        color: #FFF;
        background-color: rgb(12, 104, 141);
    }
</style>