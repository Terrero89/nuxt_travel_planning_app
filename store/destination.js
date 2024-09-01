import axios from "axios";
import { defineStore } from "pinia";

export const useDestinationStore = defineStore({
  id: "destinations",
  state: () => ({
    URL: "https://travel-planning-app-44a08-default-rtdb.firebaseio.com/destinations.json",
    destination: [],
    isLoading: false, // Add loading state
    testDestination: [{name:'Sergio', hobbies:[{action:'run', enjoy:'eat'}, {action:'jump', enjoy:'fuck'}]}]
  }),
  actions: {
    async fetchDestinations() {
      this.isLoading = true; // Start loading
      try {
        const response = await fetch(this.URL);
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message || "Failed to fetch!");
        }

        const destinationsList = [];
        for (const key in responseData) {
          const destination = {
            destinationID: key,
            destination: responseData[key].destination,
            transportType: responseData[key].transportType,
            from: responseData[key].from,
            to: responseData[key].to,
            destinationBudget: responseData[key].destinationBudget,
            tripDuration: responseData[key].tripDuration,
            date: responseData[key].dateAdded,
            isTripCompleted: responseData[key].isTripCompleted,
            destinationComments: responseData[key].destinationComments,
            daysRemainingForTrip: responseData[key].daysRemainingForTrip,
            citiesIncludedOnTrip: responseData[key].citiesIncludedOnTrip,
            destinationRating: responseData[key].destinationRating,
            tripRating: responseData[key].tripRating,
          };
          destinationsList.push(destination);
        }
        this.destination = destinationsList;
      } catch (error) {
        console.error("Failed to fetch destinations:", error);
      } finally {
        this.isLoading = false; // Stop loading
      }
    },
    async addDestination(data) {
      const response = await fetch(this.URL, {
        method: "POST",
        body: JSON.stringify({ ...data }),
      });
      if (!response.ok) {
        console.error("Failed to add destination");
      }
    },
    async updateDestination(tripData) {
      try {
        const response = await axios.put(
          `/destinations/${tripData.destinationID}.json`,
          tripData
        );
        const updatedDestination = response.data;

        const index = this.destination.findIndex(
          (dest) => dest.destinationID === tripData.destinationID
        );
        if (index !== -1) {
          this.destination[index] = updatedDestination;
        }

        return updatedDestination;
      } catch (error) {
        console.error("Failed to update destination:", error);
        throw error;
      }
    },
    // Add delete action if needed
  },
});
