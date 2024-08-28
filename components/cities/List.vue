<script setup>
import { useDestinationStore } from "@/store/destination";
const store = useDestinationStore();
import { storeToRefs } from "pinia";

const { cities } = storeToRefs(store);
const props = defineProps([
  "cityID",
  "parentDestinationID",
  "city",
  "accommodation",
  "accommodationCost",
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
</script>

<template>
  <div class="projects">
    <UITitle title="Projects" class="container border-bottom" />

   
    <CitiesItem
      v-for="city in cities"
      :key="city.cityID"
      :cityID="city.cityID"
      :city="city.city"
      :accommodation="city.accommodation"
      :accommodationCost="city.accommodationCost"
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
