<template>
  <div class="main-container">
    <Message :msg="msg" :msgType="msgType" v-show="msg" />
    <div>
      <form id="stock-form" @submit="registerProject">
        <div class="input-container">
          <label for="number">Number</label>
          <input
            type="text"
            id="number"
            number="number"
            v-model="number"
            placeholder="Enter the project number"
          />
        </div>
        <div class="input-container">
          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            v-model="name"
            placeholder="Enter the project name"
          />
        </div>

        <input
          type="submit"
          class="submit-btn"
          :value="button"
          @click="clearProps"
        />
      </form>
    </div>
  </div>
</template>
    
    <script>
import axios from "axios";
import { baseApiUrl } from "@/global";
import Message from "./Message.vue";
export default {
  name: "StockForm",
  components: { Message },
  props: {
    propsId: null,
    propsNumber: null,
    propsName: null,
    propsButton: null,
    propsEdit: null,
  },
  data() {
    return {
      id: null,
      number: null,
      name: null,
      button: "Cadastrar Projeto",
      msg: null,
      msgType: null,
      edit: false,
      searchValue: null,
    };
  },
  methods: {
    async registerProject(e) {
      e.preventDefault();

      let data = {};
      let url = "";

      if (this.number === null || this.number === "") {
        this.msgType = "error";
        this.msg = "Insira o número do projeto!";
        setTimeout(() => (this.msg = ""), 2000);
        return;
      }
      if (this.isNumber() === false) {
        this.msgType = "error";
        this.msg = "O número do projeto deve conter apenas números!";
        setTimeout(() => (this.msg = ""), 2000);
        return;
      }
      if (this.number === null || this.number === "") {
        this.msgType = "error";
        this.msg = "Insira o número do projeto!";
        setTimeout(() => (this.msg = ""), 2000);
        return;
      }
      if (this.name === null || this.name === "") {
        this.msgType = "error";
        this.msg = "Insira o nome do projeto!";
        setTimeout(() => (this.msg = ""), 2000);
        return;
      }

      if (this.propsEdit) {
        data = {
          number: this.number,
          name: this.name,
        };

        url = `${baseApiUrl}/projects/id/${this.id}`;

        this.msgType = "ok";
        this.msg = "Projeto atualizado com sucesso!";

        setTimeout(() => (this.msg = ""), 1500);

        await axios.post(url, data);
      } else {
        let verified;

        await axios(`${baseApiUrl}/projects/number/${this.number}`).then(
          (res) => (verified = res.data)
        );

        if (verified.length !== 0) {
          this.msgType = "error";
          this.msg = "O projeto já está cadastrado!";
          setTimeout(() => (this.msg = ""), 2000);
          return;
        }

        data = {
          number: this.number,
          name: this.name,
        };

        url = `${baseApiUrl}/projects`;

        await axios.post(url, data);

        this.msgType = "ok";
        this.msg = "Projeto cadastrado com sucesso!";

        setTimeout(() => {
          this.msg = "";
          this.msgType = "";
        }, 1500);

        this.id = null;
        this.number = "";
        this.name = "";
      }
    },
    isNumber() {
      let nChars =
        "abcdefghijklmnopqrstuvwxyz!@#$%,¨&*()-_+=§/|<>,.:;?°´`{}[]ªº'";
      let numbers = this.number.toLowerCase().split("");
      let result = true;

      numbers.forEach((num) => {
        if (nChars.includes(num)) {
          result = false;
        }
      });

      return result;
    },
    clearProps() {
      setTimeout(() => {
        this.id = null;
        this.number = null;
        this.name = null;
        this.button = "Cadastrar Projeto";
        this.edit = false;
      }, 300);
    },
  },
  mounted() {
    if (this.propsEdit) {
      this.id = this.propsId;
      this.number = this.propsNumber;
      this.name = this.propsName;
      this.amount = this.propsAmount;
      this.button = this.propsButton;
    }
  },
};
</script>
    
    <style scoped>
.main-container {
  width: 88vw;
  align-items: center;
  justify-content: center;
  overflow: auto;
}

#colaborador-form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
}

label {
  font-weight: bold;
  margin-bottom: 20px;
  color: #222;
  padding: 5px 10px;
  border-left: 4px solid rgb(138, 7, 7);
}

#stock-form input,
select {
  padding: 5px 10px;
  width: 500px;
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
</style>