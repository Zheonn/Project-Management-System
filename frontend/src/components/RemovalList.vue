<template>
  <div id="removals">
    <div id="removals-table">
      <div id="removals-table-heading">
        <div class="identificador">Employee</div>
        <div class="nome">Project</div>
        <div class="nome">Date</div>
        <div class="actions">Action</div>
        <div class="actions">Item</div>
        <div class="actions">Amount</div>
        <div class="actions">Value</div>
      </div>
      <div id="removals-table-rows">
        <div
          v-for="removal in removals"
          :key="removal.id"
          class="removals-table-row"
        >
          <div class="id">{{ removal.employeeName }}</div>
          <div class="id">{{ removal.project }}</div>
          <div class="name">{{ formatDate(removal.date) }}</div>
          <div class="date">{{ removal.action }}</div>
          <div class="action">{{ removal.item }}</div>
          <div class="action">{{ removal.amount }}</div>
          <div class="action">{{ formatValue(removal.value) }}</div>
        </div>
      </div>
    </div>
    <pagination
      class="pagination"
      v-if="removals.length"
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

export default {
  name: "RemovalsList",
  components: { EditButton, DeleteButton, Pagination },
  props: {
    propsType: null
  },
  data() {
    return {
      removals: [],
      offset: 0,
      limit: 20,
      total: 0,
      searchValue: null,
      type: null
    };
  },
  methods: {
    async getRemovals() {
      const url = `${baseApiUrl}/stock-actions/${this.type}`;

      await axios(url).then((res) => (this.total = res.data.length));
      
      const urlLimites = `${baseApiUrl}/stock-actions/${this.type}/${this.offset}/${this.limit}`;

      await axios(urlLimites).then((res) => (this.removals = res.data));
    },
    formatValue(value) {
      let newValue = value.toLocaleString()
      return "R$" + newValue
    },
    changePage(value) {
      this.offset = value;
      this.getRemovals();
    },
    formatDate(date) {
      const dateBr = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'medium', timeZone: 'America/Sao_Paulo' }).format(Date.parse(date));

      return dateBr
    }
  },
  mounted() {
    if(this.propsType) {this.type = this.propsType}
    this.getRemovals();
  },
};
</script>
  
  <style>
#removals {
  width: 88vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#removals-table {
  width: 95%;
  height: 88%;
  margin-top: 2%;
  padding: 5px;
  display: grid;
  grid-template-rows: 5% 95%;
  grid-template-areas: "heading" "rows";
  overflow: auto;
}

#removals-table-heading {
  grid-area: heading;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: 14% 14% 14% 14% 14% 16% 14%;
  border-bottom: 3px solid #222;
}

#removals-table-rows {
  grid-area: rows;
  display: grid;
  grid-auto-rows: 5%;
}

.removals-table-row {
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: 14% 14% 14% 14% 14% 16% 14%;
  border-bottom: 1px solid #ccc;
}

#removals-table .buttons {
  width: 100%;
  display: flex;
  justify-content: center;
}

.removals .searchBar {
  align-self: flex-start;
  margin-top: 30px;
  margin-left: 30px;
  height: 5%;
}

.removals .pagination {
  height: 5%;
}

</style>


    
  
  
    
      
    
    