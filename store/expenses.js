import { defineStore } from "pinia";

export const useExpenseStore = defineStore({
  id: "expenses",

  state: () => ({
    URL: "https://travel-planning-app-44a08-default-rtdb.firebaseio.com/expenses.json",
    expenses: [],
    averageRatingForCity: 0,
    totalCityRating: 0,
    totalAccommodationCost: 0,
    totalCosts: 0,
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
      totalCityRating: 0;
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
    // const totalCost = filteredCities.reduce((sum, city) => sum + city.totalCost, 0);
    getAmount(id) {
      const prj = this.expenses.filter((p) => p.parentCityID);
      let returnedData = prj.filter((p) => p.parentCityID === id);
      let lengthData = prj.filter((p) => p.parentCityID === id).length;
      let average = returnedData.reduce(
        (sum, city) => sum + (city.placeRating || 0),
        0
      );
      let aveRating = average / lengthData;
      this.averageRatingForCity = aveRating;
      return aveRating;
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
    // gets length of the expenses under specific city
    getAmountOfExpenses(state) {
      const expenses = state.expenses.filter((p) => p.parentCityID);
      return (id) => expenses.filter((item) => item.parentCityID === id).length;
    },

    getAvgRatingForCity: (state) => (id) => {
      // Filter expenses by parentCityID
      const filteredExpenses = state.expenses.filter(
        (p) => p.parentCityID === id
      );
      const lengthData = filteredExpenses.length;

      if (lengthData === 0) return 0; // Avoid division by 0

      // Calculate the sum of ratings
      const totalRating = filteredExpenses.reduce(
        (sum, city) => sum + (city.placeRating || 0),
        0
      );

      // Calculate the average rating
      const aveRating = totalRating / lengthData;

      // Set the computed average rating for the city
      state.averageRatingForCity = aveRating.toFixed(2);

      return aveRating.toFixed(2);
    },

    getTotalAccommodationsNumbers: (state) => (id) => {
      // Filter expenses by parentCityID (similar to filteredExpenses in getAvgRatingForCity)
      const filteredExpenses = state.expenses.filter(
        (p) => p.parentCityID === id
      );
      const lengthData = filteredExpenses.length;

      if (lengthData === 0) return 0; // Avoid division by 0

      const totalCost = filteredExpenses.reduce(
        (sum, city) => sum + (city.cost || 0),
        0
      );

      // Return the total cost
      return totalCost; // Optional: format it to 2 decimal places like the average rating
    },
    getDataFilter:
      (state) => (id, byPriority, byCategory, byMisc, byStatus) => {
        // Step 1: Filter by destination ID (parentDestinationID)
        let expense = state.expenses.filter((city) => city.parentCityID === id);

        // Step 2: Filter by priority
        if (byPriority) {
          expense = expense.filter((data) => data.priority === byPriority);
        }

        // Step 3: Filter by categories
        if (byCategory) {
          const validCategories = [
            "Food/Drinks",
            "Attractions",
            "Souvenirs",
            "Other",
            "Store Purchase",
            "Landmarks",
            "Transportation",
            "Rentals",
            "N/A",
          ];
          if (validCategories.includes(byCategory)) {
            expense = expense.filter((data) => data.category === byCategory);
          }
        }

        // Step 4: Filter by misc
        if (byMisc) {
          if (byMisc === "Highest Rating") {
            expense = expense
              .sort((a, b) => b.placeRating - a.placeRating)
              .slice(0, 4);
          } else if (byMisc === "Lowest Rating") {
            expense = expense
              .sort((a, b) => a.placeRating - b.placeRating)
              .slice(0, 4);
          } else if (byMisc === "Highest Cost") {
            expense = expense.sort((a, b) => b.cost - a.cost).slice(0, 4);
          } else if (byMisc === "Lowest Cost") {
            expense = expense.sort((a, b) => a.cost - b.cost).slice(0, 4);
          } else if (byMisc === "Closest Date") {
            expense = expense.sort(
              (a, b) =>
                new Date(a.expectedExpenseDate) -
                new Date(b.expectedExpenseDate)
            );
          } else if (byMisc === "Further Date") {
            expense = expense.sort(
              (a, b) =>
                new Date(b.expectedExpenseDate) -
                new Date(a.expectedExpenseDate)
            );
          }
        }

        // Step 5: Filter by status

        if (byStatus === "Completed") {
          expense = expense.filter((data) => data.isCompleted === "Completed");
        }
        if (byStatus === "Pending") {
          expense = expense.filter((data) => data.isCompleted === "Pending");
        }
        if (byStatus === "In Progress") {
          expense = expense.filter(
            (data) => data.isCompleted === "In Progress"
          );
        }
        return expense;
      },
  },
  coding: (state) => {
    return "coding";
  },
});
