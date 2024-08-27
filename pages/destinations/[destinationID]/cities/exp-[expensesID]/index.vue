<script setup>
import { useDestinationStore } from "@/store/destination";
import { storeToRefs } from "pinia";
const store = useDestinationStore();
const { expenses } = storeToRefs(store);
const route = useRoute(); //route object
const destId = route.params.destinationID;
const cityId = route.params.expensesID;


</script>

<template>
  <div>
    ID: {{ destId }} ID: {{ cityId }}
    <UICard>
      <!-- {{ expenses }} -->
      <div v-for="d in expenses" :key="d.expensesID">
        {{ d.expense }}- {{ d.category }}
      </div>

      <button class="btn btn-primary">HELLo</button>
    
      <UButton>Button</UButton>
    </UICard>
  </div>
</template>
