<template>
  <footer>
    <p>Made with <font-awesome-icon :icon="['fas', 'heart']" style="color: #ff0000;" /> by <strong>Leonnardo Trindade</strong></p>
  </footer>
</template>

<script>
export default {
    name: "Footer"
}
</script>

<style scoped>
    footer {
        height: 5vh;
        background-color: #222;
        color: #FFF;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>