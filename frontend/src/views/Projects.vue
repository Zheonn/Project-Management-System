<template>
  <div class="main-container">
    <LeftNavbar :categorias="categorias" @mudarCategoria="mudarCategoria" />
    <div class="projetos">
      <div class="projects-main" v-if="categoriaAtual === ''">
        <div class="main-header">
          <h1>Dashboard</h1>
        </div>
        <div class="employees-statistics">
          <StatisticsCard
            class="card-projects"
            icon="fa-solid fa-folder"
            name="Projetos"
            :amount="projects"
          />
        </div>
      </div>
      <ProjectsForm
        v-if="categoriaAtual == 'new'"
        :propsId="id"
        :propsNumber="number"
        :propsName="name"
        :propsButton="button"
        :propsEdit="edit"
      />
      <ProjectsList
        v-if="categoriaAtual == 'registered'"
        @editProject="editProject"
        @mudarCategoria="mudarCategoria"
      />
    </div>
  </div>
</template>
  
  <script>
import axios from "axios";
import { baseApiUrl } from "@/global";
import LeftNavbar from "../components/LeftNavbar.vue";
import ProjectsForm from "../components/ProjectsForm.vue";
import ProjectsList from "../components/ProjectsList.vue";
import StatisticsCard from "@/components/StatisticsCard.vue";
import { mapState } from 'vuex';

export default {
  name: "Projects",
  components: {
    LeftNavbar,
    ProjectsList,
    ProjectsForm,
    StatisticsCard,
  },
  data() {
    return {
      categoriaAtual: "",
      categorias: [
        {
          nome: "Novo",
          valor: "new",
        },
        {
          nome: "Cadastrados",
          valor: "registered",
        },
      ],
      id: null,
      number: null,
      name: null,
      button: null,
      edit: false,
      projects: null,
    };
  },
  methods: {
    mudarCategoria(valorCategoria) {
      this.categoriaAtual = valorCategoria;
      this.edit = false;
    },
    editProject(args) {
      this.id = args.id;
      this.number = args.number;
      this.name = args.name;
      this.button = args.button;
      this.edit = true;
      this.categoriaAtual = args.category;
    },
    async getProjectsStatistics() {
      let projects = [];

      await axios(`${baseApiUrl}/projects`).then(
        (res) => (projects = res.data)
      );

      this.projects = projects.length;
    },
  },
  computed: mapState(['logged']),
  mounted() {
    if (this.logged === false) {
      this.$router.push("/");
    } else {
      this.getProjectsStatistics();
    }
  },
};
</script>
  
  <style>
.projetos {
  display: flex;
}

.projects-main {
  height: 90vh;
  width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.projects-statistics {
  width: 90%;
  display: flex;
  justify-content: space-around;
  margin-top: 4%;
}

.projects-main .main-header {
  width: 90%;
  margin-top: 2%;
  border-bottom: 2px solid #000;
}

.projects-main .main-header h1 {
  color: #000000;
}

@media (max-height: 800px) {
  .projects-main .main-header h1 {
    font-size: 28px;
  }

  .projects-statistics {
    margin-top: 2%;
  }
}
</style>