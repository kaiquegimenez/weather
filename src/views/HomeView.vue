<template>
  <body>
    <Header/>
    <main class="container">
      <section class="content">
        <div class="cards">
          <section class="card" v-for="(weather, index) in weathers" :id="index.replace(',', '').replace(' ', '')" :key="index">
            <Card :weather="weather" />
          </section>
        </div>
      </section>
    </main>
  </body>
</template>

<script>
import Header from "@/components/Header.vue";
import Card from "@/components/Card.vue";
import axios from "axios";
import moment from "moment";
export default {
  name: "HomeView",
  components: {
    Header,
    Card,
  },
  data() {
    return {
      api_key: "b83d133cf105d0dc7c5544ee4eb7c80a",
      url_base: "https://api.openweathermap.org/data/2.5/",
      weathers: {
        "Nuuk, GL": {
          main: {},
        },
        "Urubici, BR": {
          main: {},
        },
        "Nairobi, KE": {
          main: {},
        },
      },
    };
  },
  mounted() {
    Object.keys(this.weathers).forEach((city) => {
      const weather = JSON.parse(window.localStorage.getItem(`weathers/${city}`));
      if(this.verifyWeathers(weather)) {
        if(this.verifyTimeWeathers(weather)) {
          this.getWeathers(city);
        } else {
          this.weathers[city] = weather;
        }
      } else {
        this.getWeathers(city);
      }
      
    })
  },
  methods: {
    // Chama a API para retornar o clima nas cidades
    getWeathers(city) {
      axios.get(`${this.url_base}weather?q=${city}&units=metric&APPID=${this.api_key}`)
        .then((res) => {
          const temp = parseInt(res.data.main.temp);
          this.weathers[city].main = res.data.main;
          this.weathers[city].name = city;
          this.weathers[city].time = moment();
          this.weathers[city].color = temp <= 5 ? "blue" : temp > 5 && temp <= 25 ? "orange" : "red";
          window.localStorage.setItem(`weathers/${city}`, JSON.stringify(this.weathers[city]));
        }).catch((err) => {
          console.log(err);
          this.weathers[city].main = "error";
          this.weathers[city].name = city;
        });
    },

    // Verifica se já tem salvo a temperatura das cidades no localStorage
    verifyWeathers(weather) {
      if (weather) return true
      return false
    },

    // Verifia se já deu os 10 minutos para atualizar o clima nas cidades
    verifyTimeWeathers(weather) {
      if (moment().diff(weather.time, "milliseconds") > 600000) return true;
      return false;
      
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px);
  width: 100%;
  margin-top: 60px;

  @media (max-width: 600px) {
    height: 100%;
  }

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 70%;
    background-color: var(--light-gray);
    @media (max-width: 600px) {
      flex-direction: column;
    }

    .cards {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      margin: 20px;

      @media (max-width: 600px) {
        width: 90%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .card {
        width: calc(100% - 40px);

        @media (max-width: 600px) {
          width: 90%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}

@media (max-width: 600px) {
  #UrubiciBR {
    order: 1;
  }

  #NuukGL {
    order: 2;
  }

  #NairobiKE {
    order: 3;
  }
}
</style>
