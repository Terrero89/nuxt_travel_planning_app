import { defineStore } from "pinia";

export const useDestinationStore = defineStore({
  id: "destinations",
  state: () => ({
    URL: "https://travel-planning-app-44a08-default-rtdb.firebaseio.com/destinations.json",
    destination: [],
    editedData: {},
    isLoading: false, // Add loading state
    destinationsTotalCost: 0,
    destinationsTotalDuration: 0,
    destinationsTotalRating: 0,
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
            planeTickets: responseData[key].planeTickets,
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
            date: responseData[key].date,
            numOfPeople: responseData[key].numOfPeople,
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
        `https://travel-planning-app-44a08-default-rtdb.firebaseio.com/destinations/${itemID}.json`,
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

    async updateDestination(destID, payload) {
      const url = `https://travel-planning-app-44a08-default-rtdb.firebaseio.com/destinations/${destID}.json`;
      const options = {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(payload),
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Failed to update city");
        }

        // Ensure the response contains the updated data
        const updatedDestination = await response.json();

        // Update the local state after a successful update
        const index = this.destination.findIndex(
          (dest) => dest.destinationID === destID
        );
        if (index !== -1) {
          // Use the returned data from Firebase to ensure consistency
          this.destination[index] = { destID, ...updatedDestination };
        }
      } catch (error) {
        console.error("Error updating Destination:", error);
      }
    },
  },
  getters: {
    destinationsAsArray: (state) => {
      return state.destination;
    },

    destinationsStats: (state) => {
      const completedDest = state.destination.filter(
        (item) => item.isTripCompleted === "Completed"
      );
      const progressDest = state.destination.filter(
        (item) => item.isTripCompleted === "In Progress"
      );
      const pendingDest = state.destination.filter(
        (item) => item.isTripCompleted === "Pending"
      );
      const nullDest = state.destination.filter(
        (item) => item.isTripCompleted === null || !item.isTripCompleted
      );
      let pendingPercentage =
        ((pendingDest.length + progressDest.length) /
          state.destination.length) *
          100 ===
        0
          ? 100
          : ((pendingDest.length + progressDest.length) /
              state.destination.length) *
            100;
      return {
        arrayLength: state.destination.length,
        completed: completedDest.length,
        progress: progressDest.length,
        pending: pendingDest.length,
        null: nullDest.length,
        percentage: pendingPercentage,
        pendingTotals: 100 - pendingPercentage,
          
      };
    },
    //? FILTERS DESTINATIONS BASED ON STATUS OF COMPLETION
    filterByStatusComplete: (state) =>
      state.destination.filter((data) => data.isTripCompleted === "Completed"),
    filterByStatusPending: (state) =>
      state.destination.filter((data) => data.isTripCompleted === "Pending"),
    filterByStatusInProgress: (state) =>
      state.destination.filter(
        (data) => data.isTripCompleted === "In Progress"
      ),
    getTotalCosts: (state) => (destID, citiesArray) => {
      // const filteredDestinations = state.destination.filter((p) => p.destinationID);
      const filteredCities = citiesArray.filter((p) => p.parentDestinationID);
      const filterAll = filteredCities.filter(
        (p) => p.parentDestinationID === destID
      );
      const totalCost = filterAll.reduce(
        (sum, city) => sum + city.totalCost,
        0
      );
      // Calculate the sum of ratings
      const totalRating = filterAll.reduce(
        (sum, city) => sum + (city.cityRating || 0),
        0
      );

      const lengthData = filterAll.length;
      // Calculate the average rating
      const aveRating = totalRating / lengthData;

      // return totalAccommodationCost;
      return {
        totalCost: totalCost,
        numOfCities: filterAll.length,
        aveRating: aveRating,
      };
    },

    // ? will search and item by its name
    filterItemByName: (state) => (filter) => {
      if (!filter) return state.destination; // Return all if no filter
      return state.destination.filter((item) =>
        item.destination.toLowerCase().includes(filter.toLowerCase())
      );
    },
  },
});
