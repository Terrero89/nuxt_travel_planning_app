import { defineStore } from "pinia";

export const useCityStore = defineStore({
  id: "cities",
  state: () => ({
    URL: "https://travel-planning-app-44a08-default-rtdb.firebaseio.com/cities.json",
    cities: [],
    editedData: {},
  }),
  actions: {
    async fetchCities() {
      const response = await fetch(this.URL);
      const responseData = await response.json();
      this.cities = responseData;

      if (!response.ok) {
        const error = new Error(responseData.message || "Failed to fetch!");
        throw error;
      }

      const cityList = [];

      for (const key in this.cities) {
        const newCity = {
          cityID: key,
          ...this.cities[key],
        };
        cityList.push(newCity);
      }
      this.cities = cityList;
    },

    async updateCity(cityID, payload) {
      const url = `https://travel-planning-app-44a08-default-rtdb.firebaseio.com/cities/${cityID}.json`;
      const options = {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(payload),
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Failed to update city");
        }

        // Update the local state after successful update
        const index = this.cities.findIndex(city => city.cityID === cityID);
        if (index !== -1) {
          this.cities[index] = { cityID, ...payload };
        }
      } catch (error) {
        console.error("Error updating city:", error);
      }
    },
  },
  getters: {
    citiesAsArray: (state) => {
      return state.cities;
    },
    filterItemById(state) {
      const prj = this.citiesAsArray.filter((p) => p.parentDestinationID);
      return (id) => prj.filter((p) => p.parentDestinationID === id);
    },
  },
});
