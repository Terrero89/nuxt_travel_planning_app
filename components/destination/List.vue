<script setup>
import {onMounted} from 'vue'
import { useDestinationStore } from "@/store/destination";
const store = useDestinationStore();
import { storeToRefs } from "pinia";
const { destination } = storeToRefs(store);
const { fetchDestinations } = store;
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

onMounted(() => {
  fetchDestinations();
});


</script>

<template>
  <div class="projects">
    <UITitle title="Projects" class="container border-bottom" />

    <div class="container">

    </div>
   
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
</template>

<style scoped>

</style>
