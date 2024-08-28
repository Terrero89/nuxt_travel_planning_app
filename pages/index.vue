<script setup>
import { useDestinationStore } from "@/store/destination";
import { storeToRefs } from "pinia";
const store = useDestinationStore();
const { destination } = storeToRefs(store);
</script>

<template>
  <div>
  
    <UICard>
      <div v-for="d in store.destination" :key="d.destinationID">
        {{ d.destination }}
      </div>

      <div>HOME</div>
      <button class="btn btn-primary">HELLo</button>
     
    </UICard>
  </div>
</template>
