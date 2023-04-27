<template>
  <div class="card">
    <div class="card-top">
      <h2>{{ cardNumber }}</h2>
      <div class="buttons">
        <EditButton
          @click="
            $emit('editEmployee', {
              id: id,
              name: name,
              cpf: cpf,
              role: role,
              intermittent: intermittent,
              cardNumber: cardNumber,
              button: 'Editar Colaborador',
              category: 'newEmployee',
            })
          "
        />
        <DeleteButton @click="$emit('deleteEmployee', id)"/>
      </div>
    </div>
    <div class="card-body">
      <font-awesome-icon class="userIcon" icon="fa-solid fa-user-tie" />
      <h1 v-if="name">{{ fullName() }}</h1>
      <h2>CPF: {{ cpf }}</h2>
      <h2>Role: {{ role }}</h2>
      <h2 v-show="this.intermittent">Intermittent</h2>
    </div>
  </div>
</template>

<script>
import DeleteButton from "./DeleteButton.vue";
import EditButton from "./EditButton.vue";

export default {
  name: "CardColaborador",
  components: {
    DeleteButton,
    EditButton,
  },
  emits: ["editEmployee", "deleteEmployee"],
  data() {
    return {
      nomeCompleto: "pi",
    };
  },
  props: {
    id: null,
    name: String,
    cpf: String,
    role: String,
    intermittent: Boolean,
    cardNumber: String,
  },
  methods: {
    fullName() {
      let wordsName = this.name.split(" ");
      let lName = wordsName.length;
      let name = wordsName[0];
      let lastName = wordsName[lName - 1];
      let fullName = name + " " + lastName;

      return fullName;
    },
  },
};
</script>

<style scoped>
.card {
  padding: 10px;
  margin: 10px;
  border: 2px solid #000;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  height: 300px;
  width: 300px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(255, 255, 255, 1) 53%,
    rgba(255, 255, 255, 1) 100%
  );
}

.userIcon {
  border-radius: 10%;
  height: 100px;
  width: 100px;
  align-self: center;
  margin: 10px;
  padding: 5px;
  background-color: #000;
  border: 1px solid #000;
  color: #fff;
}

.card h2 {
  font-size: 20px;
  margin-top: 5px;
}
.card .card-top {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.card .card-top h2 {
  color: #fff;
}
.card .card-top .buttons {
  display: flex;
  visibility: hidden;
}

.card:hover .card-top .buttons {
  visibility: visible;
}

.card .card-body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.card .card-body h1 {
  font-size: 25px;
  align-self: center;
  margin-bottom: 5px;
}

.card .card-body h2 {
  font-size: 18px;
}
</style>