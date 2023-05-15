//@ts-ignore
import { createStore, ActionContext } from "vuex";
import createPersistedState from "vuex-persistedstate";
import type { RootState, CityType } from "./type";

export default createStore<RootState>({
  state: {
    savedCities: [],
  },
  mutations: {
    addCity(state: RootState, city: CityType) {
      state.savedCities?.push(city);
    },
    removeCity(state: RootState, cityId: string) {
      const index = state.savedCities?.findIndex(
        (city: CityType) => city.id === cityId
      );
      if (index !== -1) {
        state.savedCities?.splice(index, 1);
      }
    },
  },
  actions: {
    addCity(context: ActionContext<RootState, RootState>, city: CityType) {
      context.commit("addCity", city);
    },

    removeCity(context: ActionContext<RootState, RootState>, cityId: string) {
      context.commit("removeCity", cityId);
    },
  },
  plugins: [
    createPersistedState({
      key: "my-app-state",
      paths: ["savedCities"],
    }),
  ],
});
