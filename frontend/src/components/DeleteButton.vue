<template>
    <div>
      <button class="deleteBtn"><font-awesome-icon icon="fa-solid fa-trash" /></button>
    </div>
  </template>
  
  <script>
  export default {
      name: "DeleteButton"
  }
  </script>
  
  <style>
    .deleteBtn {
      padding: 3px;
      border-radius: 20%;
      color: #FFF;
      background-color: rgb(255, 0, 0);
      cursor: pointer;
    }
  </style>