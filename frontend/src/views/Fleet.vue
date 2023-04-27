<template>
  <div class="main-container">
    <div class="frota">
    <LeftNavbar :categorias="categorias" @mudarCategoria="mudarCategoria"/>
    <div class="mainFrota" v-if="categoriaAtual == ''">
                <h1>Aqui você pode:</h1>
                <ul>
                    <li>Cadastrar novos colaboradores</li>
                    <li>Consultar colaboradores existentes</li>
                </ul>
            </div>
    </div>
  </div>
</template>
  
<script>
import LeftNavbar from '../components/LeftNavbar.vue'

export default {
  components: { LeftNavbar },
  data() {
    return {
      categoriaAtual: '',
      categorias: [
        {
          nome: "Geral",
          valor: "geral"
        }
      ]
    }
  },
  methods: {
    async getCars() {
      const req = await fetch("http://localhost:3000/frota")
      const data = await req.json()
       
      data.forEach(car => {
      this.categorias.push(car)
      })
    },
  },
  mounted() {
    this.getCars()
  }
}
</script>
  
  <style>
    .frota {
        display: flex;
    }
  </style>