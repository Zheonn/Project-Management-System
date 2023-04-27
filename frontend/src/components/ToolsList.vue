<template>
  <div class="tools">
    <div class="header">
      <SearchBar class="searchBar" @search="search" />
      <button
        @click="
          $emit('getStockMovement', {
            category: 'removalList',
            type: 'ferramenta',
          })
        "
      >
        Saídas / Devoluções
      </button>
    </div>
    <div id="tools-table">
      <div id="tools-table-heading">
        <div class="code" @click="orderByCode(true)">#</div>
        <div class="name" @click="orderByName(true)">Nome</div>
        <div class="brand" @click="orderByBrand(true)">Marca</div>
        <div class="price" @click="orderByPrice(true)">Preço</div>
        <div class="amount" @click="orderByAmount(true)">Quantidade</div>
        <div class="actions">Ações</div>
      </div>
      <div id="tools-table-rows" v-if="!searchValue">
        <div v-for="tool in tools" :key="tool.id" class="tools-table-row">
          <div class="row-code">{{ tool.code }}</div>
          <div class="row-name">{{ tool.name }}</div>
          <div class="row-brand">{{ tool.brand }}</div>
          <div class="row-price">{{ formatPrice(tool.price) }}</div>
          <div class="row-amount">{{ tool.amount }}</div>
          <div class="buttons">
            <EditButton
              @click="
                $emit('editItem', {
                  category: 'cadastro',
                  id: tool.id,
                  name: tool.name,
                  type: tool.type,
                  brand: tool.brand,
                  price: tool.price,
                  amount: tool.amount,
                  button: 'Atualizar item',
                })
              "
            />
            <DeleteButton @click="deleteItem(material.id)"/>
          </div>
        </div>
      </div>
      <div id="tools-table-rows" v-if="searchValue">
        <div
          v-for="tool in toolslSearch"
          :key="tool.id"
          class="tools-table-row"
        >
          <div class="row-code">{{ tool.code }}</div>
          <div class="row-name">{{ tool.name }}</div>
          <div class="row-brand">{{ tool.brand }}</div>
          <div class="row-price">{{ formatPrice(tool.price) }}</div>
          <div class="row-amount">{{ tool.amount }}</div>
          <div class="buttons">
            <EditButton
              @click="
                $emit('editItem', {
                  category: 'cadastro',
                  id: tool.id,
                  name: tool.name,
                  type: tool.type,
                  brand: tool.brand,
                  price: tool.price,
                  amount: tool.amount,
                  button: 'Atualizar item',
                })
              "
            />
            <DeleteButton @click="deleteItem(material.id)"/>
          </div>
        </div>
      </div>
    </div>
    <pagination
      class="pagination"
      v-if="tools.length"
      :offset="offset"
      :total="total"
      :limit="limit"
      @change-page="changePage"
    />
  </div>
</template>
  
  <script>
import axios from "axios";
import { baseApiUrl } from '@/global'
import DeleteButton from "./DeleteButton.vue";
import EditButton from "./EditButton.vue";
import Pagination from "./Pagination.vue";
import SearchBar from "./SearchBar.vue";

export default {
  name: "Materiais",
  components: {
    DeleteButton,
    EditButton,
    Pagination,
    SearchBar,
  },
  emits: ["getStockMovement", "editItem"],
  data() {
    return {
      type: "ferramenta",
      tools: [],
      toolslSearch: [],
      offset: 0,
      limit: 20,
      total: 0,
      searchValue: null,
      sorted: false,
      sortedButton: false,
      sortedBy: null,
      sortDirection: "desc",
    };
  },
  methods: {
    async getFerramentas() {
      await axios(`${baseApiUrl}/stock/${this.type}`).then(
        (res) => (this.total = res.data.length)
      );

      const urlLimites = `${baseApiUrl}/stock/${this.type}/${this.offset}/${this.limit}`;

      await axios(urlLimites).then((res) => (this.tools = res.data));
    },
    formatPrice(price) {
      let newPrice = price.toLocaleString()
      return "R$" + newPrice
    },
    changePage(value) {
      if (this.searchValue) {
        let lastIndex;
        if (value < 1) {
          lastIndex = this.limit;
        } else {
          lastIndex = value * 2;
        }
        this.toolsSearch = this.tools.slice(value, lastIndex);
      } else if (this.sorted) {
        this.offset = value;
        switch (this.sortedBy) {
          case "code":
            this.orderByCode(false);
            break;
          case "name":
            this.orderByName(false);
            break;
          case "amount":
            this.orderByAmount(false);
            break;
        }
      } else {
        this.offset = value;
        this.getFerramentas();
      }
    },
    async search(value) {
      this.searchValue = value.toLowerCase();

      const url = `${baseApiUrl}/stock/${this.type}`;

      await axios(url).then(
        (res) => (this.tools = res.data.filter(this.hasValue))
      );

      this.total = this.tools.length;

      this.toolsSearch = this.tools.slice(0, 20);
    },
    hasValue(item) {
      return item.name.toLowerCase().includes(`${this.searchValue}`);
    },
    async orderByCode(isButton) {
      if (isButton) {
        this.sorted = true;
        this.sortedBy = "code";

        switch (this.sortDirection) {
          case "code":
            this.orderByCode(false);
            break;
          case "name":
            this.orderByName(false);
            break;
          case "brand":
            this.orderByName(false);
            break;
          case "price":
            this.orderByName(false);
            break;
          case "amount":
            this.orderByAmount(false);
            break;
        }
      }

      await axios(
        `${baseApiUrl}/stock/sorted/${this.type}/code/${this.sortDirection}/${this.limit}/${this.offset}`
      ).then((res) => (this.tools = res.data));
    },
    async orderByName(isButton) {
      if (isButton) {
        this.sorted = true;
        this.sortedBy = "name";

        switch (this.sortDirection) {
          case "asc":
            this.sortDirection = "desc";
            break;
          case "desc":
            this.sortDirection = "asc";
            break;
        }
      }

      await axios(
        `${baseApiUrl}/stock/sorted/${this.type}/name/${this.sortDirection}/${this.limit}/${this.offset}`
      ).then((res) => (this.tools = res.data));
    },
    async orderByBrand(isButton) {
      if (isButton) {
        this.sorted = true;
        this.sortedBy = "brand";

        switch (this.sortDirection) {
          case "asc":
            this.sortDirection = "desc";
            break;
          case "desc":
            this.sortDirection = "asc";
            break;
        }
      }

      await axios(
        `${baseApiUrl}/stock/sorted/${this.type}/brand/${this.sortDirection}/${this.limit}/${this.offset}`
      ).then((res) => (this.tools = res.data));
    },
    async orderByPrice(isButton) {
      if (isButton) {
        this.sorted = true;
        this.sortedBy = "price";

        switch (this.sortDirection) {
          case "asc":
            this.sortDirection = "desc";
            break;
          case "desc":
            this.sortDirection = "asc";
            break;
        }
      }

      await axios(
        `${baseApiUrl}/stock/sorted/${this.type}/price/${this.sortDirection}/${this.limit}/${this.offset}`
      ).then((res) => (this.tools = res.data));
    },
    async orderByAmount(isButton) {
      if (isButton) {
        this.sorted = true;
        this.sortedBy = "amount";

        switch (this.sortDirection) {
          case "asc":
            this.sortDirection = "desc";
            break;
          case "desc":
            this.sortDirection = "asc";
            break;
        }
      }

      await axios(
        `${baseApiUrl}/stock/sorted/${this.type}/amount/${this.sortDirection}/${this.limit}/${this.offset}`
      ).then((res) => (this.tools = res.data));
    },
    deleteItem(id) {
      const data = {
        status: "inactive",
      };

      axios.post(`${baseApiUrl}/stock/id/${id}`, data);

      this.msgType = "ok";
      this.msg = "Item removido com sucesso!";

      if(this.searchValue) {
        this.search('')
      }

      this.$emit('mudarCategoria', "")
      

      setTimeout(() => {
        this.msgType = null;
        this.msg = null;
      }, 2000);
    },
  },
  mounted() {
    this.getFerramentas();
  },
};
</script>
  
  <style>
.tools {
  width: 90vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tools .header {
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}

#tools-table {
  width: 95%;
  height: 88%;
  margin-top: 2%;
  padding: 5px;
  display: grid;
  grid-template-rows: 5% 95%;
  grid-template-areas: "heading" "rows";
  overflow: auto;
}

#tools-table-heading {
  grid-area: heading;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: 10% 40% 15% 15% 10% 10%;
  border-bottom: 3px solid #222;
}

#tools-table-rows {
  grid-area: rows;
  display: grid;
  grid-auto-rows: 5%;
}

.tools-table-row {
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: 10% 40% 15% 15% 10% 10%;
  border-bottom: 1px solid #ccc;
}

#tools-table .buttons {
  width: 100%;
  display: flex;
  justify-content: center;
}

.tools .searchBar {
  align-self: flex-start;
  justify-self: flex-start;
  margin-left: 30px;
  height: 5%;
}

.tools .header button {
  justify-self: flex-end;
  margin-right: 30px;
  height: 29px;
  padding: 5px;
  border-radius: 5px;
  color: #fff;
  background-color: rgb(12, 104, 141);
  transition: 0.3s;
}

.tools .header button:hover {
  background-color: rgb(8, 72, 97);
}

.tools .searchBar button {
  margin-left: 5px;
  padding: 5px;
  color: #fff;
  background-color: rgb(12, 104, 141);
}

.tools .pagination {
  height: 5%;
}

.tools .code,
.tools .name,
.tools .brand,
.tools .price,
.tools .amount {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
}

.tools .code:hover,
.tools .name:hover,
.tools .brand:hover,
.tools .price:hover,
.tools .amount:hover {
  background-color: rgba(12, 104, 141, 0.582);
  cursor: pointer;
}
</style>