<template>
  <div class="main-container">
    <Message :msg="msg" :msgType="msgType" v-show="msg" class="login-msg" />
    <form id="loginup-form" @submit="login">
      <div class="loginup-header">
        <h1>Workant System</h1>
      </div>
      <div class="input-container">
        <input
          name="email"
          type="text"
          placeholder="Digite o usuário"
          v-model="user"
        />
      </div>
      <div class="input-container">
        <input
          name="password"
          type="password"
          placeholder="Digite a senha"
          v-model="password"
        />
      </div>
      <div class="loginup-buttons">
        <input type="submit" class="submit-btn" value="Login" />

        <!-- <button class="signup-btn" @click="register">Cadastrar</button> -->
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl } from "@/global";
import Message from "@/components/Message.vue";
import { mapState } from "vuex";

export default {
  name: "LogInUp",
  emits: ["login"],
  components: { Message },
  data() {
    return {
      user: null,
      password: null,
      msg: null,
      msgType: null,
    };
  },
  methods: {
    async login(e) {
      e.preventDefault();
      let user = "youruser";

      // await axios(`${baseApiUrl}/users/name/${this.user}`).then(
      //   (res) => (user = res.data)
      // );

      if (this.password === "yourpassword") {
        this.$emit("login");
      } else {
        this.msgType = "error";
        this.msg = "Usuário/Senha inválidos";

        setTimeout(() => {
          this.msg = null;
          this.msgType = null;
        }, 1500);
      }
    },
    async register() {
      const data = {
        nome: "Leonnardo Trindade",
        email: "leonnardo.trindade@viga.com.br",
        assunto: "Teste cadastro",
        mensagem: "É só uma mensagem de teste",
      };

      await axios.post(`${baseApiUrl}/send-mail`, data);
    },
  },
  computed: mapState(["logged"]),
  mounted() {
    if (this.logged === false) {
      this.$router.push("/");
      return;
    }
  },
};
</script>

<style scoped>
.main-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  background-color: #3b3b3b;
}

#loginup-form {
  height: 40%;
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-top: 5%;
  border-radius: 10%;
  background-color: rgba(121, 2, 2, 0.658);
  border: 2px solid #000;
  color: white;
}

.loginup-buttons {
  display: flex;
  justify-content: space-around;
  width: 49%;
}

.submit-btn,
.signup-btn {
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

.submit-btn:hover,
.signup-btn:hover {
  background-color: rgb(138, 7, 7);
}

#loginup-form .input-container {
  width: 70%;
  height: 10%;
}

#loginup-form .input-container input {
  width: 100%;
  height: 100%;
}

.login-msg {
  position: absolute;
  top: 5px;
}
</style>