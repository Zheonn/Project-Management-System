<template>
  <div class="main-container">
    <div class="estoque">
      <LeftNavbar
        id="leftnavbar"
        :categorias="categorias"
        @mudarCategoria="mudarCategoria"
      />
      <div class="stock-main" v-if="categoriaAtual === ''">
        <div class="main-header">
          <h1>Dashboard</h1>
        </div>
        <div class="stock-statistics">
          <StatisticsCard
            class="card-products"
            icon="fa-solid fa-desktop"
            name="Produtos"
            :amount="stockProducts"
            :total="stockProductsValue"
            type="stock"
          />
          <StatisticsCard
            class="card-materials"
            icon="fa-solid fa-gear"
            name="Materiais"
            :amount="stockMaterials"
            :total="stockMaterialsValue"
            type="stock"
          />
          <StatisticsCard
            class="card-tools"
            icon="fa-solid fa-hammer"
            name="Ferramentas"
            :amount="stockTools"
            :total="stockToolsValue"
            type="stock"
          />
        </div>
        <StockChart id="stock-chart" />
      </div>
      <StockForm
        v-if="categoriaAtual == 'cadastro'"
        :propsId="id"
        :propsName="name"
        :propsType="type"
        :propsBrand="brand"
        :propsPrice="price"
        :propsAmount="amount"
        :propsButton="button"
        :propsEdit="edit"
      />
      <ProductsList
        v-if="categoriaAtual == 'products'"
        @editItem="editItem"
        @getStockMovement="getStockMovement"
        @mudarCategoria="mudarCategoria"
      />
      <Materiais
        v-if="categoriaAtual == 'materiais'"
        @getStockMovement="getStockMovement"
        @editItem="editItem"
        @mudarCategoria="mudarCategoria"
      />
      <ToolsList
        v-if="categoriaAtual == 'ferramentas'"
        @getStockMovement="getStockMovement"
        @editItem="editItem"
        @mudarCategoria="mudarCategoria"
      />
      <Removal v-if="categoriaAtual == 'removal'" />
      <RemovalList v-if="categoriaAtual == 'removalList'" :propsType="type" />
      <ReportForm
        v-if="categoriaAtual == 'reportForm'"
        @generateReport="generateReport"
      />
      <Report
        v-if="categoriaAtual == 'report'"
        :propsProject="projectFullName"
        :propsRemovals="actions"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl } from "@/global";
import Materiais from "@/components/MaterialsList.vue";
import LeftNavbar from "../components/LeftNavbar.vue";
import ToolsList from "../components/ToolsList.vue";
import Removal from "../components/Removal.vue";
import StockForm from "@/components/StockForm.vue";
import RemovalList from "../components/RemovalList.vue";
import ProductsList from "@/components/ProductsList.vue";
import ReportForm from "@/components/ReportForm.vue";
import Report from "@/components/Report.vue";
import StatisticsCard from "@/components/StatisticsCard.vue";
import StockChart from "@/components/StockChart.vue";
import { mapState } from "vuex";

export default {
  name: "Estoque",
  components: {
    LeftNavbar,
    Materiais,
    ToolsList,
    Removal,
    StockForm,
    RemovalList,
    ProductsList,
    ReportForm,
    Report,
    StatisticsCard,
    StockChart,
  },
  data() {
    return {
      categoriaAtual: "",
      categorias: [
        {
          nome: "Cadastro",
          valor: "cadastro",
        },
        {
          nome: "Produtos",
          valor: "products",
        },
        {
          nome: "Materiais",
          valor: "materiais",
        },
        {
          nome: "Ferramentas",
          valor: "ferramentas",
        },
        {
          nome: "Movimentação",
          valor: "removal",
        },
        {
          nome: "Relatório",
          valor: "reportForm",
        },
      ],
      id: null,
      name: null,
      type: null,
      brand: null,
      price: null,
      amount: null,
      button: null,
      edit: false,
      actions: null,
      projectFullName: null,
      stockProducts: null,
      stockProductsValue: 0,
      stockMaterials: null,
      stockMaterialsValue: 0,
      stockTools: null,
      stockToolsValue: 0,
    };
  },
  methods: {
    mudarCategoria(nomeCategoria) {
      this.categoriaAtual = nomeCategoria;
      this.edit = false;
      if (nomeCategoria === "") {
        this.getStatistics();
      }
    },
    editItem(args) {
      this.id = args.id;
      this.name = args.name;
      this.type = args.type;
      this.brand = args.brand;
      this.price = args.price;
      this.amount = args.amount;
      this.button = args.button;
      this.edit = true;
      this.categoriaAtual = args.category;
    },
    getStockMovement(args) {
      this.type = args.type;
      this.categoriaAtual = args.category;
    },
    generateReport(args) {
      this.projectFullName = args.projectFullName;
      this.actions = args.actions;
      this.categoriaAtual = args.category;
    },
    async getProductsStatistics() {
      let products = [];
      let productsValue = 0;

      await axios(`${baseApiUrl}/stock/product`).then(
        (res) => (products = res.data)
      );

      products.forEach((product) => {
        productsValue += product.price * product.amount;
      });

      this.stockProducts = products.length;
      this.stockProductsValue = productsValue;
    },
    async getMaterialsStatistics() {
      let materials = [];
      let materialsValue = 0;

      await axios(`${baseApiUrl}/stock/material`).then(
        (res) => (materials = res.data)
      );

      materials.forEach((product) => {
        materialsValue += product.price * product.amount;
      });

      this.stockMaterials = materials.length;
      this.stockMaterialsValue = materialsValue;
    },
    async getToolsStatistics() {
      let tools = [];
      let toolsValue = 0;

      await axios(`${baseApiUrl}/stock/ferramenta`).then(
        (res) => (tools = res.data)
      );

      tools.forEach((product) => {
        toolsValue += product.price * product.amount;
      });
      this.stockTools = tools.length;
      this.stockToolsValue = toolsValue;
    },
  },
  computed: mapState(["logged"]),
  mounted() {
    if (this.logged === false) {
      this.$router.push("/");
    } else {
      this.getProductsStatistics();
      this.getMaterialsStatistics();
      this.getToolsStatistics();
    }
  },
};
</script>

<style>
.estoque {
  display: flex;
}

.stock-main {
  height: 90vh;
  width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
}

.stock-statistics {
  width: 90%;
  display: flex;
  justify-content: space-around;
  margin-top: 4%;
}

.stock-main .main-header {
  width: 90%;
  margin-top: 2%;
  border-bottom: 2px solid #000;
}

.stock-main .main-header h1 {
  color: #000000;
}

#stock-chart {
  width: 60%;
  margin-top: 4%;
}

@media (max-height: 800px) {
  .stock-main .main-header h1 {
    font-size: 28px;
  }

  .stock-statistics {
    margin-top: 2%;
  }

  #stock-chart {
    width: 45%;
    margin-top: 2%;
  }
}
</style>