<script setup>
import { onMounted } from "vue";
import { useDestinationStore } from "@/store/destination";
import { useCityStore } from "@/store/cities";
import { useExpenseStore } from "@/store/expenses";

const cityStore = useCityStore();
const expenseStore = useExpenseStore();
const destStore = useDestinationStore();
const {getAvgRatingForCity,fetchExpenses,  getTotalAccommodationsNumbers} = expenseStore;
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
const { cities, filteredCitiesStats } = storeToRefs(cityStore);
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
  await fetchExpenses();
  await fetchCities();
  await fetchDestinations();
});

const filter = ref("");
const filterByStatus = ref("");
const filterByCategory = ref("");
const filterByBookingStatus = ref("");

const filtered = computed(() => {
  return cityStore.filteredCitiesStats(
    destId,
    filterByStatus.value,
    filterByCategory.value,
    filterByBookingStatus.value
  );
});




onMounted(async() => {
  await fetchExpenses()


});
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
      :numOfItems="filtered.numberOfItems"
      :totalCost="filtered.totalAccommodationCost"
      :averageRating="filtered.avgRating"
      :totalDuration="48"
      :accommodationCost="filtered.totalAccommodationCost"
    />
  
   DATA {{filtered}}


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
      :totalCost="getTotalAccommodationsNumbers(city.cityID) + city.accommodationCost"
      :cityDuration="city.cityDuration"
      :date="city.date"
      :isThisCityVisited="city.isThisCityVisited"
      :daysRemainingForCity="city.daysRemainingForCity"
      :expenseIncludedOnCity="city.expenseIncludedOnCity"
      :cityRating="getAvgRatingForCity(city.cityID)"
      :cityComments="city.tripComments"
    />

  </div>

</template>

<style scoped></style>
