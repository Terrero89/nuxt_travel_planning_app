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

onMounted(async() => {
  await fetchCities();
 await  fetchDestinations();

});


const getCitiesByDestinationID = computed(() => cityStore.filterItemById); // this is working!
</script>

<template>
  <div class="projects">
    <UICard class="mt-5 mb-1 py-4">
      <div class="row">
        <div class="col">
       
          <UButton class="mx-2" label="Add City" variant="outline" color="indigo":to="createCityLink"></UButton>
        </div>
        <div class="col">
          Filter or other features
        </div>
      </div>


    </UICard>
    <div>
    
  
    </div>
    <CitiesItem
      v-for="city in getCitiesByDestinationID(destId)"
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
