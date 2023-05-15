<script lang="ts" setup>
import axios from "axios";
import { uid } from "uid";
//@ts-ignore
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import type { CityType } from "../store/type";

const route = useRoute();
const store = useStore();

const getWeatherData = async () => {
  try {
    const weatherDataResponse = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${
        route.query.lat
      }&lon=${route.query.lng}&exclude={part}&appid=${
        import.meta.env.VITE_OPENWEATHER_API_KEY
      }`
    );

    /* calculate timezone offset */

    //calculate current date and time
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherDataResponse.data.current.dt * 1000 + localOffset;
    weatherDataResponse.data.currentTime =
      utc + 1000 * weatherDataResponse.data.timezone_offset;

    //calculate hourly weather offset

    weatherDataResponse.data.hourly.forEach((hour: any) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime = utc + 1000 * weatherDataResponse.data.timezone_offset;
    });

    return weatherDataResponse.data;
  } catch (err: unknown) {
    console.log(err);
  }
};

// function that add city to store 
const addCity = () => {
  const city = {
    id: uid(),
    state: route.params.state,
    city: route.params.city,
    lat: route.query.lat,
    lng: route.query.lng,
  };

  const isCitySaved = store.state.savedCities.find(
    (savedCity: CityType) => savedCity.city === city.city && savedCity.state === city.state
  );
  if (isCitySaved) {
    window.alert(`You've already saved ${city.city}, ${city.state}`)
    throw new Error(`You've already saved ${city.city}, ${city.state}`);
  }
  store.dispatch("addCity", city)
  window.alert(`${city.city}, ${city.state} has been saved successfully!`)
};

//convert the temperature from kelvin to celsius
const convertTemperatureToCelsius = (temperature:number)=>{

  return temperature - 273.15
}

const weatherData = await getWeatherData();
</script>

<template>
  <div class="flex flex-col flex-1 items-center relative">
    <div
      v-if="weatherData"
      class="text-black p-4 bg-transparent w-full text-left mt-[2rem]"
    >
      <h1 class="text-4xl mb-1 text-white">
        {{ route.params.city }}, {{ route.params.state }}
      </h1>
      <p class="text-sm mb-4 text-white">
        {{
          new Date(weatherData.currentTime).toLocaleDateString("en-uk", {
            weekday: "long",
            month: "short",
            day: "2-digit",
          })
        }}
      </p>
    </div>

    <!-- Weather OverView -->

    <div class="flex flex-col items-center text-white py-12">
      <img
        class="w-auto h-auto"
        :src="`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
      />
      <p class="text-8xl mb-8">
        {{ Math.round( convertTemperatureToCelsius(weatherData.current.temp)) }}&deg;
      </p>
      <div class="text-center">
        <p>feels like {{ Math.round(convertTemperatureToCelsius(weatherData.current.feels_like)) }} &deg;</p>
        <p class="capitalize">
          {{
            weatherData.current.weather[0].description.charAt(0).toUpperCase() +
            weatherData.current.weather[0].description.slice(1)
          }}
        </p>
      </div>
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

    <!-- Hourly Weather -->
    <div class="max-w-screen-md w-full py-12">
      <div class="text-white">
        <h2 class="mb-4 font-bold">Today's weather</h2>
      </div>
      <div class="flex gap-10 overflow-x-scroll">
        <div
          v-for="hourData in weatherData.hourly"
          :key="hourData.dt"
          class="flex flex-col gap-4 items-center"
        >
          <div
            class="bg-transparent rounded-sm bg-[#1d469f] p-4 min-h-[10rem] max-h-[10rem] space-y-4"
          >
            <p class="text-sm text-white whitespace-nowrap">
              {{
                new Date(hourData.currentTime).toLocaleTimeString("en-us", {
                  hour: "numeric",
                })
              }}
            </p>
            <img
              class="w-auto h-auto"
              :src="`https://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
            />
            <p class="text-sm text-white">
              {{ Math.round(convertTemperatureToCelsius(hourData.temp)) }}&deg;
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Next 3 days weather -->
    <div class="max-w-screen-md w-full py-12">
      <div class="text-white w-full">
        <h2 class="mb-4 font-bold">Next 3 Days</h2>
        <div
          v-for="(day, index) in weatherData.daily.slice(0, 3)"
          :key="day.dt"
          class="flex items-center"
        >
          <div
            class="px-2 rounded-lg py-4 border-sm flex my-[1rem] w-full flex-row gap-[4rem] min-h-20px items-center bg-[#174f9a] overflow-x-scroll"
          >
          <div>
            <p class="text-[14px] font-medium">
              {{
                new Date(day.dt * 1000).toLocaleDateString("en-uk", {
                  weekday: "short",
                })
              }}
            </p>
            </div>
            <img
              class="w-[50px] h-[50px] object-cover"
              :src="`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
            />

            <div>
              <p class="text-[16px] font-normal">{{ Math.round(convertTemperatureToCelsius(day.temp.min )) }}&deg;</p>
              <p class="text-[#84afcf] text-[12px] font-medium">Low</p>
            </div>

            <div>
              <p class="text-[16px] font-normal">{{ Math.round(convertTemperatureToCelsius(day.temp.max)) }}&deg;</p>
              <p class="text-[#84afcf] text-[12px] font-medium">High</p>
            </div>

            <div>
              <p class="text-[16px] font-normal">{{ Math.round(day.rain) }}mm</p>
              <p class="text-[#84afcf] text-[12px] font-medium">Rain</p>
            </div>

            <div>
              <p class="text-[16px] font-normal">{{ Math.round(day.wind_speed) }}mph</p>
              <p class="text-[#84afcf] text-[12px] font-medium">Wind</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <button
      @click="addCity"
      class="bg-[yellow] text-black rounded-b-lg py-2 px-4 text-center absolute top-0 right-10"
    >
      <p class="text-sm">Save Location</p>
    </button>
  </div>
</template>
