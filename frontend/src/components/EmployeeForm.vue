<template>
  <div class="main-container">
    <Message :msg="msg" :msgType="msgType" v-show="msg" />
    <div>
      <form id="colaborador-form" @submit="cadastrarColaborador">
        <div class="input-container">
          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            v-model="name"
            placeholder="
Enter the name of the employee"
          />
        </div>
        <div class="input-container">
          <label for="cpf">CPF</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            v-model="cpf"
            placeholder="Enter the CPF of the employee"
          />
        </div>
        <div class="input-container">
          <label for="role">Role</label>
          <input
            type="text"
            id="role"
            name="role"
            v-model="role"
            placeholder="Enter the role of the employee"
          />
        </div>
        <div class="input-container-checkbox">
          <label for="intermittent">Intermittent</label>
          <input
            type="checkbox"
            id="intermittent"
            name="intermittent"
            v-model="intermittent"
          />
        </div>
        <div class="input-container">
          <label for="cardNumber">Código do Cartão</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            v-model="cardNumber"
            placeholder="Enter the card number of the employee"
          />
        </div>

        <input type="submit" class="submit-btn" :value="button" />
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl } from "@/global";
import Message from "./Message.vue";
export default {
  name: "ColaboradorForm",
  components: { Message },
  props: {
    propsId: null,
    propsName: null,
    propsCpf: null,
    propsRole: null,
    propsIntermittent: null,
    propsCardNumber: null,
    propsButton: null,
    propsCategory: null,
    propsEdit: null,
  },
  data() {
    return {
      id: null,
      name: null,
      cpf: null,
      role: null,
      intermittent: Boolean,
      cardNumber: null,
      button: "Cadastrar Colaborador",
      msg: null,
      msgType: null,
    };
  },
  methods: {
    async cadastrarColaborador(e) {
      e.preventDefault();

      if (this.name === null || this.name === "") {
        this.msgType = "error";
        this.msg = "Insira o nome do colaborador!";
        setTimeout(() => (this.msg = ""), 2000);
        return;
      }
      if (this.isWord() === false) {
        this.msgType = "error";
        this.msg = "O nome do colaborador deve conter apenas letras!";
        setTimeout(() => (this.msg = ""), 2000);
        return;
      }
      if (this.cpf === null || this.cpf === "") {
        this.msgType = "error";
        this.msg = "Insira o CPF do colaborador!";
        setTimeout(() => (this.msg = ""), 2000);
        return;
      }

      if (this.role === null || this.role === "") {
        this.msgType = "error";
        this.msg = "Insira o cargo do colaborador!";
        setTimeout(() => (this.msg = ""), 2000);
        return;
      }
      if (this.cardNumber === null || this.cardNumber === "") {
        this.msgType = "error";
        this.msg = "Insira o código do colaborador!";
        setTimeout(() => (this.msg = ""), 2000);
        return;
      }

      if (this.propsEdit) {
        const data = {
          name: this.name,
          cpf: this.cpf,
          role: this.role,
          intermittent: this.intermittent,
          cardNumber: this.cardNumber,
        };

        axios.post(`${baseApiUrl}/employees/id/${this.id}`, data);

        this.msgType = "ok";
        this.msg = "Colaborador atualizado com sucesso!";

        setTimeout(() => {
          this.msgType = null;
          this.msg = null;
        }, 2000);

        this.name = null;
        this.cpf = null;
        this.role = null;
        this.intermittent = false;
        this.cardNumber = null;
      } else {
        if (this.isNumber(this.cpf) === false) {
          this.msgType = "error";
          this.msg = "Insira apenas números no campo CPF!";
          setTimeout(() => (this.msg = ""), 2000);
          return;
        }

        if (this.cpf.length !== 11) {
          this.msgType = "error";
          this.msg = "CPF inválido!";
          setTimeout(() => (this.msg = ""), 2000);
          return;
        }

        this.cpf = this.formatCPF(this.cpf);
        console.log(this.cpf);

        let verifiedCPF;

        await axios(`${baseApiUrl}/employees/cpf/${this.cpf}`).then(
          (res) => (verifiedCPF = res.data)
        );

        if (verifiedCPF.length !== 0) {
          this.msgType = "error";
          this.msg = "CPF já cadastrado!";
          setTimeout(() => (this.msg = ""), 2000);
          return;
        }

        let verifiedCardNumber;

        await axios(`${baseApiUrl}/employees/card/${this.cardNumber}`).then(
          (res) => (verifiedCardNumber = res.data)
        );

        if (verifiedCardNumber.length !== 0) {
          this.msgType = "error";
          this.msg = "Número de cartão já cadastrado!";
          setTimeout(() => (this.msg = ""), 2000);
          return;
        }

        const data = {
          name: this.name,
          cpf: this.cpf,
          role: this.role,
          intermittent: this.intermittent,
          cardNumber: this.cardNumber,
        };

        axios.post(`${baseApiUrl}/employees`, data);

        this.msgType = "ok";
        this.msg = "Colaborador cadastrado com sucesso!";

        setTimeout(() => {
          this.msgType = null;
          this.msg = null;
        }, 2000);

        this.name = null;
        this.cpf = null;
        this.role = null;
        this.intermittent = false;
        this.cardNumber = null;
      }
    },
    isWord() {
      let nChars = "0123456789!@#$%,¨&*()-_+=§/|<>,.:;?°´`{}[]ªº'";
      let name = this.name.toLowerCase().split("");
      let result = true;

      name.forEach((letter) => {
        if (nChars.includes(letter)) {
          result = false;
        }
      });

      return result;
    },
    isNumber() {
      let nChars = "abcdefghijklmnopqrstuvwxyz!@#$%¨&*()-_+=§/|<>:;?°´`{}[]ªº'";
      let numbers = this.cpf.toLowerCase().split("");
      let result = true;

      numbers.forEach((num) => {
        if (nChars.includes(num)) {
          result = false;
        }
      });

      return result;
    },
    formatCPF(cpf) {
      let chars = cpf.split("");
      let newCPF = "";

      chars.forEach((char, index) => {
        if (index == 2) {
          newCPF += char;
          newCPF += ".";
        } else if (index == 5) {
          newCPF += char;
          newCPF += ".";
        } else if (index == 8) {
          newCPF += char;
          newCPF += "-";
        } else {
          newCPF += char;
        }
      });

      console.log(newCPF);
      return newCPF;
    },
  },
  mounted() {
    if (this.propsEdit) {
      this.id = this.propsId;
      this.name = this.propsName;
      this.cpf = this.propsCpf;
      this.role = this.propsRole;
      this.intermittent = this.propsIntermittent;
      this.cardNumber = this.propsCardNumber;
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
}

#colaborador-form {
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
}
.input-container-checkbox {
  display: flex;
  margin-bottom: 50px;
}

.input-container-checkbox input {
  height: 28px;
  width: 28px;
}

label {
  font-weight: bold;
  margin-bottom: 20px;
  color: #222;
  padding: 5px 10px;
  border-left: 4px solid rgb(138, 7, 7);
}

input {
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

@media (max-height: 800px) {
  .input-container {
    margin-bottom: 30px;
  }
}
</style>