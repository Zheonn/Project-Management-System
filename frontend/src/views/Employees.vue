<template>
  <div class="main-container">
    <div class="colaboradores">
      <LeftNavbar :categorias="categorias" @mudarCategoria="mudarCategoria" />
      <div class="employees-main" v-if="categoriaAtual === ''">
        <div class="main-header">
          <h1>Dashboard</h1>
        </div>
        <div class="employees-statistics">
          <StatisticsCard
            class="card-employees"
            icon="fa-solid fa-user-tie"
            name="Colaboradores"
            :amount="employees"
          />
        </div>
      </div>
      <EmployeeForm
        v-if="categoriaAtual == 'newEmployee'"
        :propsId="id"
        :propsName="name"
        :propsCpf="cpf"
        :propsRole="role"
        :propsIntermittent="intermittent"
        :propsCardNumber="cardNumber"
        :propsEdit="edit"
        :propsButton="button"
      />
      <EmployeesList
        v-if="categoriaAtual == 'colaboradores'"
        @editEmployee="editEmployee"
        @mudarCategoria="mudarCategoria"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl } from "@/global";
import LeftNavbar from "../components/LeftNavbar.vue";
import EmployeesList from "../components/EmployeesList.vue";
import EmployeeForm from "../components/EmployeeForm.vue";
import StatisticsCard from "@/components/StatisticsCard.vue";
import { mapState } from "vuex";

export default {
  name: "Colaboradores",
  components: {
    EmployeeForm,
    LeftNavbar,
    EmployeesList,
    StatisticsCard,
  },
  data() {
    return {
      categoriaAtual: "",
      categorias: [
        {
          nome: "Novo Colaborador",
          valor: "newEmployee",
        },
        {
          nome: "Colaboradores",
          valor: "colaboradores",
        },
      ],
      id: null,
      name: null,
      cpf: null,
      role: null,
      intermittent: null,
      cardNumber: null,
      button: null,
      edit: null,
      employees: null,
    };
  },
  methods: {
    mudarCategoria(nomeCategoria) {
      this.categoriaAtual = nomeCategoria;
      this.edit = false;
    },
    editEmployee(args) {
      this.id = args.id;
      this.name = args.name;
      this.cpf = args.cpf;
      this.role = args.role;
      this.intermittent = args.intermittent;
      this.cardNumber = args.cardNumber;
      this.button = args.button;
      this.edit = true;
      this.categoriaAtual = args.category;
    },
    async getEmployeesStatistics() {
      let employees = [];

      await axios(`${baseApiUrl}/employees`).then(
        (res) => (employees = res.data)
      );

      this.employees = employees.length;
    },
  },
  computed: mapState(["logged"]),
  mounted() {
    if (this.logged === false) {
      this.$router.push("/");
    } else {
      this.getEmployeesStatistics();
    }
  },
};
</script>

<style>
.colaboradores {
  display: flex;
}

.employees-main {
  height: 90vh;
  width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
}

.employees-statistics {
  width: 90%;
  display: flex;
  justify-content: space-around;
  margin-top: 4%;
}

.employees-main .main-header {
  width: 90%;
  margin-top: 2%;
  border-bottom: 2px solid #000;
}

.employees-main .main-header h1 {
  color: #000000;
}

@media (max-height: 800px) {
  .employees-main .main-header h1 {
    font-size: 28px;
  }

  .employees-statistics {
    margin-top: 2%;
  }
}
</style>