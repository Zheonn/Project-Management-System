<template>
  <div class="lista">
    <Message :msg="msg" :msgType="msgType" v-show="msg" />
    <div v-for="employee in employees" :key="employee.id">
      <EmployeeCard :id="employee.id" :name=employee.name :cpf="employee.cpf" :role="employee.role" :intermittent="employee.intermittent" :cardNumber="employee.cardNumber" @editEmployee="editEmployee" @deleteEmployee="deleteEmployee"/>
    </div>
  </div>
</template>

<script>
import { baseApiUrl } from '@/global'
import axios from 'axios'
import EmployeeCard from './EmployeeCard.vue'
import Message from './Message.vue'

export default {
  name: 'ColaboradoresLista',
  components: { EmployeeCard, Message },
  emits: ['editEmployee', 'mudarCategoria'],
  data() {
      return {
        employees: [],
        msg: null,
        msgType: null
      }
    },
    methods: {
      async getEmployees() {
       
        axios(`${baseApiUrl}/employees/status/active`)
          .then(res => this.employees = res.data)
      },
      editEmployee(args) {
        this.$emit('editEmployee', args)
      },
      deleteEmployee(id) {
      const data = {
        status: "inactive",
      };

      axios.post(`${baseApiUrl}/employees/id/${id}`, data);

      this.msgType = "ok";
      this.msg = "Colaborador removido com sucesso!";
      
      setTimeout(() => {
        this.msgType = null;
        this.msg = null;
        this.$emit('mudarCategoria', '')
      }, 1000);
    },
    },
    mounted() {
      this.getEmployees()
    }
}
</script>

<style scoped>

  .lista {
    height: 90vh;
    width: 88vw;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    justify-content: center;
  }

</style>