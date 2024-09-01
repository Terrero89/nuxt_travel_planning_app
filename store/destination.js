import axios from "axios";
import { defineStore } from "pinia";

export const useDestinationStore = defineStore({
  id: "destinations",
  state: () => ({
    URL: "https://travel-planning-app-44a08-default-rtdb.firebaseio.com/destinations.json",
    destination: [],
    editedData :{},
    isLoading: false, // Add loading state
    testDestination: [{name:'Sergio', hobbies:[{action:'run', enjoy:'eat'}, {action:'jump', enjoy:'fuck'}]}]
  }),
  actions: {


    // editDestination(param) {
    //   //trick, if project is not eqwual to edit project, then edited project will be equal to what ever is changed to
    //   let foundDestination = this.destination.find((item) => item.destinationID === param); //finds the project from the
    //   return foundDestination
    // },

    // async updateDestinationRequest(id) {
    //   // const url = `https://project-manager-app-f9829-default-rtdb.firebaseio.com/p/${id}.json`;
    //   const url =  `${this.URL}/${id}.json`;
    //   const payload = this.editedData; // payload will be equal to the new updated task
    //   const response = await fetch(url, {
    //     method: "POST",
    //     body: JSON.stringify({...payload}),
    //   });
      
    // },

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
            tripComments:responseData[key].tripComments
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
    async deleteDestination(itemID) {
    
      let response = await fetch(
        `${this.URL}/${itemID}/.json`,
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
