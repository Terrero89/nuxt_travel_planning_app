<script setup>
import { onMounted } from "vue";
import { useDestinationStore } from "@/store/destination";
import { useCityStore } from "@/store/cities";

const cityStore = useCityStore();
const destStore = useDestinationStore();

import { storeToRefs } from "pinia";

const { fetchCities } = cityStore;
const { fetchDestinations } = destStore;
const { cities } = storeToRefs(cityStore);
const { destination } = storeToRefs(destStore);

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

onMounted(() => {
  fetchCities();
  fetchDestinations();
});
// grab the ones that are under the parent id x
// const findByDestination = () => {
//   const findCities = destination.value.filter(
//     (city) => city.parentDestinationID === 'd1'
//   );
//   return findCities
// };
</script>

<template>
  <div class="projects">
    <UITitle title="Projects" class="container border-bottom" />
    <div>destID: {{ props.parentDestinationID }}</div>
    <div>CITY ID:{{ cityId }}</div>


    <CitiesItem
      v-for="city in cities"
      :key="city.cityID"
      :cityID="city.id"
      :parentDestinationID="props.parentDestinationID"
      :city="city.city"
      :accommodation="city.accommodation"
      :accommodationCost="city.accommodationCost"
      :isAccommodationPaid="city.isAccommodationPaid"
      :from="city.from"
      :to="city.to"
      :totalCost="city.totalCost"
      :cityDuration="city.cityDuration"
      :date="city.date"
      :isThisCityVisited="city.isThisCityVisited"
      :daysRemainingForCity="city.daysRemainingForCity"
      :expenseIncludedOnCity="city.citiesIncludedOnCity"
      :cityRating="city.cityRating"
      :cityComments="city.cityComments"
    />
  </div>
</template>

<style scoped></style>
