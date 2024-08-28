import { defineStore } from "pinia";

export const useDestinationStore = defineStore({
  id: "destinations",

  state: () => ({
    destination: [
      {
        destinationID: "trip1",
        destination: "Andalusia Trip",
        transportType: "Plane", // train, car, bus, plane
        from: new Date(2024, 10, 7).toDateString(),
        to: new Date(2024, 10, 19).toDateString(),
        destinationBudget: 1000,
        tripDuration: 10,
        dateAdded: new Date(2024, 7, 7).toDateString(),
        isTripCompleted: false,
        daysRemainingForTrip: 5,
        citiesIncludedOnTrip: 9,
        tripRating: 4.5,
        tripComments: "Great trip",
        cities:[],
      },
      {
        destinationID: "trip2",
        destination: "Canada",
        transportType: "Car", // train, car, bus, plane
        from: new Date(2024, 11, 7).toDateString(),
        to: new Date(2024, 11, 19).toDateString(),
        destinationBudget: 1000,
        tripDuration: 12,
        dateAdded: new Date(2024, 7, 7).toDateString(),
        isTripCompleted: false,
        daysRemainingForTrip: 122,
        citiesIncludedOnTrip: 2,
        tripRating: 4.5,
        tripComments: "Great trip",
        cities:[],
      },
      {
        destinationID: "trip3",
        destination: "Dominican Republic",
        transportType: "Plane", // train, car, bus, plane
        from: new Date(2024, 11, 7).toDateString(),
        to: new Date(2024, 11, 19).toDateString(),
        destinationBudget: 105,
        tripDuration: 12,
        dateAdded: new Date(2024, 7, 7).toDateString(),
        isTripCompleted: false,
        daysRemainingForTrip: 5,
        citiesIncludedOnTrip: 9,
        tripRating: 4.5,
        tripComments: "Great trip",
        cities:[],
      },
    ],
    cities: [
      {
        cityID: "city1",
        parentDestinationId: 'trip1',
        city: "Malaga",
        location: 'malaga,spain <url address added here>',
        from: new Date(2024, 10, 8).toDateString(),
        to: new Date(2024, 10, 10).toDateString(),
        accommodation: 'airbnb', // hotel, hostel, home, apt. 
        accommodationCost: 150, 
        totalCost: 0, // based on the total cost of the trip
        isThisCityVisited: false,
        cityRating: 4.5,
        cityDuration: 3,
        daysRemainingForCity: 150,
        expenseIncludedOnCity: 15,
        cityComments: "comments",
        date: new Date(2024, 7, 10).toDateString(),
        cities: [],
      },
      {
        cityID: "city2",
        parentDestinationId: 'trip1',
        city: "Seville",
        location: 'malaga,spain <url address added here>',
        from: new Date(2024, 10, 9).toDateString(),
        to: new Date(2024, 10, 12).toDateString(),
        accommodation: 'airbnb', // hotel, hostel, home, apt. 
        accommodationCost: 150, 
        totalCost: 0, // based on the total cost of the trip
        isThisCityVisited: false,
        cityRating: 4.5,
        cityDuration: 3,
        daysRemainingForCity: 150,
        expenseIncludedOnCity: 15,
        cityComments: "comments",
        date: new Date(2024, 7, 10).toDateString(),
        expenses: [],
      },
      {
        cityID: "city3",
        parentDestinationId: 'trip1',
        city: "Granada",
        location: 'malaga,spain <url address added here>',
        from: new Date(2024, 10, 10).toDateString(),
        to: new Date(2024, 10, 12).toDateString(),
        accommodation: 'airbnb', // hotel, hostel, home, apt. 
        accommodationCost: 150, 
        totalCost: 0, // based on the total cost of the trip
        isThisCityVisited: false,
        cityRating: 4.5,
        cityDuration: 3,
        daysRemainingForCity: 150,
        expenseIncludedOnCity: 15,
        cityComments: "comments",
        date: new Date(2024, 7, 10).toDateString(),
        expenses: [],
      },
      {
        cityID: "city4",
        parentDestinationId: 'trip1',
        city: "Cordoba",
        location: 'malaga,spain <url address added here>',
        from: new Date(2024, 10, 9).toDateString(),
        to: new Date(2024, 10, 12).toDateString(),
        accommodation: 'airbnb', // hotel, hostel, home, apt. 
        accommodationCost: 150, 
        totalCost: 0, // based on the total cost of the trip
        isThisCityVisited: false,
        cityRating: 4.5,
        cityDuration: 3,
        daysRemainingForCity: 150,
        expenseIncludedOnCity: 15,
        cityComments: "comments",
        date: new Date(2024, 7, 10).toDateString(),
        expenses: [],
      },
      {
        cityID: "city5",
        parentDestinationId: 'trip2',
        city: "Quebec",
        location: 'Montreal, Canada <url address added here>',
        from: new Date(2024, 10, 9).toDateString(),
        to: new Date(2024, 10, 12).toDateString(),
        accommodation: 'airbnb', // hotel, hostel, home, apt. 
        accommodationCost: 150, 
        totalCost: 0, // based on the total cost of the trip
        isThisCityVisited: false,
        cityRating: 4.5,
        cityDuration: 3,
        daysRemainingForCity: 150,
        expenseIncludedOnCity: 15,
        cityComments: "comments",
        date: new Date(2024, 7, 10).toDateString(),
        expenses: [],
      },
      {
        cityID: "city6",
        parentDestinationId: 'trip2',
        city: "Montreal",
        location: 'Quebec, Canada <url address added here>',
        from: new Date(2024, 10, 9).toDateString(),
        to: new Date(2024, 10, 12).toDateString(),
        accommodation: 'airbnb', // hotel, hostel, home, apt. 
        accommodationCost: 150, 
        totalCost: 0, // based on the total cost of the trip
        isThisCityVisited: false,
        cityRating: 4.5,
        cityDuration: 3,
        daysRemainingForCity: 150,
        expenseIncludedOnCity: 15,
        cityComments: "comments",
        date: new Date(2024, 7, 10).toDateString(),
        expenses: [],
      },
      {
        cityID: "city7",
        parentDestinationId: 'trip3',
        city: "Santiago",
        location: 'Santiago, RD <url address added here>',
        from: new Date(2024, 10, 9).toDateString(),
        to: new Date(2024, 10, 12).toDateString(),
        accommodation: 'hotel', // hotel, hostel, home, apt. 
        accommodationCost: 150, 
        totalCost: 0, // based on the total cost of the trip
        isThisCityVisited: false,
        cityRating: 4.5,
        cityDuration: 3,
        daysRemainingForCity: 150,
        expenseIncludedOnCity: 15,
        cityComments: "comments",
        date: new Date(2024, 7, 10).toDateString(),
        expenses: [],
      },
      
      
    ],
    expenses: [
        {
        expenseID: "ex1",
        destinationParentID:'trip1',
        cityParentID:'city1',
        category: "Attractions",
        expense: "Mezquita-Catedral de Córdoba",
        cost: 11,
        date: new Date(2024, 10, 12).toDateString(),
        startTime: '09:00am',
        endTime: '11:00am',
        duration: 2.0,
        comments: "Iconic mosque-cathedral, a blend of Islamic and Christian architecture",
        location: 'Córdoba, Spain',
        isCompleted: false,
        placerating: 4.9,
        daysRemainingForExpense: 0,
        
      },
      {
        expenseID: "ex2",
        destinationParentID:'trip1',
        cityParentID:'city1',
        category: "Food",
        expense: "Salmorejo at Bodegas Mezquita",
        cost: 15,
        date: new Date(2024, 10, 12).toDateString(),
        startTime: '12:00pm',
        endTime: '01:30pm',
        duration: 1.5,
        comments: "Traditional cold soup, a must-try dish in Córdoba",
        location: 'Bodegas Mezquita, Córdoba, Spain',
        isCompleted: false,
        placerating: 4.7,
        daysRemainingForExpense: 0,
      },
      {
        expenseID: "ex3",
        destinationParentID:'trip1',
        cityParentID:'city1',
        category: "Landmarks",
        expense: "Mezquita-Catedral de Córdoba",
        cost: 11,
        date: new Date(2024, 10, 12).toDateString(),
        startTime: '09:00am',
        endTime: '11:00am',
        duration: 2.0,
        comments: "Iconic mosque-cathedral, a blend of Islamic and Christian architecture",
        location: 'Córdoba, Spain',
        isCompleted: false,
        placerating: 4.9,
        daysRemainingForExpense: 0,
      },
      {
        expenseID: "ex4",
        destinationParentID:'trip1',
        cityParentID:'city1',
        category: "Taxi",
        expense: "Salmorejo at Bodegas Mezquita",
        cost: 15,
        date: new Date(2024, 10, 12).toDateString(),
        startTime: '12:00pm',
        endTime: '01:30pm',
        duration: 1.5,
        comments: "Traditional cold soup, a must-try dish in Córdoba",
        location: 'Bodegas Mezquita, Córdoba, Spain',
        isCompleted: false,
        placerating: 4.7,
        daysRemainingForExpense: 0,
      },
      {
        expenseID: "ex5",
        destinationParentID:'trip1',
        cityParentID:'city1',
        category: "Souvenirs",
        expense: "Mezquita-Catedral de Córdoba",
        cost: 11,
        date: new Date(2024, 10, 12).toDateString(),
        startTime: '09:00am',
        endTime: '11:00am',
        duration: 2.0,
        comments: "Iconic mosque-cathedral, a blend of Islamic and Christian architecture",
        location: 'Córdoba, Spain',
        isCompleted: false,
        placerating: 4.9,
        daysRemainingForExpense: 0,
      },
      {
        expenseID: "ex6",
        destinationParentID:'trip1',
        cityParentID:'city1',
        category: "Accommodation",
        expense: "Salmorejo at Bodegas Mezquita",
        cost: 15,
        date: new Date(2024, 10, 12).toDateString(),
        startTime: '12:00pm',
        endTime: '01:30pm',
        duration: 1.5,
        comments: "Traditional cold soup, a must-try dish in Córdoba",
        location: 'Bodegas Mezquita, Córdoba, Spain',
        isCompleted: false,
        placerating: 4.7,
        daysRemainingForExpense: 0,
      },
      {
        expenseID: "ex7",
        destinationParentID:'trip2',
        cityParentID:'city2',
        category: "Transportation",
        expense: "Quebec City Cathedral",
        cost: 15,
        date: new Date(2024, 10, 12).toDateString(),
        startTime: '12:00pm',
        endTime: '01:30pm',
        duration: 1.5,
        comments: "Traditional cold soup, a must-try dish in Córdoba",
        location: 'Bodegas Mezquita, Córdoba, Spain',
        isCompleted: false,
        placerating: 4.7,
        daysRemainingForExpense: 0,
      },
      {
        expenseID: "ex8",
        destinationParentID:'trip3',
        cityParentID:'city2',
        category: "Purchase",
        expense: "Salmorejo at Bodegas Mezquita",
        cost: 15,
        date: new Date(2024, 10, 12).toDateString(),
        startTime: '12:00pm',
        endTime: '01:30pm',
        duration: 1.5,
        comments: "Traditional cold soup, a must-try dish in Córdoba",
        location: 'Bodegas Mezquita, Córdoba, Spain',
        isCompleted: false,
        placerating: 4.7,
        daysRemainingForExpense: 0,
      },
    ],
  }),
});
