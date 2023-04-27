<template>
  <div class="main-container">
    <Message :msg="msg" :msgType="msgType" v-show="msg" />
    <div>
      <form id="removal-form" @submit="doRemoval">
        <div class="input-container">
          <label for="type">What is the reason for the move</label>
          <div class="radio-container">
            <div class="radio-input">
              <input
                type="radio"
                id="removal"
                name="removal"
                v-model="action"
                value="retirada"
                @change="changeButton"
              />
              <span>Removal</span>
            </div>
            <div class="radio-input">
              <input
                type="radio"
                id="entrada"
                name="entrada"
                v-model="action"
                value="entrada"
                @change="changeButton"
              />
              <span>Entrie</span>
            </div>
          </div>
        </div>
        <div class="input-container">
          <label for="cardEmployee">Card number of employee</label>
          <input
            type="text"
            id="cardEmployee"
            name="cardEmployee"
            v-model="cardEmployee"
            placeholder="Enter the card number of the employee"
          />
        </div>
        <div class="input-container">
          <label for="item">Item</label>
          <input
            autocomplete="off"
            list="items"
            id="input"
            name="item"
            placeholder="Enter the item code"
            v-model="itemCode"
          />
          <datalist id="items">
            <option v-for="item in stock" :key="item.id" :value="item.code">
              {{ item.brand + " - " + item.name }}
            </option>
          </datalist>

          <!-- <select name="project" @change="getData" v-model="itemCode">
            <option
              v-for="item in stock"
              :key="item.id"
              :value="item.code"
            >
              {{ item.brand + " - " + item.name }}
            </option>
          </select> -->
        </div>
        <div class="input-container">
          <label for="project">Project number</label>
          <input
            type="text"
            id="project"
            name="project"
            v-model="project"
            placeholder="Insert the number of the project that references the movement"
          />
        </div>
        <div class="input-container">
          <label for="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            v-model="amount"
            placeholder="Enter the amount for the movement"
          />
        </div>
        <div class="input-container">
          <input type="submit" class="submit-btn" :value="button" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl } from "@/global";
import Message from "./Message.vue";
export default {
  name: "RemovalForm",
  components: { Message },
  data() {
    return {
      cardEmployee: null,
      date: null,
      itemCode: null,
      project: null,
      amount: null,
      action: null,
      msg: null,
      msgType: null,
      button: "Fazer Retirada",
      employeeDB: {},
      itemDb: {},
      stock: null,
    };
  },
  methods: {
    async doRemoval(e) {
      e.preventDefault();

      let verifiedEmployee;
      let verifiedItem;
      let verifiedProject;

      await axios(`${baseApiUrl}/employees/card/${this.cardEmployee}`).then(
        (res) => (verifiedEmployee = res.data)
      );

      await axios(`${baseApiUrl}/stock/code/${this.itemCode}`).then(
        (res) => (verifiedItem = res.data)
      );

      await axios(`${baseApiUrl}/projects/number/${this.project}`).then(
        (res) => (verifiedProject = res.data)
      );

      if (this.action === null || this.action === "") {
        this.msgType = "error";
        this.msg = "Selecione o tipo da movimentação!";
        setTimeout(() => (this.msg = ""), 2000);
        return;
      }
      if (this.cardEmployee === null || this.cardEmployee === "") {
        this.msgType = "error";
        this.msg = "Insira o código do colaborador!";
        setTimeout(() => (this.msg = ""), 2000);
        return;
      }
      if (verifiedEmployee.length === 0) {
        this.msgType = "error";
        this.msg = "Colaborador não cadastrado!";
        setTimeout(() => (this.msg = ""), 2000);
        return;
      }
      if (this.itemCode === null || this.itemCode === "") {
        this.msgType = "error";
        this.msg = "Insira o código do item!";
        setTimeout(() => (this.msg = ""), 2000);
        return;
      }
      if (verifiedItem.length === 0) {
        this.msgType = "error";
        this.msg = "Item não cadastrado!";
        setTimeout(() => (this.msg = ""), 2000);
        return;
      }
      if (this.project === null || this.project === "") {
        this.msgType = "error";
        this.msg = "Insira o número do projeto!";
        setTimeout(() => (this.msg = ""), 2000);
        return;
      }
      if (verifiedProject.length === 0) {
        this.msgType = "error";
        this.msg = "Projeto não cadastrado!";
        setTimeout(() => (this.msg = ""), 2000);
        return;
      }
      if (this.amount === null || this.amount === "") {
        this.msgType = "error";
        this.msg = "Insira a quantidade para movimentação!";
        setTimeout(() => (this.msg = ""), 2000);
        return;
      }
      if (this.action === "retirada" && this.amount > verifiedItem.amount) {
        this.msgType = "error";
        this.msg = "Não há essa quantia em estoque!";
        setTimeout(() => (this.msg = ""), 2000);
        return;
      }

      await axios(`${baseApiUrl}/employees/card/${this.cardEmployee}`).then(
        (res) => (this.employeeDB = res.data)
      );

      await axios(`${baseApiUrl}/stock/code/${this.itemCode}`).then(
        (res) => (this.itemDb = res.data)
      );

      let updateData;
      let wordsEployeeName = this.employeeDB.name.split(" ");

      const date = new Date();
      const dateBr = new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "medium",
        timeZone: "America/Sao_Paulo",
      }).format(date);
      const removalData = {
        employeeName:
          wordsEployeeName[0] +
          " " +
          wordsEployeeName[wordsEployeeName.length - 1],
        date: date,
        action: this.action,
        item: this.itemDb.name + " - " + this.itemDb.brand,
        amount: this.amount,
        project: this.project,
        type: this.itemDb.type,
        value: this.itemDb.price * this.amount,
      };

      switch (this.action) {
        case "retirada":
          let removalAmount = this.itemDb.amount - this.amount;
          updateData = {
            name: this.itemDb.name,
            type: this.itemDb.type,
            amount: removalAmount,
            code: this.itemDb.code,
          };

          break;
        case "devolução":
          let devolutionAmount = this.itemDb.amount + this.amount;

          updateData = {
            name: this.itemDb.name,
            type: this.itemDb.type,
            amount: devolutionAmount,
            code: this.itemDb.code,
          };

          break;
      }

      axios.post(`${baseApiUrl}/stock/id/${this.itemDb.id}`, updateData);

      await axios.post(`${baseApiUrl}/stock-actions`, removalData);

      this.msgType = "ok";
      this.msg = `${
        this.action.charAt(0).toUpperCase() + this.action.slice(1)
      } realizada com sucesso!`;

      setTimeout(() => {
        this.msgType = null;
        this.msg = null;
      }, 1500);

      this.itemCode = null;
      this.amount = null;
    },
    changeButton() {
      switch (this.action) {
        case "retirada":
          this.button = "Fazer Retirada";
          break;
        case "devolução":
          this.button = "Fazer Devolução";
          break;
      }
    },
    async getStock() {
      await axios(`${baseApiUrl}/stock`).then((res) => (this.stock = res.data));
    },
  },
  mounted() {
    this.getStock();
  },
};

function addActive(x) {
  if (!x) return false;
  removeActive(x);
  if (currentFocus >= x.length) currentFocus = 0;
  if (currentFocus < 0) currentFocus = x.length - 1;
  x[currentFocus].classList.add("active");
}
function removeActive(x) {
  for (var i = 0; i < x.length; i++) {
    x[i].classList.remove("active");
  }
}
</script>
 
<style scoped>
.main-container {
  width: 88vw;
  align-items: center;
  justify-content: center;
}

#removal-form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#removal-form .input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  width: 500px;
}

label {
  font-weight: bold;
  margin-bottom: 20px;
  color: #222;
  padding: 5px 10px;
  border-left: 4px solid rgb(138, 7, 7);
}

#removal-form input,
select {
  padding: 5px 10px;
  width: 100%;
}

.submit-btn {
  background-color: #222;
  color: #fff;
  font-weight: bold;
  border: 2px solid #222;
  padding: 10px;
  font-size: 16px;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.3s;
}

.submit-btn:hover {
  background-color: rgb(138, 7, 7);
}

.input-container .checkbox-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.radio-container {
  display: flex;
  width: 100%;
  justify-content: space-around;
}

.radio-container .radio-input {
  display: flex;
}

.radio-container .radio-input span {
  margin-left: 5px;
}

@media (max-height: 800px) {
  #removal-form .input-container {
    margin-bottom: 30px;
  }
}
</style>