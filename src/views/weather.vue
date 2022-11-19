<template>
  <div id="app" :class="[weather.temp <= 16 ? 'cold' : weather.weather == 'Rain' ? 'rain' : '']" >
  <div class="text-center pt-4 text-light text-bold">
    <h1 class="fs-1 location">Weather in</h1>
  </div>
  <main class="px-5 py-4">
    <input 
        class="form-control bg p-2 shadow fw-bold" 
        type="text" 
        placeholder="City...."
        v-model="city" @keydown.enter="fetchWeather"
    >
  
    <div class="weather-box text-light text-center fw-bold">
        <div class="location-box my-3">
          <div class="location fs-1 ">{{ weather.name }}, {{ weather.country}}</div>
          <div class="date fs-6 fst-italic fw-normal">{{currentDate}}</div>
        </div>

        <div class="weather-box mt-4">
          <div class="temp d-inline shadow-lg rounded-3 p-2">{{ weather.temp }}°c</div>
          <div class="weather mt-4 fs-1 fst-italic ">{{ weather.weather }}</div>
          <div class="weather fs-1 fst-italic ">{{ weather.desc }}</div>
        </div>
    </div>
  </main>

  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import axios from 'axios'

@Options({
  components: {
  },
})
export default class weather extends Vue {
    api_key = 'c0367ef24e5208a71b5782d87e7f65b0'
    url_base = 'https://api.openweathermap.org/data/2.5/'
    city = ''
    weather = {
        name: '',
        country: '',
        temp: 0,
        weather: '',
        desc: ''
    }
    d = new Date()
    months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    month = this.months[this.d.getMonth()]
    day = this.weekday[this.d.getDay()]
    year = this.d.getFullYear()
    date = this.d.getDate()
    currentDate = `${this.day}, ${this.date} ${this.month} ${this.year}`

    fetchWeather(){
        axios.get(`${this.url_base}weather?q=${this.city}&units=metric&appid=${this.api_key}`)
        .then((res) => {
            // console.log(res.data, 'comparing the data to the data object', this.weather)
             this.weather.name = res.data.name
             this.weather.country = res.data.sys.country
             this.weather.temp = Math.round(res.data.main.temp)
             this.weather.weather = res.data.weather[0].main
             this.weather.desc = res.data.weather[0].description
             this.city = ''
        })
    }

    mounted(){
        axios.get(`${this.url_base}weather?q=Lagos&units=metric&appid=${this.api_key}`)
        .then((res) => {
             this.weather.name = res.data.name
             this.weather.country = res.data.sys.country
             this.weather.temp = Math.round(res.data.main.temp)
             this.weather.weather = res.data.weather[0].main
             this.weather.desc = res.data.weather[0].description
        })
    }
}
</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'montserrat', sans-serif;
}

#app{
    min-height: 100vh;
    background-image: url(../assets/warm.jpg);
    background-size: cover;
    background-position: center;
    transition: 0.4s;
}

#app.cold{
    background-image: url(../assets/cold.jpg);
}
#app.rain{
    background-image: url(../assets/rain.jpg);
}
.bg{
    background-color: rgba(255, 255, 255, 0.5);
}

.location{
    text-shadow: 1px 3px rgba(0, 0, 0, 0.35);
}
.temp{
    text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.25);
    font-size: 100px;
}

.weather{
    text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}

@media screen and (max-width: 310px) {
    .temp{
        font-size: 80px;
    }
}
</style>