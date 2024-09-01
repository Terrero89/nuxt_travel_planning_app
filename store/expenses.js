import { defineStore } from "pinia";

export const useExpenseStore = defineStore({
  id: "expenses",

  state: () => ({
    URL: "https://travel-planning-app-44a08-default-rtdb.firebaseio.com/expenses.json",
    expenses: [
      {
        expenseID: "ex1",
        destinationParentID: "trip1",
        cityParentID: "city1",
        category: "Attractions",
        expense: "Mezquita-Catedral de Córdobaa",
        cost: 11,
        isExpensePaid: true,
        date: new Date(2024, 10, 12).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        startTime: "09:00am",
        endTime: "11:00am",
        duration: 2.0,
        comments:
          "Iconic mosque-cathedral, a blend of Islamic and Christian architecture",
        location: "Córdoba, Spain",
        isCompleted: true,
        placeRating: 4,
        daysRemainingForExpense: 0,
      },
      {
        expenseID: "ex11",
        destinationParentID: "trip1",
        cityParentID: "city1",
        category: "Attractions",
        expense: "Mezquita-Catedral de Córdobaaaaa",
        cost: 11,
        isExpensePaid: false,
        date: new Date(2024, 10, 12).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        startTime: "09:00am",
        endTime: "11:00am",
        duration: 2.0,
        comments:
          "Iconic mosque-cathedral, a blend of Islamic and Christian architecture",
        location: "Córdoba, Spain",
        isCompleted: true,
        placeRating: 4,
        daysRemainingForExpense: 0,
      },
      {
        expenseID: "ex2",
        destinationParentID: "trip1",
        cityParentID: "city1",
        category: "Food",
        expense: "Salmorejo at Bodegas Mezquita",
        cost: 15,
        isExpensePaid: true,
        date: new Date(2024, 10, 12).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        startTime: "12:00pm",
        endTime: "01:30pm",
        duration: 1.5,
        comments: "Traditional cold soup, a must-try dish in Córdoba",
        location: "Bodegas Mezquita, Córdoba, Spain",
        isCompleted: false,
        placeRating: 4.7,
        daysRemainingForExpense: 0,
      },
      {
        expenseID: "ex3",
        destinationParentID: "trip1",
        cityParentID: "city1",
        category: "Landmarks",
        expense: "Mezquita-Catedral de Córdoba",
        cost: 11,
        isExpensePaid: true,
        date: new Date(2024, 10, 12).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        startTime: "09:00am",
        endTime: "11:00am",
        duration: 2.0,
        comments:
          "Iconic mosque-cathedral, a blend of Islamic and Christian architecture",
        location: "Córdoba, Spain",
        isCompleted: false,
        placeRating: 4.2,
        daysRemainingForExpense: 0,
      },
      {
        expenseID: "ex4",
        destinationParentID: "trip1",
        cityParentID: "city1",
        category: "Taxi",
        expense: "Salmorejo at Bodegas Mezquita",
        cost: 15,
        isExpensePaid: true,
        date: new Date(2024, 10, 12).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        startTime: "12:00pm",
        endTime: "01:30pm",
        duration: 1.5,
        comments: "Traditional cold soup, a must-try dish in Córdoba",
        location: "Bodegas Mezquita, Córdoba, Spain",
        isCompleted: false,
        placeRating: 4.7,
        daysRemainingForExpense: 0,
      },
      {
        expenseID: "ex5",
        destinationParentID: "trip1",
        cityParentID: "city1",
        category: "Souvenirs",
        expense: "Mezquita-Catedral de Córdoba",
        cost: 11,
        isExpensePaid: true,
        date: new Date(2024, 10, 12).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        startTime: "09:00am",
        endTime: "11:00am",
        duration: 2.0,
        comments:
          "Iconic mosque-cathedral, a blend of Islamic and Christian architecture",
        location: "Córdoba, Spain",
        isCompleted: false,
        placeRating: 3.9,
        daysRemainingForExpense: 0,
      },
      {
        expenseID: "ex6",
        destinationParentID: "trip1",
        cityParentID: "city1",
        category: "Accommodation",
        expense: "Salmorejo at Bodegas Mezquita",
        cost: 15,
        isExpensePaid: true,
        date: new Date(2024, 10, 12).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        startTime: "12:00pm",
        endTime: "01:30pm",
        duration: 1.5,
        comments: "Traditional cold soup, a must-try dish in Córdoba",
        location: "Bodegas Mezquita, Córdoba, Spain",
        isCompleted: false,
        placeRating: 4.1,
        daysRemainingForExpense: 0,
      },
      {
        expenseID: "ex7",
        destinationParentID: "trip2",
        cityParentID: "city2",
        category: "Transportation",
        expense: "Quebec City Cathedral",
        cost: 15,
        isExpensePaid: true,
        date: new Date(2024, 10, 12).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        startTime: "12:00pm",
        endTime: "01:30pm",
        duration: 1.5,
        comments: "Traditional cold soup, a must-try dish in Córdoba",
        location: "Bodegas Mezquita, Córdoba, Spain",
        isCompleted: false,
        placeRating: 4.9,
        daysRemainingForExpense: 0,
      },
      {
        expenseID: "ex8",
        destinationParentID: "trip3",
        cityParentID: "city2",
        category: "Purchase",
        expense: "Salmorejo at Bodegas Mezquita",
        cost: 15,
        isExpensePaid: true,
        date: new Date(2024, 10, 12).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        startTime: "12:00pm",
        endTime: "01:30pm",
        duration: 1.5,
        comments: "Traditional cold soup, a must-try dish in Córdoba",
        location: "Bodegas Mezquita, Córdoba, Spain",
        isCompleted: false,
        placeRating: 4.9,
        daysRemainingForExpense: 0,
      },
    ],
  
  }),
    actions: {
      async fetchExpenses() {
        const response = await fetch(
          "https://travel-planning-app-44a08-default-rtdb.firebaseio.com/cities.json"
        );
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
            expense:expense[key].expense,
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
            daysRemainingForExpense: daysRemainingForExpense[key].daysRemainingForExpense,
            placeRating: placeRating[key].placeRating,

          };
          cityList.push(newExpense);
        }
        this.expenses= expensesList;
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
});
