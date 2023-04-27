<template>
  <div id="report-page">
    <button class="printButton" @click="print">Imprimir</button>
    <div id="report-content">
      <div class="report-header">
        <div class="header-img">
          <img
            src="../../public/img/logoPreta.png"
            alt="Logo da empresa Workant Network"
          />
        </div>
        <div class="header-content">
          <h1>Relatório de movimentação por projeto</h1>
          <h2>Projeto: {{ propsProject }}</h2>
          <h2>Gerado em: {{ getDate() }}</h2>
        </div>
      </div>
      <div class="report-entries">
        <h2>Entradas:</h2>
        <div class="report-table">
          <div class="report-table-heading">
            <div class="identificador">Employee</div>
            <div class="nome">Project</div>
            <div class="nome">Date</div>
            <div class="actions">Action</div>
            <div class="actions">Item</div>
            <div class="actions">Amount</div>
            <div class="actions">Unitary</div>
            <div class="actions">Total</div>
          </div>
          <div id="report-table-rows">
            <div
              v-for="entrie in entries"
              :key="entrie.id"
              class="report-table-row"
            >
              <div class="id">{{ entrie.employeeName }}</div>
              <div class="id">{{ entrie.project }}</div>
              <div class="name">{{ formatDate(entrie.date) }}</div>
              <div class="date">{{ entrie.action }}</div>
              <div class="action">{{ entrie.item }}</div>
              <div class="action">{{ entrie.amount }}</div>
              <div class="action">
                {{ formatValue(entrie.value / entrie.amount) }}
              </div>
              <div class="action">{{ formatValue(entrie.value) }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="report-removals">
        <h2>Saídas:</h2>
        <div class="report-table">
          <div class="report-table-heading">
            <div class="identificador">Colaborador</div>
            <div class="nome">Projeto</div>
            <div class="nome">Data</div>
            <div class="actions">Ação</div>
            <div class="actions">Item</div>
            <div class="actions">Quantidade</div>
            <div class="actions">Unitário</div>
            <div class="actions">Total</div>
          </div>
          <div id="report-table-rows">
            <div
              v-for="removal in removals"
              :key="removal.id"
              class="report-table-row"
            >
              <div class="id">{{ removal.employeeName }}</div>
              <div class="id">{{ removal.project }}</div>
              <div class="name">{{ formatDate(removal.date) }}</div>
              <div class="date">{{ removal.action }}</div>
              <div class="action">{{ removal.item }}</div>
              <div class="action">{{ removal.amount }}</div>
              <div class="action">
                {{ formatValue(removal.value / removal.amount) }}
              </div>
              <div class="action">{{ formatValue(removal.value) }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="report-total">
        <h2>Total: {{ formatValue(total) }}</h2>
      </div>
    </div>
  </div>
</template>
    
  <script>
import DeleteButton from "./DeleteButton.vue";
import EditButton from "./EditButton.vue";
import Pagination from "./Pagination.vue";

export default {
  name: "RemovalsList",
  components: { EditButton, DeleteButton, Pagination },
  props: {
    propsType: null,
    propsProject: null,
    propsRemovals: null,
  },
  data() {
    return {
      removals: [],
      entries: [],
      total: null,
      type: null,
    };
  },
  methods: {
    async getRemovals() {
      this.removals = this.propsRemovals.filter((action) => {
        return action.action === "retirada";
      });

      this.entries = this.propsRemovals.filter((action) => {
        return action.action === "entrada";
      });

      this.propsRemovals.forEach((action) => {
        switch (action.action) {
          case "retirada":
            this.total -= action.value;
            break;
          case "devolução":
            this.total += action.value;
            break;
        }
      });
    },
    formatValue(value) {
      if(value) {
        let newValue = value.toFixed(2).toLocaleString();
        return "R$" + newValue;

      }
    },
    changePage(value) {
      this.offset = value;
      this.getRemovals();
    },
    getDate() {
      const date = new Date();
      const dateBr = new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "medium",
        timeZone: "America/Sao_Paulo",
      }).format(date);
      return dateBr;
    },
    print() {
      window.print();
    },
    formatDate(date) {
      const dateBr = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'medium', timeZone: 'America/Sao_Paulo' }).format(Date.parse(date));

      return dateBr
    }
  },
  mounted() {
    if (this.propsType) {
      this.type = this.propsType;
    }
    this.getRemovals();
  },
};
</script>

<style>
#report-page {
  width: 90vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#report-content {
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.report-header {
  margin-top: 2%;
  display: flex;
  justify-content: flex-start;
  border: 1px solid #000;
}

#report-content .header-img {
  display: flex;
  border-right: 1px solid #000;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.report-header img {
  height: 15vh;
}

.report-header .header-content {
  align-self: center;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.report-removals,
.report-entries {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 2%;
}

.report-table {
  margin-top: 2%;
}

#report-content h1 {
  margin-bottom: 0px;
  margin-left: 10px;
  text-align: left;
  font-size: 30px;
}

#report-content h2 {
  margin-left: 10px;
  font-size: 23px;
}

.report-table-heading {
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: 15% 10% 12.5% 12.5% 15% 10% 12.5% 12.5%;
  border-bottom: 3px solid #222;
  padding: 5px;
}

.report-table-row {
  display: grid;
  align-items: center;
  justify-items: center;
  text-align: center;
  grid-template-columns: 15% 10% 12.5% 12.5% 15% 10% 12.5% 12.5%;
  border-bottom: 1px solid #ccc;
  padding: 5px;
}

.report-total {
  width: 100%;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 5%;
  border: 1px solid #000;
}

.report-total h2 {
  margin-right: 10px;
}

.printButton {
  align-self: flex-end;
  margin-right: 20px;
  margin-top: 20px;
  padding: 5px;
  border-radius: 5px;
  width: 10%;
  color: #fff;
  background-color: rgb(12, 104, 141);
  transition: 0.3s;
}

@media print {
  #app-navbar {
    display: none;
  }

  #app-footer {
    display: none;
  }

  #leftnavbar {
    display: none;
  }

  .printButton {
    display: none;
  }

  #report-page {
    width: 100vw;
  }

  #report-content {
    overflow: visible;
  }

  #report-content h1 {
    font-size: 18px;
  }

  #report-page h2 {
    font-size: 16px;
  }

  #report-content .report-header h2 {
    font-size: 12px;
  }

  .report-header img {
    height: 100px;
  }

  .report-table {
    font-size: 10px;
  }
}
</style>
  
  
      
    
    
      
        
      
      