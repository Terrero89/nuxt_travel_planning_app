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
  "tripComments",
  "numOfPeople"

]);

const createCityLink = computed(() => `/destinations/${props.destinationID}`);

</script>
<template>
  <div class="projects">

    <UICard class="mt-5 mb-1 py-4">
      <div class="row">
        <div class="col-6 col-6-sm ">
          
         
          <UButton class="mx-2 links" label="Add Destination" variant="outline" color="indigo":to="createCityLink"></UButton>
        </div>
        <div class="col-6">
          Filter or other features
        </div>
      </div>


    </UICard>

    <UIContainer>
      <!-- Display loading message or spinner while data is being fetched -->
      <div v-if="isLoading" class="flex items-center space-x-4 mx-auto">
        <div class="space-y-2 mx-auto">
          <USkeleton class="h-10 w-[650px]" />
          <USkeleton class="mt-5 h-10 w-[600px]" />
          <USkeleton class="h-10 w-[600px]" />
          <USkeleton class="h-10 w-[600px]" />
        </div>
      </div>

      <div v-else>


        <DestinationItem v-for="trip in destination" :key="trip.destinationID" :destinationID="trip.destinationID"
          :destination="trip.destination" :transportType="trip.transportType" :from="trip.from" :to="trip.to"
          :destinationBudget="trip.destinationBudget" :tripDuration="trip.tripDuration" :date="trip.date"
          :isTripCompleted="trip.isTripCompleted" :daysRemainingForTrip="trip.daysRemainingForTrip"
          :citiesIncludedOnTrip="trip.citiesIncludedOnTrip" :tripRating="trip.tripRating"
          :tripComments="trip.tripComments" :numOfPeople="trip.numOfPeople" />
      </div>
    </UIContainer>
  </div>
</template>

<style scoped>
/* You can style the loading message here if needed */
.links{
  text-decoration: none;
  list-style: none;
}
</style>
