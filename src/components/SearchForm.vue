<script lang="ts">
export default {
  props: {
    citySearchQuery: {
      type: String,
      required: true,
    },
    mapBoxSearchResults: Array || null,
    maxBoxResponseError: Boolean,
    previewCityWeather: {
      type: Function,
      required: true,
    },
    getCitySearchResults: {
      type: Function,
      required: true,
    },
    updateCitySearchQuery:{
      type: Function
    }
  },
};
</script>

<template>
  <div class="relative">
    <div class="flex flex-row justify-center">
      <input
        type="text"
        :value="citySearchQuery"
        @input="
          (e) => {
            //@ts-ignore
            updateCitySearchQuery(e.target.value)
            getCitySearchResults(e);
          }
        "
        placeholder="Search for a city"
        class="py-2 px-1 w-full md:w-[50%] bg-white border-b rounded-sm focus:outline-none"
      />
    </div>
    <ul
      class="absolute bg-white left-0 text-left  px-[1rem] right-0 rounded-sm text-black shadow-md py-2  top-[66px]"
      v-if="mapBoxSearchResults"
    >
      <p v-if="maxBoxResponseError">
        Something went wrong, Please try again 🤗
      </p>
      <p v-if="!maxBoxResponseError && mapBoxSearchResults.length === 0">
        No result match your query, please try another city
      </p>
      <template v-else>
        <li
          v-for="searchResult in mapBoxSearchResults"
          :key="searchResult?.id"
          @click="previewCityWeather(searchResult)"
          class="py-2 cursor-pointer hover:bg-slate-400 hover:text-white"
        >
          {{ searchResult?.place_name }}
        </li>
      </template>
    </ul>
  </div>
</template>
