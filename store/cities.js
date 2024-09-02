import axios from "axios";
import { defineStore } from "pinia";

export const useCityStore = defineStore({
  id: "cities",
  state: () => ({
    URL: "https://travel-planning-app-44a08-default-rtdb.firebaseio.com/cities.json",
    cities: [],
    punto: "cero",
    editedData:{}
  }),
  actions: {
    async fetchCities() {
      const response = await fetch(
        "https://travel-planning-app-44a08-default-rtdb.firebaseio.com/cities.json"
      );
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
          parentDestinationID: parentDestinationID[key].parentDestinationID,
          city: city[key].city,
          accommodation: accommodation[key].accommodation,
          from: from[key].from,
          to: to[key].to,
          accommodationCost: accommodationCost[key].accommodationCost,
          isAccommodationPaid: isAccommodationPaid[key].isAccommodationPaid,
          accommodationAddress: accommodationAddress[key].accommodationAddress,
          totalCost: totalCost[key].totalCost,
          isThisCityVisited: isThisCityVisited[key].isThisCityVisited,
          cityRating: cityRating[key].cityRating,
          cityDuration: cityDuration[key].cityDuration,
          daysRemainingForCity: daysRemainingForCity[key].daysRemainingForCity,
          expenseIncludedOnCity: expenseIncludedOnCity[key].expenseIncludedOnCity,
          cityComments: cityComments[key].cityComments,
          date: date[key].date,
        };
        cityList.push(newCity);
      }
      this.cities = cityList;
    },

    async deleteCity(itemID) {
      let response = await fetch(
        `https://travel-planning-app-44a08-default-rtdb.firebaseio.com/cities/${itemID}.json`,
        {
          method: "DELETE",
          "Content-type": "application/json",
        }
      );
      if (!response.ok) {
        console.log("Error, request failed");
      }

      // console.log(response)
    },

    async addCity(data) {
      this.isLoading = true; // Start loading
      try {
        const response = await fetch(this.URL, {
          method: "POST",
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error("Failed to add city");
        }

        // No need to generate a unique ID here, data is stored directly
      } catch (error) {
        console.error("Failed to add city:", error);
      } finally {
        this.isLoading = false; // Stop loading
      }
    },

    editCity(param) {
      //trick, if project is not eqwual to edit project, then edited project will be equal to what ever is changed to
      let found = this.cities.find((city) => city.cityID === param); //finds the project from the
      return found;
    },
    async updateCity(id) {
      const url =`https://travel-planning-app-44a08-default-rtdb.firebaseio.com/cities/${id}.json`;
      const payload = this.editedData; // payload will be equal to the new updated task
      const options = {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(payload),
      };
      fetch(url, options).then((response) =>
        console.log("response from pinia " + response.status)
      );

      // if (!response.ok) {
      //   console.log("Super error 400");
      // }
      
    },
  },
  getters: {
    citiesAsArray: (state) => {
      const cityList = [];
      for (const key in state.cities) {
        const cityData = {
          cityID: key,
          ...state.cities[key],
        };
        cityList.push(cityData);
      }
      return cityList;
    },
    filterItemById(state) {
      const prj = this.citiesAsArray.filter((p) => p.parentDestinationID);
      return (id) => prj.filter((p) => p.parentDestinationID === id);
    },
  },
});

