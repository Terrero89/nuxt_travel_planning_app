<script setup>
import { useDestinationStore } from "@/store/destination";
import { storeToRefs } from "pinia";
const store = useDestinationStore();
// const { expenses } = storeToRefs(store);
const route = useRoute(); //route object
const destId = route.params.destinationID;
const cityId = route.params.cityID;
</script>

<template>
  <div>
 
     <ExpensesList/>
   
  </div>
</template>
