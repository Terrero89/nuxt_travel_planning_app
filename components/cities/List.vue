<script setup>
import { onMounted } from "vue";
import { useDestinationStore } from "@/store/destination";
import { useCityStore } from "@/store/cities";
import { useExpenseStore } from "@/store/expenses";
const cityStore = useCityStore();
const destStore = useDestinationStore();

import { storeToRefs } from "pinia";

const {
  fetchCities,
  filterItemById,
  filterItemByName,
  filtering,
  numOfExpensesByCities,
  coding,
} = cityStore;
const { fetchDestinations } = destStore;
const { cities } = storeToRefs(cityStore);
const { destination } = storeToRefs(destStore);
const { expenses } = useExpenseStore();

const route = useRoute(); //route object
const destId = route.params.destinationID;

const props = defineProps([
  "cityID",
  "parentDestinationID",
  "city",
  "accommodation",
  "accommodationCost",
  "isAccommodationPaid",
  "totalCost",
  "from",
  "to",
  "isThisCityVisited",
  "cityRating",
  "cityDuration",
  "daysRemainingForCity",
  "expenseIncludedOnCity",
  "date",
  "cityComments",
]);

onMounted(async () => {
  await fetchCities();
  await fetchDestinations();
});

const filter = ref("");
const filterByStatus = ref("");
const filterByCategory = ref("");
const filterByBookingStatus = ref("");


</script>

<template>
  <div class="projects">
    <UICard class="mt-5">
      <UICityFilter
        v-model="filter"
        v-model:filter2="filterByStatus"
        v-model:filter3="filterByCategory"
        v-model:filter4="filterByBookingStatus"
      />
    </UICard>

    <CitiesStatsCard
      :numOfExpenses="9"
      :totalCost="991"
      :bookedItems="2"
      :averageRating="4.5"
      :totalDuration="48"
    />
    <!-- {{ getCitiesByDestinationID(destId)[1] }} -->

    <CitiesItem
      v-for="city in filtering(
        destId,
        filterByStatus,
        filterByCategory,
        filterByBookingStatus
      )"
      :key="city.cityID"
      :cityID="city.cityID"
      :parentDestinationID="destId"
      :city="city.city"
      :accommodation="city.accommodation"
      :accommodationCost="city.accommodationCost"
      :isAccommodationPaid="city.isAccommodationPaid"
      :accommodationAddress="city.accommodationAddress"
      :from="city.from"
      :to="city.to"
      :totalCost="city.totalCost"
      :cityDuration="city.cityDuration"
      :date="city.date"
      :isThisCityVisited="city.isThisCityVisited"
      :daysRemainingForCity="city.daysRemainingForCity"
      :expenseIncludedOnCity="city.expenseIncludedOnCity"
      :cityRating="city.cityRating"
      :cityComments="city.cityComments"
    />
  </div>
</template>

<style scoped></style>
