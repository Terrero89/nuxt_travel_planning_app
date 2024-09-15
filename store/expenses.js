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
    // getDataFilter:
    //   (state) => (id, byPriority, byCategory, byMisc, byStatus) => {
    //     // Step 1: Filter by destination ID (parentDestinationID)
    //     let expense = state.expenses;
    //     expense = expense.filter((city) => city.parentCityID === id);

    //     // filter by priority first
    //     if (byPriority === "Must visit") {
    //       expense = expense.filter((data) => data.priority === "Must visit");
    //     }
    //     if (byPriority === "Nice to visit") {
    //       expense = expense.filter((data) => data.priority === "Nice to visit");
    //     }
    //     if (byPriority === "Backup options") {
    //       expense = expense.filter(
    //         (data) => data.priority === "Backup options"
    //       );
    //     }
    //     if (byPriority === "Optional") {
    //       expense = expense.filter((data) => data.priority === "Optional");
    //     }

    //     //filter by categories
    //     let filteredByCategories = expense;

    //     if (byCategory === "Food/Drinks") {
    //       let expenseType = expense.filter(
    //         (data) => data.category === "Food/Drinks"
    //       );
    //       filteredByCategories = expenseType;
    //       //   let city = cities.sort((a, b) => b.cityRating - a.cityRating);
    //       //   filteredCities = city;
    //     }
    //     if (byCategory === "Attractions") {
    //       let expenseType = expense.filter(
    //         (data) => data.category === "Attractions"
    //       );
    //       filteredByCategories = expenseType;
    //     }
    //     if (byCategory === "Souvenirs") {
    //       let expenseType = expense.filter(
    //         (data) => data.category === "Souvenirs"
    //       );
    //       filteredByCategories = expenseType;
    //     }
    //     if (byCategory === "Other") {
    //       let expenseType = expense.filter((data) => data.category === "Other");
    //       filteredByCategories = expenseType;
    //     }
    //     if (byCategory === "Store purchase") {
    //       let expenseType = expense.filter(
    //         (data) => data.category === "Store purchase"
    //       );
    //       filteredByCategories = expenseType;
    //       if (byCategory === "Landmarks") {
    //         let expenseType = expense.filter(
    //           (data) => data.category === "Landmarks"
    //         );
    //         filteredByCategories = expenseType;
    //       }
    //       if (byCategory === "Transportation") {
    //         let expenseType = expense.filter(
    //           (data) => data.category === "Transportation"
    //         );
    //         filteredByCategories = expenseType;
    //       }
    //       if (byCategory === "Rentals") {
    //         let expenseType = expense.filter(
    //           (data) => data.category === "Rentals"
    //         );
    //         filteredByCategories = expenseType;
    //       }
    //       if (byCategory === "N/A") {
    //         let expenseType = expense.filter((data) => data.category === "N/A");
    //         filteredByCategories = expenseType;
    //       }
    //     }

    //     // filter by misc

    //     let filteredByMisc = filteredByCategories;

    //     if (byMisc === "Highest Rating") {
    //       let miscType = expense.sort((a, b) => b.placeRating - a.placeRating);
    //       filteredByMisc = miscType.slice(0,4);
    //     }
    //     if (byMisc === "Lowest Rating") {
    //       let miscType = expense.sort((a, b) => a.placeRating - b.placeRating);
    //       filteredByMisc = miscType.slice(0,4);
    //     }
    //     if (byMisc === "Highest Cost") {
    //       let miscType = expense.sort((a, b) => b.cost - a.cost);
    //       filteredByMisc = miscType.slice(0,4);
    //     }
    //     if (byMisc === "Lowest Cost") {
    //       let miscType = expense.sort((a, b) => a.cost - b.cost);
    //       filteredByMisc = miscType.slice(0,4);
    //     }
    //     if (byMisc === "Closest Date") {
    //       let miscType = expense.sort(
    //         (a, b) => a.expectedExpenseDate - b.expectedExpenseDate
    //       );
    //       filteredByMisc = miscType;
    //     }
    //     if (byMisc === "Further Date") {
    //       let miscType = expense.sort(
    //         (a, b) => b.expectedExpenseDate - a.expectedExpenseDate
    //       );
    //       filteredByMisc = miscType;
    //     }

    //     if (byStatus === "Completed") {
    //       cities = cities.filter((data) => data.isComplete === "Completed");
    //     }
    //     if (byStatus === "Pending") {
    //       cities = cities.filter((data) => data.isComplete === "Pending");
    //       if (byStatus === "In Progress") {
    //         cities = cities.filter((data) => data.isComplete === "In Progress");
    //       }
    //     }


    //     return filteredByMisc;
    //   },
    getDataFilter: (state) => (id, byPriority, byCategory, byMisc, byStatus) => {
      // Step 1: Filter by destination ID (parentDestinationID)
      let expense = state.expenses.filter((city) => city.parentCityID === id);
    
      // Step 2: Filter by priority
      if (byPriority) {
        expense = expense.filter((data) => data.priority === byPriority);
      }
    
      // Step 3: Filter by categories
      if (byCategory) {
        const validCategories = [
          "Food/Drinks", "Attractions", "Souvenirs", "Other", 
          "Store purchase", "Landmarks", "Transportation", "Rentals", "N/A"
        ];
        if (validCategories.includes(byCategory)) {
          expense = expense.filter((data) => data.category === byCategory);
        }
      }
    
      // Step 4: Filter by misc
      if (byMisc) {
        if (byMisc === "Highest Rating") {
          expense = expense.sort((a, b) => b.placeRating - a.placeRating).slice(0, 4);
        } else if (byMisc === "Lowest Rating") {
          expense = expense.sort((a, b) => a.placeRating - b.placeRating).slice(0, 4);
        } else if (byMisc === "Highest Cost") {
          expense = expense.sort((a, b) => b.cost - a.cost).slice(0, 4);
        } else if (byMisc === "Lowest Cost") {
          expense = expense.sort((a, b) => a.cost - b.cost).slice(0, 4);
        } else if (byMisc === "Closest Date") {
          expense = expense.sort((a, b) => new Date(b.expectedExpenseDate) - new Date(a.expectedExpenseDate));
        } else if (byMisc === "Further Date") {
          expense = expense.sort((a, b) => new Date(a.expectedExpenseDate) - new Date(b.expectedExpenseDate));
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
          expense = expense.filter((data) => data.isCompleted === "In Progress");
        }
      return expense;
    }
  },
});
