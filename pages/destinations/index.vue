<script setup>
import { useDestinationStore } from "@/store/destination";
const store = useDestinationStore();
import { storeToRefs } from "pinia";


const { destination } = storeToRefs(store);
const route = useRoute();

</script>

<template>
  <div>
    <UIContainer>
      <DestinationList  />
    </UIContainer>
  </div>
</template>
