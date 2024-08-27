<script setup>
import { useDestinationStore } from "@/store/destination";
const store = useDestinationStore();
import { storeToRefs } from "pinia";

const { destination } = storeToRefs(store);
</script>

<template>
  <div>
    <UICard>
      ALL destinations PAGE
      <div>list of destinations shown</div>
      <!-- {{ destination }} -->

      <div v-for="d in store.destination" :key="d.destinationID">
        {{ d.destination }}
      </div>
      <button class="btn btn-primary">HELLo</button>
      <UButton>Button</UButton>
    </UICard>
  </div>
</template>
