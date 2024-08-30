import axios from "axios";
import { defineStore } from "pinia";
export const useDestinationStore = defineStore({
  id: "destinations",

  state: () => ({
    URL: "https://travel-planning-app-44a08-default-rtdb.firebaseio.com/destinations.json",
    destination: [
      // {
      //   destinationID: "trip1",
      //   destination: "Andalusia Trip",
      //   transportType: "Plane", // train, car, bus, plane
      //   from: new Date(2024, 10, 12).toLocaleDateString("en-US", {
      //     month: "short",
      //     day: "numeric",
      //     year: "numeric",
      //   }),
      //   to: new Date(2024, 10, 12).toLocaleDateString("en-US", {
      //     month: "short",
      //     day: "numeric",
      //     year: "numeric",
      //   }),
      //   destinationBudget: 1000,
      //   tripDuration: 10,
      //   dateAdded: new Date(2024, 10, 12).toLocaleDateString("en-US", {
      //     month: "short",
      //     day: "numeric",
      //     year: "numeric",
      //   }),
      //   isTripCompleted: true,
      //   daysRemainingForTrip: 5,
      //   citiesIncludedOnTrip: 9,
      //   tripRating: 4.7,
      //   tripComments: "Great trip",
      //   cities: [],
      // },
      // {
      //   destinationID: "trip2",
      //   destination: "Canada",
      //   transportType: "Car", // train, car, bus, plane
      //   from: new Date(2024, 10, 12).toLocaleDateString("en-US", {
      //     month: "short",
      //     day: "numeric",
      //     year: "numeric",
      //   }),
      //   to: new Date(2024, 10, 12).toLocaleDateString("en-US", {
      //     month: "short",
      //     day: "numeric",
      //     year: "numeric",
      //   }),
      //   destinationBudget: 1000,
      //   tripDuration: 12,
      //   dateAdded: new Date(2024, 7, 7).toDateString(),
      //   dateAdded: new Date(2024, 10, 12).toLocaleDateString("en-US", {
      //     month: "short",
      //     day: "numeric",
      //     year: "numeric",
      //   }),
      //   isTripCompleted: false,
      //   daysRemainingForTrip: 122,
      //   citiesIncludedOnTrip: 2,
      //   tripRating: 4.3,
      //   tripComments: "Great trip",
      //   cities: [],
      // },
      // {
      //   destinationID: "trip3",
      //   destination: "Dominican Republic",
      //   transportType: "Plane", // train, car, bus, plane
      //   from: new Date(2024, 10, 12).toLocaleDateString("en-US", {
      //     month: "short",
      //     day: "numeric",
      //     year: "numeric",
      //   }),
      //   to: new Date(2024, 10, 12).toLocaleDateString("en-US", {
      //     month: "short",
      //     day: "numeric",
      //     year: "numeric",
      //   }),
      //   destinationBudget: 105,
      //   tripDuration: 12,
      //   dateAdded: new Date(2024, 10, 12).toLocaleDateString("en-US", {
      //     month: "short",
      //     day: "numeric",
      //     year: "numeric",
      //   }),
      //   isTripCompleted: false,
      //   daysRemainingForTrip: 5,
      //   citiesIncludedOnTrip: 9,
      //   tripRating: 3.9,
      //   tripComments: "Great trip",
      //   cities: [],
      // },
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
    async addDestination(data) {
      const response = await fetch(
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
    async updateDestination(tripData) {
      try {
        const response = await axios.put(
          `/destinations/${tripData.destinationID}.json`,
          tripData
        );
        const updatedDestination = response.data;

        // Update the local state if necessary
        const index = this.destinations.findIndex(
          (dest) => dest.destinationId === tripData.destinationID
        );
        if (index !== -1) {
          this.destinations[index] = updatedDestination;
        }

        return updatedDestination;
      } catch (error) {
        console.error("Failed to update destination:", error);
        throw error;
      }
    },

    // need a delete and update specific destination
  },
});
