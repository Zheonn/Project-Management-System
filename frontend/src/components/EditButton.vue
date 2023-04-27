<template>
  <div>
    <button class="editBtn"><font-awesome-icon icon="fa-solid fa-pen-to-square" @click="$emit('editItem')"/></button>
  </div>
</template>

<script>
export default {
    name: "EditButton",
    emits: ["editItem"],
    props: {
      id: null
    }
}
</script>

<style>
  .editBtn {
    padding: 3px;
    border-radius: 20%;
    color: #FFF;
    background-color: rgb(49, 101, 197);
    margin-right: 10px;
    cursor: pointer;
  }
</style>