import axios from "axios";
import { defineStore } from "pinia";

export const useDestinationStore = defineStore({
  id: "destinations",
  state: () => ({
    URL: "https://travel-planning-app-44a08-default-rtdb.firebaseio.com/destinations.json",
    destination: [],
    editedData: {},
    isLoading: false, // Add loading state
    testDestination: [
      {
        name: "Sergio",
        hobbies: [
          { action: "run", enjoy: "eat" },
          { action: "jump", enjoy: "fuck" },
        ],
      },
    ],
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
            tripComments: responseData[key].tripComments,
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
        `https://project-manager-app-f9829-default-rtdb.firebaseio.com/projects/${itemID}/.json`,
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

    editDestination(param) {
      //trick, if project is not eqwual to edit project, then edited project will be equal to what ever is changed to
      let found = this.destination.find((dest) => dest.destinationID === param); //finds the project from the
      return found;
    },
    async updateDestination(id) {
      const url =`https://travel-planning-app-44a08-default-rtdb.firebaseio.com/destinations/${id}.json`;
      const payload = this.editedData; // payload will be equal to the new updated task
      const options = {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(payload),
      };
      fetch(url, options).then((response) =>
        console.log("response from pinia " + response.status)
      );

      // if (!response.ok) {
      //   console.log("Super error 400");
      // }
      
    },

    // async updateDestination(id, payload) {

    //   let response = await fetch(`${this.URL}/${id}/.json`,{
    //     method: "PUT",
    //     "Content-type": "application/json",
    //     body: JSON.stringify(payload),
    //   });
    // },

    // Add delete action if needed
    // async updateDestination(id, payload) {
    //   try {
    //     const response = await fetch(`https://travel-planning-app-44a08-default-rtdb.firebaseio.com/destinations/${id}.json`, {
    //       method: "PUT",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(payload),
    //     });
    
    //     if (!response.ok) {
    //       throw new Error("Failed to update destination.");
    //     }
    
    //     // Update the local state after a successful update (assuming destinations is in state)
    //     const updatedDestination = await response.json();
    //     const index = this.destinations.findIndex(
    //       (dest) => dest.destinationID === id
    //     );
    //     if (index !== -1) {
    //       this.$patch((state) => {
    //         state.destinations[index] = updatedDestination; // Update using `$patch`
    //       });
    //     }
    //   } catch (error) {
    //     console.error("Error updating destination:", error);
    //   }
    // }
  },
});
