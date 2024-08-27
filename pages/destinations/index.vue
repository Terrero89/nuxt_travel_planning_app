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
     <DestinationList/>
   </UICard>
  </div>
</template>
