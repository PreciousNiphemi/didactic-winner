<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import SearchForm from "../components/SearchForm.vue";
import CityList from "../components/CityList.vue";
interface Location {
  longitude: number;
  latitude: number;
}


const location = ref<Location>({ longitude: 0, latitude: 0 });
const citySearchQuery = ref("");

const router = useRouter()
const queryTimeOut = ref<number | null>(null);

const mapBoxSearchResults = ref(undefined);

const maxBoxResponseError = ref(false);

const previewCityWeather = (searchResult:any)=>{
const [city, state] = searchResult.place_name.split(",")
router.push({
  name: "cityView",
  params:{state: state ?state.trim(): city.trim() , city:city.trim() },
  query: {
    lat: searchResult.geometry.coordinates[1],
    lng: searchResult.geometry.coordinates[0],
    previewCityWeather: "preview",
  }
})
}
const getCitySearchResults = () => {

  clearTimeout(queryTimeOut.value ?? undefined);
  queryTimeOut.value = setTimeout(async () => {
    if (!location.value || !citySearchQuery.value) {
  console.log("LOACA", citySearchQuery.value)
      
      mapBoxSearchResults.value = undefined;
      return [];
    }
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${
          citySearchQuery.value
        }.json?proximity=${location.value.longitude},${
          location.value.latitude
        }.json?types=place&access_token=${import.meta.env.VITE_MAPBOX_API_KEY}`
      );
      const possiblePlaces = response.data.features;
      mapBoxSearchResults.value = possiblePlaces;
      console.log(mapBoxSearchResults.value);
    } catch {
      maxBoxResponseError.value = true;
    }
  }, 300);
};

const updateCitySearchQuery = (value:string)=>{
  citySearchQuery.value =value
}

navigator.geolocation.getCurrentPosition(
  (position) => {
    location.value = position.coords;
  },
  (error) => {
    console.log(error);
  }
);
</script>

<template>
  <main class="container items-center flex-1 flex  justify-center px-[1rem] md:px-[6rem]">
    <div class="pt-4 mb-8 w-full">
      <SearchForm :city-search-query="citySearchQuery" :update-city-search-query="updateCitySearchQuery" :map-box-search-results="mapBoxSearchResults" :max-box-response-error="maxBoxResponseError" :preview-city-weather="previewCityWeather" :get-city-search-results="getCitySearchResults" />
      <CityList/>
    </div>

  </main>
</template>

