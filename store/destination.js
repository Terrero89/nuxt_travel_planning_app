import { defineStore } from "pinia";

export const useDestinationStore = defineStore({
  id: "destinations",

  state: () => ({
    URL: "https://travel-planning-app-44a08-default-rtdb.firebaseio.com/destinations.json",
    destination: [
      {
        destinationID: "trip1",
        destination: "Andalusia Trip",
        transportType: "Plane", // train, car, bus, plane
        from: new Date(2024, 10, 12).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        to: new Date(2024, 10, 12).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        destinationBudget: 1000,
        tripDuration: 10,
        dateAdded: new Date(2024, 10, 12).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        isTripCompleted: true,
        daysRemainingForTrip: 5,
        citiesIncludedOnTrip: 9,
        tripRating: 4.7,
        tripComments: "Great trip",
        cities: [],
      },
      {
        destinationID: "trip2",
        destination: "Canada",
        transportType: "Car", // train, car, bus, plane
        from: new Date(2024, 10, 12).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        to: new Date(2024, 10, 12).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        destinationBudget: 1000,
        tripDuration: 12,
        dateAdded: new Date(2024, 7, 7).toDateString(),
        dateAdded: new Date(2024, 10, 12).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        isTripCompleted: false,
        daysRemainingForTrip: 122,
        citiesIncludedOnTrip: 2,
        tripRating: 4.3,
        tripComments: "Great trip",
        cities: [],
      },
      {
        destinationID: "trip3",
        destination: "Dominican Republic",
        transportType: "Plane", // train, car, bus, plane
        from: new Date(2024, 10, 12).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        to: new Date(2024, 10, 12).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        destinationBudget: 105,
        tripDuration: 12,
        dateAdded: new Date(2024, 10, 12).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        isTripCompleted: false,
        daysRemainingForTrip: 5,
        citiesIncludedOnTrip: 9,
        tripRating: 3.9,
        tripComments: "Great trip",
        cities: [],
      },
    ],
    cities: [
      {
        cityID: "city1",
        parentDestinationId: "trip1",
        city: "Malaga",
        location: "malaga,spain <url address added here>",
        from: new Date(2024, 10, 8).toDateString(),
        to: new Date(2024, 10, 10).toDateString(),
        accommodation: "airbnb", // hotel, hostel, home, apt.
        accommodationCost: 150,
        isAccommodationPaid: true,
        totalCost: 0, // based on the total cost of the trip
        isThisCityVisited: true,
        cityRating: 3.9,
        cityDuration: 3,
        daysRemainingForCity: 150,
        expenseIncludedOnCity: 15,
        cityComments: "comments",
        date: new Date(2024, 10, 12).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        cities: [],
      },
      {
        cityID: "city2",
        parentDestinationId: "trip1",
        city: "Seville",
        location: "malaga,spain <url address added here>",
        from: new Date(2024, 10, 9).toDateString(),
        to: new Date(2024, 10, 12).toDateString(),
        accommodation: "airbnb", // hotel, hostel, home, apt.
        accommodationCost: 150,
        isAccommodationPaid: true,
        totalCost: 0, // based on the total cost of the trip
        isThisCityVisited: true,
        cityRating: 4.5,
        cityDuration: 3,
        daysRemainingForCity: 150,
        expenseIncludedOnCity: 15,
        cityComments: "comments",
        date: new Date(2024, 10, 12).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        expenses: [],
      },
      {
        cityID: "city3",
        parentDestinationId: "trip1",
        city: "Granada",
        location: "malaga,spain <url address added here>",
        from: new Date(2024, 10, 10).toDateString(),
        to: new Date(2024, 10, 12).toDateString(),
        accommodation: "airbnb", // hotel, hostel, home, apt.
        accommodationCost: 150,
        isAccommodationPaid: false,
        totalCost: 0, // based on the total cost of the trip
        isThisCityVisited: true,
        cityRating: 4.5,
        cityDuration: 3,
        daysRemainingForCity: 150,
        expenseIncludedOnCity: 15,
        cityComments: "comments",
        date: new Date(2024, 10, 12).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        expenses: [],
      },
      {
        cityID: "city4",
        parentDestinationId: "trip1",
        city: "Cordoba",
        location: "malaga,spain <url address added here>",
        from: new Date(2024, 10, 9).toDateString(),
        to: new Date(2024, 10, 12).toDateString(),
        accommodation: "airbnb", // hotel, hostel, home, apt.
        accommodationCost: 150,
        isAccommodationPaid: false,
        totalCost: 0, // based on the total cost of the trip
        isThisCityVisited: false,
        cityRating: 4.5,
        cityDuration: 3,
        daysRemainingForCity: 150,
        expenseIncludedOnCity: 15,
        cityComments: "comments",
        date: new Date(2024, 10, 12).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        expenses: [],
      },
      {
        cityID: "city5",
        parentDestinationId: "trip2",
        city: "Quebec",
        date: new Date(2024, 10, 12).toDateString(),
        location: "Montreal, Canada <url address added here>",
        from: new Date(2024, 10, 9).toDateString(),
        to: new Date(2024, 10, 12).toDateString(),
        accommodation: "airbnb", // hotel, hostel, home, apt.
        accommodationCost: 150,
        isAccommodationPaid: false,
        totalCost: 0, // based on the total cost of the trip
        isThisCityVisited: false,
        cityRating: 4.7,
        cityDuration: 3,
        daysRemainingForCity: 150,
        expenseIncludedOnCity: 15,
        cityComments: "comments",
        date: new Date(2024, 10, 12).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        expenses: [],
      },
      {
        cityID: "city6",
        parentDestinationId: "trip2",
        city: "Montreal",
        location: "Quebec, Canada <url address added here>",
        from: new Date(2024, 10, 9).toDateString(),
        to: new Date(2024, 10, 12).toDateString(),
        accommodation: "airbnb", // hotel, hostel, home, apt.
        accommodationCost: 150,
        isAccommodationPaid: false,
        totalCost: 0, // based on the total cost of the trip
        isThisCityVisited: false,
        cityRating: 4,
        cityDuration: 3,
        daysRemainingForCity: 150,
        expenseIncludedOnCity: 15,
        cityComments: "comments",
        date: new Date(2024, 10, 12).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        expenses: [],
      },
      {
        cityID: "city7",
        parentDestinationId: "trip3",
        city: "Santiago",
        location: "Santiago, RD <url address added here>",
        from: new Date(2024, 10, 9).toDateString(),
        to: new Date(2024, 10, 12).toDateString(),
        accommodation: "hotel", // hotel, hostel, home, apt.
        accommodationCost: 150,
        isAccommodationPaid: false,
        totalCost: 0, // based on the total cost of the trip
        isThisCityVisited: false,
        cityRating: 3.9,
        cityDuration: 3,
        daysRemainingForCity: 150,
        expenseIncludedOnCity: 15,
        cityComments: "comments",
        date: new Date(2024, 10, 12).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        expenses: [],
      },
    ],
    expenses: [
      {
        expenseID: "ex1",
        destinationParentID: "trip1",
        cityParentID: "city1",
        category: "Attractions",
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
    async fetchDestinations() {

      const response = await fetch(
         "https://travel-planning-app-44a08-default-rtdb.firebaseio.com/destinations.json"
      );
      const responseData = await response.json();
      this.destination = responseData;

      if (!response.ok) {
        const error = new Error(responseData.message || "Failed to fetch!");
        throw error;
      }

      const destinationsList = [];

      for (const key in this.destination) {
        const destination = {
          id: key,
          destination: destination[key].destination,
          transportType: transportType[key].transportType,
          from: from[key].from,
          to: to[key].to,
          destinationBudget: destinationBudget[key].destinationBudget,  
          tripDuration: tripDuration[key].tripDuration,
          date: dateAdded[key].dateAdded,
          isTripCompleted: isTripCompleted[key].isTripCompleted,
          destinationComments: destinationComments[key].destinationComments,
          daysRemainingForTrip: daysRemainingForTrip[key].daysRemainingForTrip,
          citiesIncludedOnTrip: citiesIncludedOnTrip[key].citiesIncludedOnTrip,
          destinationRating: destinationRating[key].destinationRating,
          tripRating: tripRating[key].tripRating
        
        };
        destinationsList.push(destination);
      }
      this.destination = destinations;
    },
    async addDestination(data) {
      let response = await fetch(
        "https://travel-planning-app-44a08-default-rtdb.firebaseio.com/destinations.json",
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
-
3