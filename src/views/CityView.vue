<script lang="ts" setup>
import WeatherViewer from "../components/WeatherViewer.vue";
</script>

<template>
  <div class="px-[1rem] justify-center md:px-[6rem]">
    <Suspense>
      <WeatherViewer />
      <template #fallback>
        <div class=" flex h-full flex-1 flex-col justify-center">
        <p class="text-white text-center text-xl font-semibold">Loading...</p>
        </div>
      </template>
    </Suspense>
  </div>
</template>
