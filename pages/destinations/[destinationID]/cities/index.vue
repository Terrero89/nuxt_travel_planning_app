<script setup>
import { useDestinationStore } from "@/store/destination";
import { storeToRefs } from "pinia";
const store = useDestinationStore();
const { expenses } = storeToRefs(store);
const route = useRoute(); //route object
const destId = route.params.destinationID;
const cityId = route.params.cityID;
</script>

<template>
  <div>
    destinationID: {{ destId }}
    cityID: {{ cityId }}
    <UICard>
      <div>EXPENSES when click on destination</div>
      <!-- {{ cities }}  -->
      <div v-for="d in expenses" :key="d.cityId">
        {{ d.expense}}
      </div>
      <button class="btn btn-primary">HELLo</button>
      <UButton>Button</UButton>
    </UICard>
  </div>
</template>
