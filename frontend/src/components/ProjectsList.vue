<template>
  <div class="projects">
    <Message :msg="msg" :msgType="msgType" v-show="msg" />
    <SearchBar class="searchBar" @search="search" />
    <div id="projects-table">
      <div id="projects-table-heading">
        <div class="number">Number</div>
        <div class="name">Name</div>
        <div class="actions">Actions</div>
      </div>
      <div id="projects-table-rows" v-if="!searchValue">
        <div
          v-for="project in projects"
          :key="project.id"
          class="projects-table-row"
        >
          <div class="number">{{ project.number }}</div>
          <div class="name">{{ project.name }}</div>
          <div class="buttons">
            <EditButton
              @click="
                $emit('editProject', {
                  category: 'new',
                  id: project.id,
                  name: project.name,
                  number: project.number,
                  button: 'Atualizar Projeto',
                })
              "
            />
            <DeleteButton @click="deleteProject(project.id)" />
          </div>
        </div>
      </div>
      <div id="projects-table-rows" v-if="searchValue">
        <div
          v-for="project in projectsSearch"
          :key="project.id"
          class="projects-table-row"
        >
          <div class="number">{{ project.number }}</div>
          <div class="name">{{ project.name }}</div>
          <div class="buttons">
            <EditButton
              @click="
                $emit('editProject', {
                  category: 'new',
                  id: project.id,
                  name: project.name,
                  number: project.number,
                  button: 'Atualizar Projeto',
                })
              "
            />
            <DeleteButton @click="deleteProject(project.id)" />
          </div>
        </div>
      </div>
    </div>
    <pagination
      class="pagination"
      v-if="projects.length"
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
import Pagination from "./Pagination.vue";
import SearchBar from "./SearchBar.vue";
import EditButton from "./EditButton.vue";
import DeleteButton from "./DeleteButton.vue";
import Message from "./Message.vue";

export default {
  name: "ProjetosAbertos",
  components: {
    Pagination,
    SearchBar,
    EditButton,
    DeleteButton,
    Message,
  },
  emits: ["editProject", "mudarCategoria"],
  data() {
    return {
      projects: [],
      searchValue: null,
      projectsSearch: [],
      offset: 0,
      limit: 20,
      total: 0,
      msg: null,
      msgType: null
    };
  },
  props: {
    type: String,
  },
  methods: {
    async getProjetos() {
      await axios(`${baseApiUrl}/projects/status/active`).then(
        (res) => (this.total = res.data.length)
      );

      await axios(
        `${baseApiUrl}/projects/limit/active/${this.offset}/${this.limit}`
      ).then((res) => (this.projects = res.data));

    },
    changePage(value) {
      if (this.searchValue) {
        let lastIndex;
        if (value < 1) {
          lastIndex = this.limit;
        } else {
          lastIndex = value * 2;
        }
        this.projectslSearch = this.projects.slice(value, lastIndex);
      } else if (this.sorted) {
        this.offset = value;
        switch (this.sortedBy) {
          case "number":
            this.orderByCode(false);
          case "name":
            this.orderByName();
        }
      } else {
        this.offset = value;
        this.getProjetos();
      }
    },
    async search(value) {
      this.searchValue = value.toLowerCase();

      const url = `${baseApiUrl}/projects`;

      await axios(url).then(
        (res) => (this.projects = res.data.filter(this.hasValue))
      );

      this.total = this.projects.length;

      this.projectsSearch = this.projects.slice(0, 20);
    },
    hasValue(item) {
      return item.name.toLowerCase().includes(`${this.searchValue}`);
    },
    deleteProject(id) {
      const data = {
        status: "inactive",
      };

      axios.post(`${baseApiUrl}/projects/id/${id}`, data);

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
    this.getProjetos();
  },
};
</script>

<style>
.projects {
  width: 88vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#projects-table {
  width: 95%;
  height: 88%;
  padding: 5px;
  display: grid;
  grid-template-rows: 5% 95%;
  grid-template-areas: "heading" "rows";
  overflow: auto;
}

#projects-table-heading {
  grid-area: heading;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: 10% 80% 10%;
  border-bottom: 3px solid #222;
}

#projects-table-rows {
  grid-area: rows;
  display: grid;
  grid-auto-rows: 5%;
}

.projects-table-row {
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: 10% 80% 10%;
  border-bottom: 1px solid #ccc;
}

#projects-table .buttons {
  width: 100%;
  display: flex;
  justify-content: center;
}

.projects .searchBar {
  align-self: flex-start;
  justify-self: center;
  margin-top: 30px;
  margin-left: 30px;
  height: 5%;
}

.projects .pagination {
  height: 5%;
}

#projects-table-heading .number,
#projects-table-heading .name {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
}

#projects-table-heading .number:hover,
#projects-table-heading .name:hover {
  background-color: rgba(12, 104, 141, 0.582);
  cursor: pointer;
}

#projects-table .buttons {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>