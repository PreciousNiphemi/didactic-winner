<script lang="ts">
//@ts-ignore
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter } from "vue-router";
import type { CityType } from "@/store/type";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const savedCities = computed(() => {
      return store.state.savedCities;
    });

    const removeCity = (id: string) => {
      store.dispatch("removeCity", id);
    };

    const visitSavedCityWeather = (savedCity: CityType) => {
    
      router.push({
        name: "cityView",
        params: { state: savedCity.state, city: savedCity.city },
        query: {
          lat: savedCity.lat,
          lng: savedCity.lng,
          previewCityWeather: "savedCity",
        },
      });
    };

    console.log("THIS SAVED SISIIS", savedCities);

    return {
      savedCities,
      visitSavedCityWeather,
      removeCity,
    };
  },
};
</script>

<template>
  <div class="flex flex-col flex-1 items-center mt-[3rem] w-full">
    <p class="text-center text-white font-semibold text-lg">Saved Cities:</p>

    <div class="flex flex-row flex-wrap items-center justify-center gap-2 flex-1">

        <div v-if="savedCities.length < 1">
            <p class="text-white text-lg font-light text-center mt-4">You currently don't have any city saved, please search a location and save it 🤗</p>

        </div>

      <div
        v-if="savedCities"
        v-for="(city, index) in savedCities"
        :key="index"
        class="  py-4"
      >
        

        <div
        
          class="rounded-md space-x-2 flex flex-row items-center px-[1rem] py-[4px] bg-[#1a54a3] cursor-pointer"
        >
          <p class="text-white text-sm font-medium flex-3" @click="visitSavedCityWeather(city)">
            {{ `${city.city}, ${city.state}` }}
          </p>
          <div class="flex-1" @click="removeCity(city.id)">
            <i class="fa-solid fa-xmark text-[red]"  />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
