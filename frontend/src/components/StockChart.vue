<template>
  <div id="stock-chart">
    <div class="year-input">
      <select v-model="year" @change="updateChart" >
        <option v-for="year in years" :key="year.index" :value="year">
          {{ year }}
        </option>
      </select>
    </div>
    <canvas id="meuGrafico"></canvas>
  </div>
</template>
  
  <script>
import Chart from "chart.js/auto";
import axios from "axios";
import { baseApiUrl } from "@/global";

export default {
  name: "StockChart",
  data() {
    return {
      year: null,
      years: [],
      first: true,
      dbEntries: [],
      dbRemovals: [],
    };
  },
  methods: {
    async getData() {
      await axios(`${baseApiUrl}/stock-actions/action/entrada`).then(
        (res) => (this.dbEntries = res.data)
      );

      await axios(`${baseApiUrl}/stock-actions/action/retirada`).then(
        (res) => (this.dbRemovals = res.data)
      );
    },
    async getChart() {
      const januaryEntries = this.dbEntries.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year, 1, 1) &&
          Date.parse(item.date) > new Date(this.year - 1, 11, 30)
      );
      const februaryEntries = this.dbEntries.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year, 2, 1) &&
          Date.parse(item.date) > new Date(this.year, 0, 30)
      );
      const marchEntries = this.dbEntries.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year, 3, 1) &&
          Date.parse(item.date) > new Date(this.year, 1, 30)
      );
      const aprilEntries = this.dbEntries.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year, 4, 1) &&
          Date.parse(item.date) > Date.parse(this.year, 2, 30)
      );
      const mayEntries = this.dbEntries.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year, 5, 1) &&
          Date.parse(item.date) > new Date(this.year, 3, 30)
      );
      const juneEntries = this.dbEntries.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year, 6, 1) &&
          Date.parse(item.date) > new Date(this.year, 4, 30)
      );
      const julyEntries = this.dbEntries.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year, 7, 1) &&
          Date.parse(item.date) > new Date(this.year, 5, 30)
      );
      const augustEntries = this.dbEntries.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year, 8, 1) &&
          Date.parse(item.date) > new Date(this.year, 6, 30)
      );
      const septemberEntries = this.dbEntries.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year, 9, 1) &&
          Date.parse(item.date) > new Date(this.year, 7, 30)
      );
      const octoberEntries = this.dbEntries.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year, 10, 1) &&
          Date.parse(item.date) > new Date(this.year, 8, 30)
      );
      const novemberEntries = this.dbEntries.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year, 11, 1) &&
          Date.parse(item.date) > new Date(this.year, 9, 30)
      );
      const decemberEntries = this.dbEntries.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year + 1, 0, 1) &&
          Date.parse(item.date) > new Date(this.year, 10, 30)
      );

      const januaryRemovals = this.dbRemovals.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year, 1, 1) &&
          Date.parse(item.date) > new Date(2022, 11, 30)
      );
      const februaryRemovals = this.dbRemovals.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year, 2, 1) &&
          Date.parse(item.date) > new Date(this.year, 0, 30)
      );
      const marchRemovals = this.dbRemovals.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year, 3, 1) &&
          Date.parse(item.date) > new Date(this.year, 1, 30)
      );
      const aprilRemovals = this.dbRemovals.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year, 4, 1) &&
          Date.parse(item.date) > Date.parse(this.year, 2, 30)
      );
      const mayRemovals = this.dbRemovals.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year, 5, 1) &&
          Date.parse(item.date) > new Date(this.year, 3, 30)
      );
      const juneRemovals = this.dbRemovals.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year, 6, 1) &&
          Date.parse(item.date) > new Date(this.year, 4, 30)
      );
      const julyRemovals = this.dbRemovals.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year, 7, 1) &&
          Date.parse(item.date) > new Date(this.year, 5, 30)
      );
      const augustRemovals = this.dbRemovals.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year, 8, 1) &&
          Date.parse(item.date) > new Date(this.year, 6, 30)
      );
      const septemberRemovals = this.dbRemovals.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year, 9, 1) &&
          Date.parse(item.date) > new Date(this.year, 7, 30)
      );
      const octoberRemovals = this.dbRemovals.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year, 10, 1) &&
          Date.parse(item.date) > new Date(this.year, 8, 30)
      );
      const novemberRemovals = this.dbRemovals.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year, 11, 1) &&
          Date.parse(item.date) > new Date(this.year, 9, 30)
      );
      const decemberRemovals = this.dbRemovals.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year + 1, 0, 1) &&
          Date.parse(item.date) > new Date(this.year, 10, 30)
      );

      let januaryEntrieValue = 0;
      let februaryEntrieValue = 0;
      let marchEntrieValue = 0;
      let aprilEntrieValue = 0;
      let mayEntrieValue = 0;
      let juneEntrieValue = 0;
      let julyEntrieValue = 0;
      let augustEntrieValue = 0;
      let septemberEntrieValue = 0;
      let octoberEntrieValue = 0;
      let novemberEntrieValue = 0;
      let decemberEntrieValue = 0;
      let brljanuaryEntrieValue = "R$" + januaryEntrieValue.toFixed(2)
      let brlfebruaryEntrieValue = "R$" + februaryEntrieValue.toFixed(2)
      let brlmarchEntrieValue = "R$" + marchEntrieValue.toFixed(2)
      let brlaprilEntrieValue = "R$" + aprilEntrieValue.toFixed(2)
      let brlmayEntrieValue = "R$" + mayEntrieValue.toFixed(2)
      let brljuneEntrieValue = "R$" + juneEntrieValue.toFixed(2)
      let brljulyEntrieValue = "R$" + julyEntrieValue.toFixed(2)
      let brlaugustEntrieValue = "R$" + augustEntrieValue.toFixed(2)
      let brlseptemberEntrieValue = "R$" + septemberEntrieValue.toFixed(2)
      let brloctoberEntrieValue = "R$" + octoberEntrieValue.toFixed(2)
      let brlnovemberEntrieValue = "R$" + novemberEntrieValue.toFixed(2)
      let brldecemberEntrieValue = "R$" + decemberEntrieValue.toFixed(2)

      let januaryRemovalsValue = 0;
      let februaryRemovalsValue = 0;
      let marchRemovalsValue = 0;
      let aprilRemovalsValue = 0;
      let mayRemovalsValue = 0;
      let juneRemovalsValue = 0;
      let julyRemovalsValue = 0;
      let augustRemovalsValue = 0;
      let septemberRemovalsValue = 0;
      let octoberRemovalsValue = 0;
      let novemberRemovalsValue = 0;
      let decemberRemovalsValue = 0;

      januaryEntries.forEach((item) => (januaryEntrieValue += item.value));
      februaryEntries.forEach((item) => (februaryEntrieValue += item.value));
      marchEntries.forEach((item) => (marchEntrieValue += item.value));
      aprilEntries.forEach((item) => (aprilEntrieValue += item.value));
      mayEntries.forEach((item) => (mayEntrieValue += item.value));
      juneEntries.forEach((item) => (juneEntrieValue += item.value));
      julyEntries.forEach((item) => (julyEntrieValue += item.value));
      augustEntries.forEach((item) => (augustEntrieValue += item.value));
      septemberEntries.forEach((item) => (septemberEntrieValue += item.value));
      octoberEntries.forEach((item) => (octoberEntrieValue += item.value));
      novemberEntries.forEach((item) => (novemberEntrieValue += item.value));
      decemberEntries.forEach((item) => (decemberEntrieValue += item.value));

      januaryRemovals.forEach((item) => (januaryRemovalsValue += item.value));
      februaryRemovals.forEach((item) => (februaryRemovalsValue += item.value));
      marchRemovals.forEach((item) => (marchRemovalsValue += item.value));
      aprilRemovals.forEach((item) => (aprilRemovalsValue += item.value));
      mayRemovals.forEach((item) => (mayRemovalsValue += item.value));
      juneRemovals.forEach((item) => (juneRemovalsValue += item.value));
      julyRemovals.forEach((item) => (julyRemovalsValue += item.value));
      augustRemovals.forEach((item) => (augustRemovalsValue += item.value));
      septemberRemovals.forEach(
        (item) => (septemberRemovalsValue += item.value)
      );
      octoberRemovals.forEach((item) => (octoberRemovalsValue += item.value));
      novemberRemovals.forEach((item) => (novemberRemovalsValue += item.value));
      decemberRemovals.forEach((item) => (decemberRemovalsValue += item.value));

      const canvas = document.getElementById("meuGrafico");
      if (!this.first) {
        this.chart.update();
        return;
      }
      this.first = false;
      this.chart = new Chart(canvas, {
        type: "bar",
        data: {
          labels: [
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro",
          ],
          datasets: [
            {
              label: "Entradas",
              data: [
                januaryEntrieValue,
                februaryEntrieValue,
                marchEntrieValue,
                aprilEntrieValue,
                mayEntrieValue,
                juneEntrieValue,
                julyEntrieValue,
                augustEntrieValue,
                septemberEntrieValue,
                octoberEntrieValue,
                novemberEntrieValue,
                decemberEntrieValue,
              ],
              backgroundColor: [
                "rgba(255, 0, 0, 1)",
                "rgba(255, 127, 0, 1)",
                "rgba(255, 255, 0, 1)",
                "rgba(127, 255, 0, 1)",
                "rgba(0, 255, 0, 1)",
                "rgba(0, 255, 127, 1)",
                "rgba(0, 255, 255, 1)",
                "rgba(0, 127, 255, 1)",
                "rgba(0, 0, 255, 1)",
                "rgba(127, 0, 255, 1)",
                "rgba(255, 0, 255, 1)",
                "rgba(255, 0, 127, 1)",
              ],
              borderColor: [
                "rgba(255, 0, 0, 1)",
                "rgba(255, 127, 0, 1)",
                "rgba(255, 255, 0, 1)",
                "rgba(127, 255, 0, 1)",
                "rgba(0, 255, 0, 1)",
                "rgba(0, 255, 127, 1)",
                "rgba(0, 255, 255, 1)",
                "rgba(0, 127, 255, 1)",
                "rgba(0, 0, 255, 1)",
                "rgba(127, 0, 255, 1)",
                "rgba(255, 0, 255, 1)",
                "rgba(255, 0, 127, 1)",
              ],
              borderWidth: 1,
            },
            {
              label: "Saídas",
              data: [
                januaryRemovalsValue,
                februaryRemovalsValue,
                marchRemovalsValue,
                aprilRemovalsValue,
                mayRemovalsValue,
                juneRemovalsValue,
                julyRemovalsValue,
                augustRemovalsValue,
                septemberRemovalsValue,
                octoberRemovalsValue,
                novemberRemovalsValue,
                decemberRemovalsValue,
              ],
              backgroundColor: [
                "rgba(255, 0, 0, 0.2)",
                "rgba(255, 127, 0, 0.2)",
                "rgba(255, 255, 0, 0.2)",
                "rgba(127, 255, 0, 0.2)",
                "rgba(0, 255, 0, 0.2)",
                "rgba(0, 255, 127, 0.2)",
                "rgba(0, 255, 255, 0.2)",
                "rgba(0, 127, 255, 0.2)",
                "rgba(0, 0, 255, 0.2)",
                "rgba(127, 0, 255, 0.2)",
                "rgba(255, 0, 255, 0.2)",
                "rgba(255, 0, 127, 0.2)",
              ],
              borderColor: [
                "rgba(255, 0, 0, 1)",
                "rgba(255, 127, 0, 1)",
                "rgba(255, 255, 0, 1)",
                "rgba(127, 255, 0, 1)",
                "rgba(0, 255, 0, 1)",
                "rgba(0, 255, 127, 1)",
                "rgba(0, 255, 255, 1)",
                "rgba(0, 127, 255, 1)",
                "rgba(0, 0, 255, 1)",
                "rgba(127, 0, 255, 1)",
                "rgba(255, 0, 255, 1)",
                "rgba(255, 0, 127, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          locale: "br-BR",
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value, index, values) => {
                  return new Intl.NumberFormat("br-BR", {
                    style: "currency",
                    currency: "BRL",
                    maximumSignificantDigits: 2
                  }).format(value)
                }
              }
            },
          },
        },
      });
    },
    updateChart() {
      console.log(this.year);
      const chart = Chart.getChart("meuGrafico");

      const januaryEntries = this.dbEntries.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year, 1, 1) &&
          Date.parse(item.date) > new Date(this.year - 1, 11, 30)
      );
      const februaryEntries = this.dbEntries.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year, 2, 1) &&
          Date.parse(item.date) > new Date(this.year, 0, 30)
      );
      const marchEntries = this.dbEntries.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year, 3, 1) &&
          Date.parse(item.date) > new Date(this.year, 1, 30)
      );
      const aprilEntries = this.dbEntries.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year, 4, 1) &&
          Date.parse(item.date) > Date.parse(this.year, 2, 30)
      );
      const mayEntries = this.dbEntries.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year, 5, 1) &&
          Date.parse(item.date) > new Date(this.year, 3, 30)
      );
      const juneEntries = this.dbEntries.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year, 6, 1) &&
          Date.parse(item.date) > new Date(this.year, 4, 30)
      );
      const julyEntries = this.dbEntries.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year, 7, 1) &&
          Date.parse(item.date) > new Date(this.year, 5, 30)
      );
      const augustEntries = this.dbEntries.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year, 8, 1) &&
          Date.parse(item.date) > new Date(this.year, 6, 30)
      );
      const septemberEntries = this.dbEntries.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year, 9, 1) &&
          Date.parse(item.date) > new Date(this.year, 7, 30)
      );
      const octoberEntries = this.dbEntries.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year, 10, 1) &&
          Date.parse(item.date) > new Date(this.year, 8, 30)
      );
      const novemberEntries = this.dbEntries.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year, 11, 1) &&
          Date.parse(item.date) > new Date(this.year, 9, 30)
      );
      const decemberEntries = this.dbEntries.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year + 1, 0, 1) &&
          Date.parse(item.date) > new Date(this.year, 10, 30)
      );

      const januaryRemovals = this.dbRemovals.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year, 1, 1) &&
          Date.parse(item.date) > new Date(2022, 11, 30)
      );
      const februaryRemovals = this.dbRemovals.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year, 2, 1) &&
          Date.parse(item.date) > new Date(this.year, 0, 30)
      );
      const marchRemovals = this.dbRemovals.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year, 3, 1) &&
          Date.parse(item.date) > new Date(this.year, 1, 30)
      );
      const aprilRemovals = this.dbRemovals.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year, 4, 1) &&
          Date.parse(item.date) > Date.parse(this.year, 2, 30)
      );
      const mayRemovals = this.dbRemovals.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year, 5, 1) &&
          Date.parse(item.date) > new Date(this.year, 3, 30)
      );
      const juneRemovals = this.dbRemovals.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year, 6, 1) &&
          Date.parse(item.date) > new Date(this.year, 4, 30)
      );
      const julyRemovals = this.dbRemovals.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year, 7, 1) &&
          Date.parse(item.date) > new Date(this.year, 5, 30)
      );
      const augustRemovals = this.dbRemovals.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year, 8, 1) &&
          Date.parse(item.date) > new Date(this.year, 6, 30)
      );
      const septemberRemovals = this.dbRemovals.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year, 9, 1) &&
          Date.parse(item.date) > new Date(this.year, 7, 30)
      );
      const octoberRemovals = this.dbRemovals.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year, 10, 1) &&
          Date.parse(item.date) > new Date(this.year, 8, 30)
      );
      const novemberRemovals = this.dbRemovals.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year, 11, 1) &&
          Date.parse(item.date) > new Date(this.year, 9, 30)
      );
      const decemberRemovals = this.dbRemovals.filter(
        (item) =>
          Date.parse(item.date) < new Date(this.year + 1, 0, 1) &&
          Date.parse(item.date) > new Date(this.year, 10, 30)
      );

      let januaryEntrieValue = 0;
      let februaryEntrieValue = 0;
      let marchEntrieValue = 0;
      let aprilEntrieValue = 0;
      let mayEntrieValue = 0;
      let juneEntrieValue = 0;
      let julyEntrieValue = 0;
      let augustEntrieValue = 0;
      let septemberEntrieValue = 0;
      let octoberEntrieValue = 0;
      let novemberEntrieValue = 0;
      let decemberEntrieValue = 0;

      let januaryRemovalsValue = 0;
      let februaryRemovalsValue = 0;
      let marchRemovalsValue = 0;
      let aprilRemovalsValue = 0;
      let mayRemovalsValue = 0;
      let juneRemovalsValue = 0;
      let julyRemovalsValue = 0;
      let augustRemovalsValue = 0;
      let septemberRemovalsValue = 0;
      let octoberRemovalsValue = 0;
      let novemberRemovalsValue = 0;
      let decemberRemovalsValue = 0;

      januaryEntries.forEach((item) => (januaryEntrieValue += item.value));
      februaryEntries.forEach((item) => (februaryEntrieValue += item.value));
      marchEntries.forEach((item) => (marchEntrieValue += item.value));
      aprilEntries.forEach((item) => (aprilEntrieValue += item.value));
      mayEntries.forEach((item) => (mayEntrieValue += item.value));
      juneEntries.forEach((item) => (juneEntrieValue += item.value));
      julyEntries.forEach((item) => (julyEntrieValue += item.value));
      augustEntries.forEach((item) => (augustEntrieValue += item.value));
      septemberEntries.forEach((item) => (septemberEntrieValue += item.value));
      octoberEntries.forEach((item) => (octoberEntrieValue += item.value));
      novemberEntries.forEach((item) => (novemberEntrieValue += item.value));
      decemberEntries.forEach((item) => (decemberEntrieValue += item.value));

      januaryRemovals.forEach((item) => (januaryRemovalsValue += item.value));
      februaryRemovals.forEach((item) => (februaryRemovalsValue += item.value));
      marchRemovals.forEach((item) => (marchRemovalsValue += item.value));
      aprilRemovals.forEach((item) => (aprilRemovalsValue += item.value));
      mayRemovals.forEach((item) => (mayRemovalsValue += item.value));
      juneRemovals.forEach((item) => (juneRemovalsValue += item.value));
      julyRemovals.forEach((item) => (julyRemovalsValue += item.value));
      augustRemovals.forEach((item) => (augustRemovalsValue += item.value));
      septemberRemovals.forEach(
        (item) => (septemberRemovalsValue += item.value)
      );
      octoberRemovals.forEach((item) => (octoberRemovalsValue += item.value));
      novemberRemovals.forEach((item) => (novemberRemovalsValue += item.value));
      decemberRemovals.forEach((item) => (decemberRemovalsValue += item.value));

      chart.data.datasets[0].data[0] = januaryEntrieValue;
      chart.data.datasets[0].data[1] = februaryEntrieValue;
      chart.data.datasets[0].data[2] = marchEntrieValue;
      chart.data.datasets[0].data[3] = aprilEntrieValue;
      chart.data.datasets[0].data[4] = mayEntrieValue;
      chart.data.datasets[0].data[5] = juneEntrieValue;
      chart.data.datasets[0].data[6] = julyEntrieValue;
      chart.data.datasets[0].data[7] = augustEntrieValue;
      chart.data.datasets[0].data[8] = septemberEntrieValue;
      chart.data.datasets[0].data[9] = octoberEntrieValue;
      chart.data.datasets[0].data[10] = novemberEntrieValue;
      chart.data.datasets[0].data[11] = decemberEntrieValue;

      chart.data.datasets[1].data[0] = januaryRemovalsValue;
      chart.data.datasets[1].data[1] = februaryRemovalsValue;
      chart.data.datasets[1].data[2] = marchRemovalsValue;
      chart.data.datasets[1].data[3] = aprilRemovalsValue;
      chart.data.datasets[1].data[4] = mayRemovalsValue;
      chart.data.datasets[1].data[5] = juneRemovalsValue;
      chart.data.datasets[1].data[6] = julyRemovalsValue;
      chart.data.datasets[1].data[7] = augustRemovalsValue;
      chart.data.datasets[1].data[8] = septemberRemovalsValue;
      chart.data.datasets[1].data[9] = octoberRemovalsValue;
      chart.data.datasets[1].data[10] = novemberRemovalsValue;
      chart.data.datasets[1].data[11] = decemberRemovalsValue;

      chart.update();
    },
  },
  async mounted() {
    this.year = new Date().getFullYear();
    for (let i = 1970; i < new Date().getFullYear() + 1; i++) {
      this.years.push(i);
    }

    await this.getData();
    this.getChart();
  },
};
</script>

<style>
#stock-chart {
  display: flex;
  flex-direction: column;
}

#stock-chart select {
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

</style>