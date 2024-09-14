<script setup>
import { onMounted } from "vue";
import { useDestinationStore } from "@/store/destination";
import { useCityStore } from "@/store/cities";
import { useExpenseStore } from "@/store/expenses";
const cityStore = useCityStore();
const destStore = useDestinationStore();

import { storeToRefs } from "pinia";

const { fetchCities, filterItemById, filterItemByName, filtering } = cityStore;
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

const categories = ["Visited", "Not visited", "In progress"];
const sortingBy = [
  "Furthest Date",
  "Closes Date",
  "Highest Rating",
  "Lowest Rating",
  "Highest Cost",
  "Lowest Cost",
];

const filteredData = () => {
  if (!filter.value)
    return cities.value.filter((data) => data.isThisCityVisited);
  else
    return cities.value.filter(
      (data) => data.isThisCityVisited === filter.value
    );
};
const getCitiesByDestinationID = computed(() => cityStore.filterItemById); // this is working!

//   filteredCities(id, filter, sortBy)
</script>

<template>
  <div class="projects">
    filtering: {{ filtering(destId, filterByStatus, filterByCategory, filterByBookingStatus) }}
    <UICard class="mt-5">
      {{ filterByStatus }}ddddd {{ filterByCategory }}
      {{ filterByStatus === "Visited" }}
      <UICityFilter
        v-model="filter"
        v-model:filter2="filterByStatus"
        v-model:filter3="filterByCategory"
        v-model:filter4="filterByBookingStatus"
      />
    </UICard>
    <UICard class="py-4">
      <div class="row">
        <div class="col">Filter or other features</div>
        <div class="col">
          <div>total spent | total time | attractions visited | ETC..</div>
        </div>
      </div>
    </UICard>
    {{ getCitiesByDestinationID(destId)[1] }}

    <CitiesItem
      v-for="city in filtering(destId, filterByStatus, filterByCategory)"
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
