<template>
  <div class="main-container">
    <Message :msg="msg" :msgType="msgType" v-show="msg" />
    <div>
      <form id="report-form" @submit="generateReport">
        <div class="input-container">
          <label for="type">Project</label>
          <select name="project" @change="getData" v-model="project">
            <option
              v-for="project in projects"
              :key="project.id"
              :value="project.number"
            >
              {{ project.number + " - " + project.name }}
            </option>
          </select>
        </div>
        <div class="input-container">
          <label for="amount">Include</label>
          <div class="checkbox-container">
            <div class="checkbox-input">
              <input
                type="checkbox"
                id="product"
                name="product"
                value="product"
                v-model="includes"
              />
              <span>Products</span>
            </div>
            <div class="checkbox-input">
              <input
                type="checkbox"
                id="material"
                name="material"
                value="material"
                v-model="includes"
              />
              <span>Materials</span>
            </div>
            <div class="checkbox-input">
              <input
                type="checkbox"
                id="tool"
                name="tool"
                value="ferramenta"
                v-model="includes"
              />
              <span>Tools</span>
            </div>
          </div>
        </div>
        <div class="input-container">
          <input type="submit" class="submit-btn" value="Gerar Relatório" />
        </div>
      </form>
    </div>
  </div>
</template>
    
    <script>
import axios from "axios";
import { baseApiUrl } from '@/global'
import Message from "./Message.vue";
export default {
  name: "ReportForm",
  components: { Message },
  emits: ["generateReport"],
  data() {
    return {
      project: null,
      projectFullName: null,
      projects: [],
      includes: [],
      removals: null,
      filteredRemovals: [],
      msg: null,
      msgType: null,
    };
  },
  methods: {
    async getProjects() {
      await axios(`${baseApiUrl}/projects`).then(
        (res) => (this.projects = res.data)
      );
    },
    async getActions() {
      await axios(`${baseApiUrl}/stock-actions`)
        .then((res) =>
          res.data.filter((action) => {
            return action.project === this.project;
          })
        )
        .then((filtered) => (this.removals = filtered));
    },
    getData() {
      this.getActions();
      this.getFullName();
    },
    async generateReport(e) {
      e.preventDefault();

      console.log(this.removals)
        this.includes.forEach(type => {
            this.removals.forEach(removal => {
                if( removal.type === type ) {
                    this.filteredRemovals.push(removal)
                }
            })
        })

        console.log(this.filteredRemovals)
      this.$emit("generateReport", {
        category: "report",
        projectFullName: this.projectFullName,
        actions: this.filteredRemovals,
      });
    },
    async getFullName() {
      let data;
      await axios(`${baseApiUrl}/projects/number/${this.project}`).then(
        (res) => (data = res.data[0])
      );

      this.projectFullName = data.number + " - " + data.name;
    },
  },
  mounted() {
    this.getProjects();
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
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.3s;
}

.submit-btn:hover {
  background-color: rgb(138, 7, 7);
}

#report-form .checkbox-container {
  height: 100px;
  width: 500px;
  margin-top: 1%;
  display: flex;
  flex-wrap: wrap;
}

#report-form .checkbox-container .checkbox-input {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 29px;
  width: 50%;
}

#report-form .checkbox-container input {
  height: 25px;
  width: 25px;
}

#report-form .checkbox-container span {
  margin-left: 5px;
}
</style>