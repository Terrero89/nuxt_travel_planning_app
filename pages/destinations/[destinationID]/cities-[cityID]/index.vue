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
    destinationID: {{ destId }}
    cityID: {{ cityId }}
    <UICard>
     <ExpensesList/>
    </UICard>
  </div>
</template>
