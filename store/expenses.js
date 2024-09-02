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
          parentDestinationID: parentDestinationID[key].parentDestinationID,
          parentCityID: parentCityID[key].parentCityID,
          expense: expense[key].expense,
          category: category[key].category,
          startTime: startTime[key].startTime,
          endTime: endTime[key].endTime,
          cost: cost[key].cost,
          isExpensePaid: isExpensePaid[key].isExpensePaid,
          location: location[key].location,
          address: address[key].address,
          duration: duration[key].duration,
          date: date[key].date,
          isCompleted: isCompleted[key].isCompleted,
          daysRemainingForExpense:
            daysRemainingForExpense[key].daysRemainingForExpense,
          placeRating: placeRating[key].placeRating,
          priority: priority[key].priority,
          comments: comments[key].comments
        };
        cityList.push(newExpense);
      }
      this.expenses = expensesList;
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
      const expensesList = [];
      for (const key in state.expenses) {
        const expenseData = {
          cityID: key,
          ...state.expenses[key],
        };
        expensesList.push(expenseData);
      }
      return expensesList;
    },
   
    filterItemById(state) {
      const prj = this.expensesAsArray.filter((p) => p.parentCityID);
      return (id) => prj.filter((p) => p.parentCityID === id);
    },
  },
});
