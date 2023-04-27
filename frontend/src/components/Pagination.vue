<template>
  <div class="pagination"> 
    <h2>Página {{ currentPage + 1}} de {{ pages.length }}</h2>
    <div class="pagination-buttons">
      <button @click="changePage(0, 0, 'start')">&lt;&lt;</button>
      <button @click="changePage(((currentPage - 1) * limit), (currentPage - 1), 'previous')">Previous</button>
      <button @click="changePage(((currentPage + 1) * limit), (currentPage + 1), 'next')">Next</button>
      <button @click="changePage((pages.length - 1) * limit, pages.length - 1, 'final')">&gt;&gt;</button>
    </div>
  </div>
  </template>
  
  <script>
  export default {
    name: 'Pagination',
    data() {
      return {
        pages: [],
        currentPage: null
      }
    },
    props: {
      offset: {
        type: [String, Number],
        default: 0,
      },
      total: {
        type: [String, Number],
        required: true,
      },
      limit: {
        type: [String, Number],
        default: 10,
      },
    },
    computed: {
      current() {
        return this.offset ? this.offset + 1 : 1;
      },
      getPages() {
        const qty = Math.ceil(this.total / this.limit);
        if (qty <= 1) this.pages = [1];
        this.pages = Array.from(Array(qty).keys(), (i) => i + 1);

        this.currentPage = 0
      },
    },
    methods: {
      changePage(offset, currentPage, action) {
        if(action === 'previous' && (this.currentPage - 1) < 0) {
          return
        }
        if(action === 'next' && (currentPage) == this.pages.length) {
          return
        }
        this.$emit('change-page', offset);
        this.currentPage = currentPage 
      },
    },
    mounted() {
      this.getPages
    },
    updated() {
      this.getPages
    }
  };

</script>

<style>
  .pagination {
    display: grid;
      height: 30px;
        width: 95%;
        margin-top: 20px;
        margin-bottom: 20px;
        grid-template-areas: 'pagination';
  }

    .pagination-buttons {
      grid-area: pagination;
        justify-self: center;
        align-self: center;
        
    }

    .pagination button {
        height: 30px; 
        margin: 5px;
        padding: 5px;
        border-radius: 3px;
        color: #FFF;
        background-color: #222;
        transition: 0.3s;
    }

    .pagination button:hover {
        background-color: rgb(150, 7, 7);
    }

    .pagination h2 {
      grid-area: pagination;
      justify-self: flex-start;
      align-self: center;
    }
</style>