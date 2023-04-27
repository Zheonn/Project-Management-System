<template>
    <div :class="cardClass">
      <font-awesome-icon class="icon" :icon="icon" />
      <h1>{{ name }}</h1>
      <h2>Registered: {{ amount }}</h2>
      <h2 v-if="total">Value: R${{ total.toFixed(2) }}</h2>
    </div>
</template>
  
  <script>
export default {
  name: "StatisticCard",
  props: {
    type: String,
    cardClass: String,
    name: String,
    amount: Number,
    total: Number,
    icon: String,
  },
  data() {
    return {
      formattedValue: null,
    };
  },
  mounted() {
    if(this.total) {    
        this.formattedValue = this.total.toFixed(2);
    }
  },
};
</script>
  
  <style scoped>
.card-products {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid #000;
  border-radius: 5px;
  height: 200px;
  width: 200px;
  background: linear-gradient(
    180deg,
    rgb(124, 157, 248) 0%,
    rgb(149, 172, 235) 53%,
    rgb(193, 205, 238) 100%
  );
}

.card-products h1 {
  font-size: 25px;
  margin-bottom: 5px;
}

.card-products h2 {
  font-size: 18px;
}

.card-materials {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid #000;
  border-radius: 5px;
  height: 200px;
  width: 200px;
  background: linear-gradient(
    180deg,
    rgb(124, 248, 151) 0%,
    rgb(149, 235, 175) 53%,
    rgb(193, 238, 199) 100%
  );
}

.card-materials h1 {
  font-size: 25px;
  margin-bottom: 5px;
}

.card-materials h2 {
  font-size: 18px;
}

.card-tools {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid #000;
  border-radius: 5px;
  height: 200px;
  width: 200px;
  background: linear-gradient(
    180deg,
    rgb(248, 124, 124) 0%,
    rgb(235, 149, 149) 53%,
    rgb(238, 193, 193) 100%
  );
}

.card-tools h1 {
  font-size: 25px;
  margin-bottom: 5px;
}

.card-tools h2 {
  font-size: 18px;
}

.icon {
  height: 100px;
  width: 100px;
  margin-bottom: 10px;
  color: #000000;
}

.card-employees {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid #000;
  border-radius: 5px;
  height: 200px;
  width: 200px;
  background: linear-gradient(
    180deg,
    rgb(248, 240, 124) 0%,
    rgb(235, 229, 149) 53%,
    rgb(238, 237, 193) 100%
  );
}

.card-employees h1 {
  font-size: 25px;
  margin-bottom: 5px;
}

.card-employees h2 {
  font-size: 18px;
}

.card-projects {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid #000;
  border-radius: 5px;
  height: 200px;
  width: 200px;
  background: linear-gradient(
    180deg,
    rgb(124, 248, 242) 0%,
    rgb(149, 235, 235) 53%,
    rgb(193, 236, 238) 100%
  );
}

.card-projects h1 {
  font-size: 25px;
  margin-bottom: 5px;
}

.card-projects h2 {
  font-size: 18px;
}

@media (max-height: 800px) {
 
.card-products,
.card-materials,
.card-tools,
.card-employees,
.card-projects {
  height: 150px;
  width: 150px;
}  

.card-products h1,
.card-materials h1,
.card-tools h1,
.card-employees h1,
.card-projects {
  font-size: 18px;
  margin-bottom: 5px;
}  

.card-products h2,
.card-materials h2,
.card-tools h2,
.card-employees h2,
.card-projects h2{
  font-size: 14px;
} 

.icon {
  height: 50px;
  width: 50px;

}

}

</style>