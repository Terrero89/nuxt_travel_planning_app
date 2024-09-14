import { defineStore } from "pinia";

export const useCityStore = defineStore({
  id: "cities",
  state: () => ({
    URL: "https://travel-planning-app-44a08-default-rtdb.firebaseio.com/cities.json",
    cities: [],
    editedData: {},
  }),
  actions: {
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

        // Ensure the response contains the updated data
        const updatedCity = await response.json();

        // Update the local state after a successful update
        const index = this.cities.findIndex((city) => city.cityID === cityID);
        if (index !== -1) {
          // Use the returned data from Firebase to ensure consistency
          this.cities[index] = { cityID, ...updatedCity };
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
    //finds item based on parentDestinationID
    filterItemById(state) {
      const prj = this.citiesAsArray.filter((item) => item.parentDestinationID);
      return (id) => prj.filter((data) => data.parentDestinationID === id);
    },

    filtering: (state) => (id, byStatus, byCategory, byBooking) => {
      // Step 1: Filter by destination ID (parentDestinationID)
      let cities = state.cities;
      cities = cities.filter((city) => city.parentDestinationID === id);

      if (byStatus === "Visited") {
        cities = cities.filter((data) => data.isThisCityVisited === "Visited");
      }
      if (byStatus === "Not visited") {
        cities = cities.filter(
          (data) => data.isThisCityVisited === "Not visited"
        );
      }

      if (byStatus === "In progress") {
        cities = cities.filter(
          (data) => data.isThisCityVisited === "In progress"
        );
      }

      let filteredCities = cities;

      if (byCategory === "Highest Rating") {
        let city = cities.sort((a, b) => b.cityRating - a.cityRating);
        filteredCities = city;
      }
      if (byCategory === "Lowest Rating") {
        let city = cities.sort((a, b) => a.cityRating - b.cityRating);
        filteredCities = city;
      }
      if (byCategory === "Highest Cost") {
        let city = cities.sort((a, b) => b.totalCost - a.totalCost);
        filteredCities = city;
      }
      if (byCategory === "Lowest Cost") {
        let city = cities.sort((a, b) => a.totalCost - b.totalCost);
        filteredCities = city;
      }
      if (byCategory === "Closest Date") {
        let city = cities.sort(
          (a, b) => a.daysRemainingForCity - b.daysRemainingForCity
        );
        filteredCities = city;
      }
      if (byCategory === "Further Date") {
        let city = cities.sort(
          (a, b) => b.daysRemainingForCity - a.daysRemainingForCity
        );
        filteredCities = city;
      }

      let citiesBooked = filteredCities;

      if (byBooking === "Reserved") {
        let booking = citiesBooked.filter(
          (data) => data.isAccommodationPaid === "Reserved"
        );
        citiesBooked = booking;
      }
      if (byBooking === "Half Reserved") {
        let booking = citiesBooked.filter(
          (data) => data.isAccommodationPaid === "Half Reserved"
        );
        citiesBooked = booking;
      }
      if (byBooking === "Pending") {
        let booking = citiesBooked.filter(
          (data) => data.isAccommodationPaid === "Pending"
        );
        citiesBooked = booking;
      }
      return citiesBooked;
    },
    // here to capture all the stats from the findings above we can take the above cities to update as selected
  },
  // ? will search and item by its name
  filterItemByName: (state) => (filter) => {
    if (!filter) return state.destination; // Return all if no filter
    return state.destination.filter((item) =>
      item.destination.toLowerCase().includes(filter.toLowerCase())
    );
  },

});
