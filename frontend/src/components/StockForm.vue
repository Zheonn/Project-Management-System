<template>
  <div class="main-container">
    <Message :msg="msg" :msgType="msgType" v-show="msg"/>
    <div>
      <form id="stock-form" @submit="registerItem">
        <div class="input-container">
          <label for="name">Item</label>
          <input
            type="text"
            id="name"
            name="name"
            v-model="name"
            placeholder="Digite o nome do item"
          />
        </div>
        <div class="input-container">
          <label for="type">Tipo</label>
          <select
            name="status"
            @change="($event) => (this.type = $event.target.value)"
            v-model="type"
          >
            <option value="">Selecione o tipo do item</option>
            <option value="product">Produto</option>
            <option value="material">Material</option>
            <option value="ferramenta">Ferramenta</option>
          </select>
        </div>
        <div class="input-container">
          <label for="brand">Marca</label>
          <input
            type="text"
            id="brand"
            brand="brand"
            v-model="brand"
            placeholder="Digite a marca do item"
          />
        </div>
        <div class="input-container">
          <label for="price">Preço</label>
          <input
            type="text"
            id="price"
            price="price"
            v-model="price"
            placeholder="Digite o preço unitário do item"
          />
        </div>
        <div class="input-container">
          <label for="amount">Quantidade</label>
          <input
            type="number"
            id="amount"
            name="amount"
            v-model="amount"
            placeholder="Digite a quantidade em estoque"
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
  name: "StockForm",
  components: { Message },
  props: {
    propsId: null,
    propsName: null,
    propsType: null,
    propsBrand: null,
    propsPrice: null,
    propsAmount: null,
    propsButton: null,
    propsEdit: null,
  },
  data() {
    return {
      id: null,
      name: null,
      type: "",
      brand: null,
      price: null,
      amount: null,
      button: "Cadastrar item",
      msg: null,
      msgType: null,
      edit: false,
    };
  },
  methods: {
    async registerItem(e) {
      e.preventDefault();

      let data = {};
      let url = "";

      if (this.name === null || this.name === "") {
        this.msgType = "error";
        this.msg = "Insira o nome do item!";
        setTimeout(() => (this.msg = ""), 2000);
        return;
      }
      if (this.type === null || this.type === "") {
        this.msgType = "error";
        this.msg = "Insira o tipo do item!";
        setTimeout(() => (this.msg = ""), 2000);
        return;
      }
      if (this.brand === null || this.brand === "") {
        this.msgType = "error";
        this.msg = "Insira a marca do item!";
        setTimeout(() => (this.msg = ""), 2000);
        return;
      }
      if (this.price === null || this.price === "") {
        this.msgType = "error";
        this.msg = "Insira o preço unitário do item!";
        setTimeout(() => (this.msg = ""), 2000);
        return;
      }
      if (this.isNumber() === false) {
        this.msgType = "error";
        this.msg = "O preço do item deve conter apenas números!";
        setTimeout(() => (this.msg = ""), 2000);
        return;
      }
      if (this.amount === null || this.amount === "") {
        this.msgType = "error";
        this.msg = "Insira a quantidade do item!";
        setTimeout(() => (this.msg = ""), 2000);
        return;
      }

      this.price = this.price.toString().replace(",", ".");

      if (this.propsEdit) {
        data = {
          name: this.name,
          brand: this.brand,
          price: this.price,
          type: this.type,
          amount: this.amount,
        };

        url = `${baseApiUrl}/stock/id/${this.id}`;

        this.msgType = "ok";
        this.msg = "Item atualizado com sucesso!";

        this.clearProps();

        setTimeout(() => {
          this.msg = null;
          this.msgType = null;
        }, 1500);

        await axios.post(url, data);
      } else {
        let verified;

        await axios(`${baseApiUrl}/stock/name/${this.name}`).then(
          (res) => (verified = res.data)
        );

        if (verified.length !== 0) {
          let exist = false;
          verified.forEach((item) => {
            if (item.brand == this.brand) {
              this.msgType = "error";
              this.msg = "O item já está cadastrado!";
              setTimeout(() => {
                this.msgType = null;
                this.msg = null;
              }, 2000);
              exist = true;
              return;
            }
          });
          if (exist) {
            return;
          }
        }

        let randomCode = "PMF" + Math.floor(Math.random() * 1000);
        let typeToCode;

        data = {
          name: this.name,
          type: this.type,
          brand: this.brand,
          price: this.price,
          amount: this.amount,
          code: randomCode,
        };

        url = `${baseApiUrl}/stock`;

        await axios.post(url, data);

        let newItemId;
        await axios(`${url}/code/${randomCode}`).then((res) => {
          newItemId = res.data.id;
          typeToCode = res.data.type;
        });

        function generateCode() {
          let prefix;
          let newItemIdL = newItemId.toString().length;
          switch (typeToCode) {
            case "product":
              prefix = "P";
              break;
            case "material":
              prefix = "M";
              break;
            case "ferramenta":
              prefix = "F";
              break;
          }

          return prefix + "0" * (4 - newItemIdL) + newItemId;
        }

        let generatedCode = generateCode();

        data = {
          code: generatedCode,
        };

        this.msgType = "ok";
        this.msg = "Item cadastrado com sucesso!";

        this.clearProps();

        axios.post(`${url}/id/${newItemId}`, data);

        setTimeout(() => {
          this.msgType = null;
          this.msg = null;
        }, 2000);
      }
    },
    isNumber() {
      let nChars = "abcdefghijklmnopqrstuvwxyz!@#$%¨&*()-_+=§/|<>:;?°´`{}[]ªº'";
      let numbers = this.price.toLowerCase().split("");
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
        this.name = null;
        this.type = "";
        this.brand = null;
        this.price = null;
        this.amount = null;
        this.button = "Cadastrar item";
        this.edit = false;
      }, 300);
    },
  },
  mounted() {
    if (this.propsEdit) {
      this.id = this.propsId;
      this.name = this.propsName;
      this.type = this.propsType;
      this.brand = this.propsBrand;
      this.price = this.propsPrice.toString().replace(".", ",");
      this.amount = this.propsAmount;
      this.button = this.propsButton;
    }
  },
};
</script>
  
  <style scoped>
.main-container {
  height: 90vh;
  width: 88vw;
  align-items: center;
  justify-content: center;
}

#stock-form {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  overflow: auto;
}

#stock-form .input-container {
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

@media (max-height: 800px) {
  #stock-form .input-container {
    margin-bottom: 30px;
  }
}
</style>