<template>
  <div id="app" class="bg-secondary">
  <main class="p-5">
    <input 
        class="form-control bg p-2 shadow" 
        type="text" 
        placeholder="Search....."
        v-model="query" @keyup.enter="fetchWeather"
    >
  
    <div class="weather-box text-light text-center fw-bold" v-if=" typeof weather.main != 'undefined' " >
        <div class="location-box my-3">
          <div class="location fs-1 ">{{ this.weather.name }}, {{ this.weather.sys.country}}</div>
          <div class="date fs-6 fst-italic fw-normal">{{this.currentDate}}</div>
        </div>

        <div class="weather-box mt-4">
          <div class="temp d-inline shadow-lg rounded-3 p-2">{{ Math.round(this.weather.main.temp) }}°c</div>
          <div class="weather my-4 fs-1 fst-italic ">{{ this.weather.weather[0].main }}</div>
        </div>
    </div>
  </main>

  

  </div>
</template>

<script>
import { Options, Vue } from 'vue-class-component'
import axios from 'axios'

@Options({
  components: {
  },
})
export default class weather extends Vue {
    api_key = 'c0367ef24e5208a71b5782d87e7f65b0'
    url_base = 'https://api.openweathermap.org/data/2.5/'
    query = ''
    weather = {}
    // date = new Date().toLocaleDateString()
    d = new Date()
    months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    month = this.months[this.d.getMonth()]
    day = this.weekday[this.d.getDay()]
    year = this.d.getFullYear()
    date = this.d.getDate()
    currentDate = `${this.day} ${this.date} ${this.month} ${this.year}`

    fetchWeather(){
        axios.get(`${this.url_base}weather?q=${this.query}&units=metric&appid=${this.api_key}`)
        .then((res) => {
            console.log(res.data, 'comparing the data to the data object', this.weather)
            return res.data 
        })
        .then(this.setResults)
        .catch((err) => {
            // handle error
            console.log(err)
        })
    }
    setResults(results){
        this.weather = results
        console.log(results, 'trying to figure out what this data is', this.weather);
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
</style>