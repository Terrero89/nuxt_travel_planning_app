import { defineStore } from "pinia";

export const useExpenseStore = defineStore({
  id: "expenses",

  state: () => ({
    URL: "https://travel-planning-app-44a08-default-rtdb.firebaseio.com/expenses.json",
    expenses: [],
  }),

  actions: {
    async fetchExpenses() {
      const response = await fetch(this.URL);
      const responseData = await response.json();
      this.expenses = responseData;

      if (!response.ok) {
        const error = new Error(responseData.message || "Failed to fetch!");
        throw error;
      }

      const expensesList = [];

      for (const key in this.expenses) {
        const newExpense = {
          expenseID: key,
          ...this.expenses[key],
        };
        expensesList.push(newExpense);
      }
      this.expenses = expensesList;
    },
    async updateExpense(itemID, payload) {
      const url = `https://travel-planning-app-44a08-default-rtdb.firebaseio.com/expenses/${itemID}.json`;
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
    async deleteExpense(itemID) {
      let response = await fetch(
        `https://travel-planning-app-44a08-default-rtdb.firebaseio.com/expenses/${itemID}.json`,
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
    async addExpense(data) {
      const response = await fetch(
        "https://travel-planning-app-44a08-default-rtdb.firebaseio.com/expenses.json",
        {
          method: "POST",
          body: JSON.stringify({ ...data }),
        }
      );
      if (!response.ok) {
        console.log("ERROR PROJECTS");
      }
    },
  },
  getters: {
    expensesAsArray: (state) => {
      return state.expenses;
    },

    filterItemById(state) {
      const prj = this.expensesAsArray.filter((p) => p.parentCityID);
      return (id) => prj.filter((p) => p.parentCityID === id);
    },

    // ! Adding the filtering functionality here....
    getDataFilter: (state) => (id, byStatus, byCategory, byBooking) => {
      // Step 1: Filter by destination ID (parentDestinationID)
      let expense = state.expenses;
     expense = expense.filter((city) => city.parentDestinationID === id);

      // if (byStatus === "Visited") {
      //   cities = cities.filter((data) => data.isThisCityVisited === "Visited");
      // }
      // if (byStatus === "Not visited") {
      //   cities = cities.filter(
      //     (data) => data.isThisCityVisited === "Not visited"
      //   );
      // }

      // if (byStatus === "In progress") {
      //   cities = cities.filter(
      //     (data) => data.isThisCityVisited === "In progress"
      //   );
      // }

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

  },
});
