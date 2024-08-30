import axios from "axios";
import { defineStore } from "pinia";

export const useCityStore = defineStore({
  id: "cities",  
    state: () => ({
      URL: "https://travel-planning-app-44a08-default-rtdb.firebaseio.com/destinations.json",
    cities: [
      
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
            destinationID: key,
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
            tripRating: tripRating[key].tripRating,
          };
          destinationsList.push(destination);
        }
        this.destination = destinations;
      },
      async addCity(data) {
        const response = await fetch(
          "https://travel-planning-app-44a08-default-rtdb.firebaseio.com/cities.json",
          {
            method: "POST",
            body: JSON.stringify({ ...data }),
          }
        );
        if (!response.ok) {
          console.log("ERROR PROJECTS");
        }
      },
      // async updateDestination(cityData) {
      //   try {
      //     const response = await axios.put(
      //       `/destinations/${tripData.destinationID}.json`,
      //       tripData
      //     );
      //     const updatedDestination = response.data;
  
      //     // Update the local state if necessary
      //     const index = this.destinations.findIndex(
      //       (dest) => dest.destinationId === tripData.destinationID
      //     );
      //     if (index !== -1) {
      //       this.destinations[index] = updatedDestination;
      //     }
  
      //     return updatedDestination;
      //   } catch (error) {
      //     console.error("Failed to update destination:", error);
      //     throw error;
      //   }
      // },
  
      // need a delete and update specific destination
    },
  });
  
//   actions:{
//     async fetchDestinations() {
//       const response = await fetch(
//         "https://travel-planning-app-44a08-default-rtdb.firebaseio.com/cities.json"
//       );
//       const responseData = await response.json();
//       this.cities = responseData;

//       if (!response.ok) {
//         const error = new Error(responseData.message || "Failed to fetch!");
//         throw error;
//       }

//       const cityList = [];

//       for (const key in this.cities) {
//         const newCity= {
//           cityID: key,
//           parentDestinationID: parentDestinationID[key].parentDestinationID,
//           city: city[key].city,
//           accommodation: accommodation[key].accommodation,
//           from: from[key].from,
//           to: to[key].to,
//           accommodationCost: accommodationCost[key].accommodationCost,
//           isAccommodationPaid: isAccommodationPaid[key].isAccommodationPaid,
//           totalCost: totalCost[key].totalCost,
//           isThisCityVisited: isThisCityVisited[key].isThisCityVisited,
//           cityRating: cityRating[key].cityRating,
//           cityDuration:cityDuration[key].cityDuration,
//           daysRemainingForCity: daysRemainingForCity[key].daysRemainingForCity,
//           expenseIncludedOnCity: expenseIncludedOnCity[key].expenseIncludedOnCity,
//           cityComments:cityComments[key].cityComments,
         
//         };
//         cityList.push(newCity);
//       }
//       this.cities = cityList;
//     },
//   },
// });
