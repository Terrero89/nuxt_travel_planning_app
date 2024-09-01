<script setup>
import { onMounted } from "vue";
import { useDestinationStore } from "@/store/destination";
import { useCityStore } from "@/store/cities";
import { useExpenseStore } from "@/store/expenses";
const cityStore = useCityStore();
const destStore = useDestinationStore();

import { storeToRefs } from "pinia";

const { fetchCities,filterItemById} = cityStore;
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

onMounted(() => {
  fetchCities();
  fetchDestinations();

});
// now i can find based on id
const showMe = computed(()=> {
  return cityStore.citiesAsArray.filter((city)=> city.parentDestinationID === destId)
})

const destByID = computed(() => cityStore.filterItemById); // this is working!
</script>

<template>
  <div class="projects">
    <UITitle title="Projects" class="container border-bottom" />
    <div>
      {{ dest }}
      <div>{{ showMe }}</div>
      <!-- {{ destination.length }} {{ cityStore.citiesAsArray }} -->
    </div>
    <CitiesItem
      v-for="city in destByID(destId)"
      :key="city.cityID"
      :cityID="city.cityID"
      :parentDestinationID="destId"
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
