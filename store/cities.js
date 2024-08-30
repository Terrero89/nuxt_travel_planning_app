import { defineStore } from "pinia";

export const useCityStore = defineStore({
  id: "cities",

  state: () => ({
    URL: "https://travel-planning-app-44a08-default-rtdb.firebaseio.com/cities.json",
    cities:[],
    // cities: [
    //   {
    //     cityID: "city1",
    //     parentDestinationId: "trip1",
    //     city: "Malaga",
    //     location: "malaga,spain <url address added here>",
    //     from: new Date(2024, 10, 12).toLocaleDateString("en-US", {
    //       month: "short",
    //       day: "numeric",
    //       year: "numeric",
    //     }),
    //     to: new Date(2024, 10, 12).toLocaleDateString("en-US", {
    //       month: "short",
    //       day: "numeric",
    //       year: "numeric",
    //     }),
    //     accommodation: "airbnb", // hotel, hostel, home, apt.
    //     accommodationCost: 150,
    //     isAccommodationPaid: true,
    //     totalCost: 0, // based on the total cost of the trip
    //     isThisCityVisited: true,
    //     cityRating: 3.9,
    //     cityDuration: 3,
    //     daysRemainingForCity: 150,
    //     expenseIncludedOnCity: 15,
    //     cityComments: "comments",
    //     date: new Date(2024, 10, 12).toLocaleDateString("en-US", {
    //       month: "short",
    //       day: "numeric",
    //       year: "numeric",
    //     }),
    //   },
    //   {
    //     cityID: "city2",
    //     parentDestinationId: "trip1",
    //     city: "Seville",
    //     location: "malaga,spain <url address added here>",
    //     from: new Date(2024, 10, 12).toLocaleDateString("en-US", {
    //       month: "short",
    //       day: "numeric",
    //       year: "numeric",
    //     }),
    //     to: new Date(2024, 10, 12).toLocaleDateString("en-US", {
    //       month: "short",
    //       day: "numeric",
    //       year: "numeric",
    //     }),
    //     accommodation: "airbnb", // hotel, hostel, home, apt.
    //     accommodationCost: 150,
    //     isAccommodationPaid: true,
    //     totalCost: 0, // based on the total cost of the trip
    //     isThisCityVisited: true,
    //     cityRating: 4.5,
    //     cityDuration: 3,
    //     daysRemainingForCity: 150,
    //     expenseIncludedOnCity: 15,
    //     cityComments: "comments",
    //     date: new Date(2024, 10, 12).toLocaleDateString("en-US", {
    //       month: "short",
    //       day: "numeric",
    //       year: "numeric",
    //     }),
    //   },
    //   {
    //     cityID: "city3",
    //     parentDestinationId: "trip1",
    //     city: "Granada",
    //     location: "malaga,spain <url address added here>",
    //     from: new Date(2024, 10, 12).toLocaleDateString("en-US", {
    //       month: "short",
    //       day: "numeric",
    //       year: "numeric",
    //     }),
    //     to: new Date(2024, 10, 12).toLocaleDateString("en-US", {
    //       month: "short",
    //       day: "numeric",
    //       year: "numeric",
    //     }),
    //     accommodation: "airbnb", // hotel, hostel, home, apt.
    //     accommodationCost: 150,
    //     isAccommodationPaid: false,
    //     totalCost: 0, // based on the total cost of the trip
    //     isThisCityVisited: true,
    //     cityRating: 4.5,
    //     cityDuration: 3,
    //     daysRemainingForCity: 150,
    //     expenseIncludedOnCity: 15,
    //     cityComments: "comments",
    //     date: new Date(2024, 10, 12).toLocaleDateString("en-US", {
    //       month: "short",
    //       day: "numeric",
    //       year: "numeric",
    //     }),
    //   },
    //   {
    //     cityID: "city4",
    //     parentDestinationId: "trip1",
    //     city: "Cordoba",
    //     location: "malaga,spain <url address added here>",
    //     from: new Date(2024, 10, 12).toLocaleDateString("en-US", {
    //       month: "short",
    //       day: "numeric",
    //       year: "numeric",
    //     }),
    //     to: new Date(2024, 10, 12).toLocaleDateString("en-US", {
    //       month: "short",
    //       day: "numeric",
    //       year: "numeric",
    //     }),
    //     accommodation: "airbnb", // hotel, hostel, home, apt.
    //     accommodationCost: 150,
    //     isAccommodationPaid: false,
    //     totalCost: 0, // based on the total cost of the trip
    //     isThisCityVisited: false,
    //     cityRating: 4.5,
    //     cityDuration: 3,
    //     daysRemainingForCity: 150,
    //     expenseIncludedOnCity: 15,
    //     cityComments: "comments",
    //     date: new Date(2024, 10, 12).toLocaleDateString("en-US", {
    //       month: "short",
    //       day: "numeric",
    //       year: "numeric",
    //     }),
    //   },
    //   {
    //     cityID: "city5",
    //     parentDestinationId: "trip2",
    //     city: "Quebec",
    //     date: new Date(2024, 10, 12).toDateString(),
    //     location: "Montreal, Canada <url address added here>",
    //     from: new Date(2024, 10, 12).toLocaleDateString("en-US", {
    //       month: "short",
    //       day: "numeric",
    //       year: "numeric",
    //     }),
    //     to: new Date(2024, 10, 12).toLocaleDateString("en-US", {
    //       month: "short",
    //       day: "numeric",
    //       year: "numeric",
    //     }),
    //     accommodation: "airbnb", // hotel, hostel, home, apt.
    //     accommodationCost: 150,
    //     isAccommodationPaid: false,
    //     totalCost: 0, // based on the total cost of the trip
    //     isThisCityVisited: false,
    //     cityRating: 4.7,
    //     cityDuration: 3,
    //     daysRemainingForCity: 150,
    //     expenseIncludedOnCity: 15,
    //     cityComments: "comments",
    //     date: new Date(2024, 10, 12).toLocaleDateString("en-US", {
    //       month: "short",
    //       day: "numeric",
    //       year: "numeric",
    //     }),
    //   },
    //   {
    //     cityID: "city6",
    //     parentDestinationId: "trip2",
    //     city: "Montreal",
    //     location: "Quebec, Canada <url address added here>",
    //     from: new Date(2024, 10, 12).toLocaleDateString("en-US", {
    //       month: "short",
    //       day: "numeric",
    //       year: "numeric",
    //     }),
    //     to: new Date(2024, 10, 12).toLocaleDateString("en-US", {
    //       month: "short",
    //       day: "numeric",
    //       year: "numeric",
    //     }),
    //     accommodation: "airbnb", // hotel, hostel, home, apt.
    //     accommodationCost: 150,
    //     isAccommodationPaid: false,
    //     totalCost: 0, // based on the total cost of the trip
    //     isThisCityVisited: false,
    //     cityRating: 4,
    //     cityDuration: 3,
    //     daysRemainingForCity: 150,
    //     expenseIncludedOnCity: 15,
    //     cityComments: "comments",
    //     date: new Date(2024, 10, 12).toLocaleDateString("en-US", {
    //       month: "short",
    //       day: "numeric",
    //       year: "numeric",
    //     }),
    //   },
    //   {
    //     cityID: "city7",
    //     parentDestinationId: "trip3",
    //     city: "Santiago",
    //     location: "Santiago, RD <url address added here>",
    //     from: new Date(2024, 10, 12).toLocaleDateString("en-US", {
    //       month: "short",
    //       day: "numeric",
    //       year: "numeric",
    //     }),
    //     to: new Date(2024, 10, 12).toLocaleDateString("en-US", {
    //       month: "short",
    //       day: "numeric",
    //       year: "numeric",
    //     }),
    //     accommodation: "hotel", // hotel, hostel, home, apt.
    //     accommodationCost: 150,
    //     isAccommodationPaid: false,
    //     totalCost: 0, // based on the total cost of the trip
    //     isThisCityVisited: false,
    //     cityRating: 3.9,
    //     cityDuration: 3,
    //     daysRemainingForCity: 150,
    //     expenseIncludedOnCity: 15,
    //     cityComments: "comments",
    //     date: new Date(2024, 10, 12).toLocaleDateString("en-US", {
    //       month: "short",
    //       day: "numeric",
    //       year: "numeric",
    //     }),
    //   },
    // ],
    
  }),
  actions:{
    async fetchDestinations() {
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
        const newCity= {
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
          cityDuration:cityDuration[key].cityDuration,
          daysRemainingForCity: daysRemainingForCity[key].daysRemainingForCity,
          expenseIncludedOnCity: expenseIncludedOnCity[key].expenseIncludedOnCity,
          cityComments:cityComments[key].cityComments,
         
        };
        cityList.push(newCity);
      }
      this.cities = cityList;
    },
  },
});
