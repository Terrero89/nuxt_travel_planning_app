<script setup>
import { useDestinationStore } from "@/store/destination";
const store = useDestinationStore();
import { storeToRefs } from "pinia";

const { destination } = storeToRefs(store);
</script>

<template>
  <div>
    <UIContainer>
   
      <!-- {{ destination }} -->
     <DestinationList/>
   </UIContainer>
  </div>
</template>
