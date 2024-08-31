<script setup>
import { useDestinationStore } from "@/store/destination";
import { storeToRefs } from "pinia";
const store = useDestinationStore();
const { cities } = storeToRefs(store);
const route = useRoute(); //route object
const destId = route.params.destinationID;
// const cityId = route.params.expensesID;
</script>

<template>
  <div>
    destinationID: {{ destId }}
 
      <div>CITIES BASED ON ID HERE</div>
      <CitiesList :parentDestinationID="destId" />
    
  </div>
</template>
