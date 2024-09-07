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

  },
});
