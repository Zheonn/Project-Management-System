<template>
  <div class="main-container">
    <div class="home">
      <div class="cardHome">
        <img src="../../public/img/logo-black.png" alt="logo" />
        <h2>Welcome to "Project Management System"!</h2>
      </div>
    </div>
  </div>
</template>

<script>
import LeftNavbar from "../components/LeftNavbar.vue";
import { mapState } from "vuex";

export default {
  name: "HomeView",
  emits: ["oi"],
  components: {
    LeftNavbar,
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

<style>
.home {
  height: 90vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.cardHome img {
  height: 200px;
  width: 200px;
}

.cardHome h2 {
  margin-top: 50px;
  color: #fff;
}

.cardHome {
  width: 100%;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(138, 7, 7);
}
</style>