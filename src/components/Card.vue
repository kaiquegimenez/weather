<template>
  <main class="card">
    <header class="card-header">
      <h3>{{weather.name}}</h3>
    </header>
    <section v-if="weather.main.temp" :class="'card-body--' + weather.color" class="card-body">
      {{parseInt(weather.main.temp)}}°
    </section>
    <footer v-if="weather.main.temp" class="card-footer">
      <div v-if="weather.name === 'Urubici, BR'" class="footer-container">
        <div class="footer-content">
          <h5>HUMIDITY</h5>
          <p id="humidity">{{weather.main.humidity}}%</p>
        </div>
        <div class="footer-content">
          <h5>PRESSURE</h5>
          <p id="pressure">{{weather.main.pressure}}hPa</p>
        </div>
      </div>
      <div class="footer">
        <span id="time">Updated at {{ moment(this.weather.time).format('hh:mm:ss A')}}</span>
      </div>
    </footer>
    <figure class="loader" v-if="Object.keys(weather.main).length === 0 || showLoader">
      <img src="../assets/loader.svg" alt="">
    </figure>
    <section id="error" class="card-error" v-if="weather.main === 'error'">
      <p>Something went wrog</p>
      <button @click="getWeathers()">Try Again</button>
    </section>
  </main>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  name: 'Card',
  data() {
    return {
      api_key: 'b83d133cf105d0dc7c5544ee4eb7c80a',
      url_base: 'https://api.openweathermap.org/data/2.5/',
      showLoader: false,
      moment: moment
    }
  },
  props: {
    weather: {},
  },
  mounted() {
    if(this.weather?.time) {
      const time = 600000 - moment().diff(this.weather?.time, 'milliseconds');
      this.timeToSave(time)
    }
  },
  methods: {
    // Chama a API para retornar o clima nas cidades
    getWeathers() {
      this.showLoader = true;
      axios.get(`${this.url_base}weather?q=${this.weather.name}&units=metric&APPID=${this.api_key}`)
        .then((res) => {
          this.showLoader = false;
          const temp = parseInt(res.data.main.temp)
          this.weather.main = res.data.main;
          console.log('temp', temp)
          this.weather.color = temp < 6 ? 'blue' : temp >= 6 && temp <= 25 ? 'orange' : 'red'
          this.weather.time = moment();
          this.timeToSave(600000)
          this.saveInCache()
        }).catch((err) => {
          console.log(err)
          this.showLoader = false;
          this.weather.main = 'error'
        })
    },

    // Salva e no localStorage o clima nas cidades
    saveInCache() {
      window.localStorage.setItem(`weathers/${this.weather.name}`, JSON.stringify(this.weather))
    },

    // Fica esperando dar os 10 minutos para atualizar o clima das cidades
    timeToSave(milliseconds) {
      setInterval(() => {
        this.getWeathers()
      }, milliseconds)
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  background-color: white;
  margin: 20px;
  border-radius: 5px;
  color: var(--dark-gray);
  box-shadow: 1px 1px 15px 1px rgba(51,51,51,0.1);

  @media (max-width: 600px){
    margin: 20px 0;
  }

  .loader {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px 0;
  }
  
  .card-error {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--red);
    padding: 40px 0;
    
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      background: none;
      border: 2px solid var(--dark-gray);
      border-radius: 20px;
      width: 100px;
      padding: 10px 0;
      cursor: pointer;

      &:hover {
        background-color: var(--dark-gray);
        color: white;
      }
      
    }
  }

  .card-header {
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid var(--gray-divider);
    width: 100%;
  }

  .card-body {
    font-size: 80px;
    padding: 20px 0;

    &--blue {
      color: var(--blue);
    }

    &--orange {
      color: var(--orange);
    }

    &--red {
      color: var(--red);
    }
  }

  .card-footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: var(--light-gray);
    opacity: .5;
    width: 100%;
    color: var(--gray);
    padding: 10px 0;

    .footer-container {
      display: flex;
      align-items: center;
      justify-content: space-around;

      .footer-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        p {
          color: var(--dark-gray);
          font-weight: 600;
          margin: 5px;
        }

        h5 {
          margin: 0;
        }
      }
    }

    .footer {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      font-size: 10px;
    }


  }
}
</style>