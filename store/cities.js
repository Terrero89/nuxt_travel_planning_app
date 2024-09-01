import axios from "axios";
import { defineStore } from "pinia";

export const useCityStore = defineStore({
  id: "cities",
  state: () => ({
    URL: "https://travel-planning-app-44a08-default-rtdb.firebaseio.com/cities.json",
    cities: [],
    punto: "cero",
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
          totalCost: totalCost[key].totalCost,
          isThisCityVisited: isThisCityVisited[key].isThisCityVisited,
          cityRating: cityRating[key].cityRating,
          cityDuration: cityDuration[key].cityDuration,
          daysRemainingForCity: daysRemainingForCity[key].daysRemainingForCity,
          expenseIncludedOnCity:
            expenseIncludedOnCity[key].expenseIncludedOnCity,
          cityComments: cityComments[key].cityComments,
          date: date[key].date,
        };
        cityList.push(newCity);
      }
      this.cities = cityList;
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

    // async updateDestination(cityData) {
    //   try {
    //     const response = await axios.put(
    //       `/destinations/${tripData.destinationID}.json`,
    //       tripData
    //     );
    //     const updatedDestination = response.data;

    //     // Update the local state if necessary
    //     const index = this.destinations.findIndex(
    //       (dest) => dest.destinationId === tripData.destinationID
    //     );
    //     if (index !== -1) {
    //       this.destinations[index] = updatedDestination;
    //     }

    //     return updatedDestination;
    //   } catch (error) {
    //     console.error("Failed to update destination:", error);
    //     throw error;
    //   }
    // },

    // need a delete and update specific destination
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

//   actions:{
//     async fetchDestinations() {
//       const response = await fetch(
//         "https://travel-planning-app-44a08-default-rtdb.firebaseio.com/cities.json"
//       );
//       const responseData = await response.json();
//       this.cities = responseData;

//       if (!response.ok) {
//         const error = new Error(responseData.message || "Failed to fetch!");
//         throw error;
//       }

//       const cityList = [];

//       for (const key in this.cities) {
//         const newCity= {
//           cityID: key,
//           parentDestinationID: parentDestinationID[key].parentDestinationID,
//           city: city[key].city,
//           accommodation: accommodation[key].accommodation,
//           from: from[key].from,
//           to: to[key].to,
//           accommodationCost: accommodationCost[key].accommodationCost,
//           isAccommodationPaid: isAccommodationPaid[key].isAccommodationPaid,
//           totalCost: totalCost[key].totalCost,
//           isThisCityVisited: isThisCityVisited[key].isThisCityVisited,
//           cityRating: cityRating[key].cityRating,
//           cityDuration:cityDuration[key].cityDuration,
//           daysRemainingForCity: daysRemainingForCity[key].daysRemainingForCity,
//           expenseIncludedOnCity: expenseIncludedOnCity[key].expenseIncludedOnCity,
//           cityComments:cityComments[key].cityComments,

//         };
//         cityList.push(newCity);
//       }
//       this.cities = cityList;
//     },
//   },
// });
