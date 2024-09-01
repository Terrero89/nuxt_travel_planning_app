<script setup>
import { onMounted } from "vue";
import { useDestinationStore } from "@/store/destination";
import { storeToRefs } from "pinia";

// Access the store
const store = useDestinationStore();
const { destination, isLoading } = storeToRefs(store); // Include isLoading state

// Fetch destinations when the component is mounted
const { fetchDestinations } = store;

onMounted(async () => {
  await fetchDestinations();
});

const props = defineProps([
  "destinationID",
  "destination",
  "transportType",
  "from",
  "to",
  "destinationBudget",
  "tripDuration",
  "date",
  "isTripCompleted",
  "destinationComments",
  "daysRemainingForTrip",
  "citiesIncludedOnTrip",
  "tripRating",

]);

// const filterByDest = () {
//   return destination.filter(city => city.=== )
// }

</script>
<template>
  <div class="projects">
  
    <UICard class="mt-5 mb-2 py-4">
      <UButton label="Go To Cities" to="/destinations/trips1"></UButton>
      <UButton
        label="Create Destination"
        variant="outline"
        color="indigo"
        to="/destinations/create"
      ></UButton>
    </UICard>
    <UITitle title="Projects" class="container border-bottom" />
    <div class="container">
      <!-- Display loading message or spinner while data is being fetched -->
      <div v-if="isLoading" class="flex items-center space-x-4">
        <div class="space-y-2 mx-auto">
          <USkeleton class="h-10 w-[850px]" />
          <USkeleton class="mt-5 h-10 w-[800px]" />
          <USkeleton class="h-10 w-[800px]" />
          <USkeleton class="h-10 w-[800px]" />
        </div>
      </div>

      <div v-else>
   
    
        <DestinationItem
          v-for="trip in destination"
          :key="trip.destinationID"
          :destinationID="trip.destinationID"
          :destination="trip.destination"
          :transportType="trip.transportType"
          :from="trip.from"
          :to="trip.to"
          :destinationBudget="trip.destinationBudget"
          :tripDuration="trip.tripDuration"
          :date="trip.dateAdded"
          :isTripCompleted="trip.isTripCompleted"
          :daysRemainingForTrip="trip.daysRemainingForTrip"
          :citiesIncludedOnTrip="trip.citiesIncludedOnTrip"
          :tripRating="trip.tripRating"
          :tripComments="trip.tripComments"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* You can style the loading message here if needed */
</style>
