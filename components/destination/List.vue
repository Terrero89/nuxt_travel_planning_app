<script setup>
import { onMounted } from "vue";
import { useDestinationStore } from "@/store/destination";
import { useCityStore } from "@/store/cities";
import { storeToRefs } from "pinia";

const cityStore = useCityStore();
const { fetchCities, getAmountOfCities } = cityStore;
const store = useDestinationStore();
const { destination, isLoading } = storeToRefs(store); // Include isLoading state

// Fetch destinations when the component is mounted
const {
  fetchDestinations,
  filterItemByName,
  // filterByStatusPending,
  // filterByStatusComplete,
} = store;

const filter = ref("");

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
  "numOfPeople",
  "planeTickets"
]);
// const filteredData = () =>{

const createCityLink = computed(() => `/destinations/create`);

onMounted(async () => {
  await fetchDestinations();
  await fetchCities(); // Ensure cities are fetched before using them
 
});
</script>
<template>
  <div class="projects">
    <UICard class="mt-5 py-2">
      <UISearchFilter v-model="filter" />
    </UICard>
    <UIDisplayCard
      :highestCategory="'Food/Drinks'"
      :priorityCount="4"
      :totalCost="1500"
      :bookedItems="2"
      :averageRating="4.5"
      :totalDuration="48"
    />
    {{ getAmountOfCities("-O5PPTfcVs2rR02VPLi6") }}
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
        <DestinationItem
          v-for="trip in filterItemByName(filter)"
          :key="trip.destinationID"
          :destinationID="trip.destinationID"
          :destination="trip.destination"
          :transportType="trip.transportType"
          :from="trip.from"
          :to="trip.to"
          :destinationBudget="trip.destinationBudget"
          :tripDuration="trip.tripDuration"
          :date="trip.date"
          :isTripCompleted="trip.isTripCompleted"
          :daysRemainingForTrip="trip.daysRemainingForTrip"
          :citiesIncludedOnTrip="getAmountOfCities(trip.destinationID)"
          :tripRating="trip.tripRating"
          :tripComments="trip.tripComments"
          :numOfPeople="trip.numOfPeople"
          :planeTickets="trip.planeTickets"
        />
      </div>
    </UIContainer>
  </div>
</template>

<style scoped>
/* You can style the loading message here if needed */
.links {
  text-decoration: none;
  list-style: none;
}
</style>
